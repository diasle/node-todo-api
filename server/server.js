const env = process.env.NODE_ENV || "development";
console.log("envvvvvvvvvvvvvvvvvvvvvvv", env);

if (env === "development") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env === "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}

const _ = require("lodash");

const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/Todo");
const { User } = require("./models/User");
const { ObjectID } = require("mongodb");

const app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    console.log(req.body);
    const todo = new Todo({
        text: req.body.text,
    });

    todo.save()
        .then((doc) => {
            res.send(doc);
        })
        .catch((e) => {
            res.status(400).send(e);
        });
});

app.get("/todos", (req, res) => {
    Todo.find()
        .then((todos) => {
            res.send({ todos })
        })
        .catch((e) => {
            res.status(400).send(e)
        })
});

app.get("/todos/:id", (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id)
        .then((todo) => {
            if (todo) {
                return res.send(todo);
            }

            res.status(404).send();
        })
        .catch((e) => {
            res.status(400).send(e);
        })

});

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id)
        .then((todo) => {
            if(todo) {
                return res.send({ todo });
            }

            res.status(404).send();
        })
        .catch((e) => {
            res.status(400).send(e);
        })
});

app.patch("/todos/:id", (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ["text", "completed"]);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if(!todo) {
                return res.status(404).send();
            }

            res.send({ todo });

        }).catch((e) => res.status(400).send(e));
});

app.listen(3000, () => {
    console.log("Started on port 3000")
});


module.exports = { app };