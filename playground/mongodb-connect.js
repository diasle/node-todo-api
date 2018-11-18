const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        //preventing rest of fun executing
        return console.log("Unable to connect to mongodb server");
    }

    console.log("Connected to mongodb server");
    const db = client.db("TodoApp");

    //adding collection and inserting item
    // db.collection("Todos").insertOne({
    //     text: "Sth to do",
    //     complete: false
    //
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Unable to insert todo", err)
    //     }

        //ops  stores all inserted docs, undefined - for filter function and 2 for identation
        // console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection("Users").insertOne({
        name: "Diana",
        age: 25,
        location: "Poznan"
    }, (err, res) => {
        if (err) {
            return console.log("Error!", err)
        }

        console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
    });

    //close connection with mongodb
    client.close();
});