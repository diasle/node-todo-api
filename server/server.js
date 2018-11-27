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

app.del("/todos/:id", (req, res) => {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log("Started on port 3000")
});


module.exports = { app };