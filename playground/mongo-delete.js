const { MongoClient, ObjectID } = require("mongodb");

//Methods to delete data:
//deleteMany
//deleteOne
//findOneAndDelete - also returns deleted value - user can see what was deleted
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        //preventing rest of fun executing
        return console.log("Unable to connect to mongodb server");
    }

    console.log("Connected to mongodb server");
    const db = client.db("TodoApp");
    //
    // db.collection("Todos").findOneAndDelete({ complete: false })
    //     .then((res) => console.log(res));

    db.collection("Users").findOneAndDelete({ _id: new ObjectID("5bf1541cc8c576312a3f5e6f") })
        .then((res) => console.log(res));

    // client.close();
});