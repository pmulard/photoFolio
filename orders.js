var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:3001/MyDb", function (err, db) {
    
    db.collection('orders', function (err, collection) {
        
       console.log("Database created!");
       db.close();

    });
                
});


