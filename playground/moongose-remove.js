const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/Todo");
const { ObjectID } = require("mongodb");

// Todo.remove({}).then((res) => console.log(res)); //removes everything from collection

// Todo.findOneAndRemove({ _id: "5bfdbde8564b7944a1ab485e" })
//  .then((todo)=> console.log("111111111111111", todo));

Todo.findByIdAndRemove("5bfdbde8564b7944a1ab485e")
    .then((todo)=> console.log("111111111111111", todo));