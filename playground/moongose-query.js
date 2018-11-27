const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/Todo");
const { ObjectID } = require("mongodb");

const id = "5bfc52c41c5aac03ac678e5c11";

if (!ObjectID.isValid(id)) {
    console.log("Id not valid");
}

// Todo.find({
//     _id: id,
// }).then((todos) => {
//     console.log("Todos", todos);
// });
//
// Todo.findOne({
//     _id: id,
// }).then((todo) => {
//     console.log("Todo", todo);
// });

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log("Todo not found");
    }
    console.log("Todo By Id", todo);
}).catch((e) => console.log(e));