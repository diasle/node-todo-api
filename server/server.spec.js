const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./server");
const { Todo } = require("./models/Todo");

const todos =  [
    {
        text: "First",
        _id: new ObjectID(),
        completed: true,
        completedAt: 333,
    },
    { text: "Second", _id: new ObjectID() }
    ];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe("POST/todos", () => {
    it("creates new todo", (done) => {
        const text = "Test todo text";

        request(app)
            .post("/todos")
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
               if (err) {
                  return done(err);
               }

               Todo.find()
                   .then((todos) => {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);

                   done();
               })
                   .catch((e) => done(e))
            });
    });

    it("do not create Todo with invalid body data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);

                        done();
                    })
                    .catch((e) => done(e))
            });
    });
});

describe("GET/todos", () => {
    it("gets all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
    });
});

describe("GET/todos/:id", () => {
    it("get specific todo", (done) => {
        request(app)
            .get(`/todos/${ todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe( todos[0].text)
            })
            .end(done);
    });

    it("returns 404 when id is not valid", (done) => {
        request(app)
            .get("/todos/5bfc52c41")
            .expect(404)
            .end(done);
    });

    it("returns 404 when todo is not found", (done) => {
        const customId = new ObjectID();

        request(app)
            .get(`/todos/${ customId.toHexString() }`)
            .expect(404)
            .end(done);
    });
});

describe("DEL/todos/:id", () => {
   it("deletes specific todo", (done) => {
       const id = todos[0]._id.toHexString();

       request(app)
           .delete(`/todos/${ id }`)
           .expect(200)
           .expect((res) => {
               expect(res.body.todo.text).toBe(todos[0].text)
           })
           .end((err, res) => {
               if(err) {
                   return done(err);
               }

               Todo.findById(id)
                   .then((todo) => {
                       expect(todo).toBeFalsy();
                       done();
                   }).catch((e) => done(e));
           });

   });

   it("returns 404 when todo is not found", (done) => {
       const customId = new ObjectID();

       request(app)
           .delete(`/todos/${ customId }`)
           .expect(404)
           .end(done);
   });

   it("returns 404 when todo is not valid", (done) => {
       request(app)
           .delete("/todos/543543")
           .expect(404)
           .end(done);
   });
});

describe("PATCH/todos/:id", () => {
    it("returns 404 when id is not valid", (done) => {
        request(app)
            .patch("/todos/543543")
            .expect(404)
            .end(done);
    });


    it("sets completed to false and resets completedAt if passed complete is not true", (done) => {
        const id = todos[0]._id.toHexString();

        request(app)
            .patch(`/todos/${ id }`)
            .send({ text: "new task", completed: false })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);

    });

    it("updates todo", (done) => {
        const id = todos[1]._id.toHexString();

        request(app)
            .patch(`/todos/${ id }`)
            .send({ text: "new task", completed: true })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe("new task");
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeTruthy();
            })
            .end(done);

    });
});
