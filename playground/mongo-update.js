const { MongoClient, ObjectID } = require("mongodb");

//Methods to update data:
//findOneAndUpdate - also returns updated value - user can see what was updated
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        //preventing rest of fun executing
        return console.log("Unable to connect to mongodb server");
    }

    console.log("Connected to mongodb server");
    const db = client.db("TodoApp");

    // db.collection("Todos").findOneAndUpdate({ _id: new ObjectID("5bf15db7c8c576312a3f62cb")}, {
    //     $set: {
    //         complete: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // })

    db.collection("Users").findOneAndUpdate({ _id: new ObjectID("5bf14adc46d78303c95fe1e5")}, {
        $set: {
            name: "Diana"
        },
        $inc: {
            age: 1
        }
    }).then((res) => console.log(res));

    // client.close();
});