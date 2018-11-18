const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        //preventing rest of fun executing
        return console.log("Unable to connect to mongodb server");
    }

    console.log("Connected to mongodb server");
    const db = client.db("TodoApp");

    //to array returns promise, find get key value pair and matches it
    db.collection("Users").find({ name: "Diana" }).toArray()
        .then((users) => {
            console.log("Count:", users);

    })
        .catch((err) => console.log("Error!"));

    // client.close();
});