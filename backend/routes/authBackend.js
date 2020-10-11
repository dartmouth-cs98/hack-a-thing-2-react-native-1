// based on blueprint from https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
var express = require("express");
var router = express.Router();


//mongo usage copied from my hack-a-thing-1 
var MongoClient = require('mongodb').MongoClient;
var demo_password = "mongoDEMO"
var cloud_url = "mongodb+srv://demoUser:" + demo_password + "@cluster0.gtdqw.mongodb.net/demoDB?retryWrites=true&w=majority"


//db usage info (I follow this general paradigm for the queries in all the routes, the queries are pretty simple)
// https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp
router.get("/", function(req, res) {
    MongoClient.connect(cloud_url, function(err, db) { 
        var this_db = db.db('demoDB');
        this_db.collection('user_teams').find({"username": req.query.username}).toArray(function(err, result) { 
            if (result.length != 0) { 
                //I assume there should just be one entry
                username = result[0].username;
                pw = result[0].password;
                console.log(pw);
                if (pw == req.query.password) { 
                    res.send(result[0].team);
                }
                else { 
                    res.send('bad_pw');
                }
            }
            else { 
                res.send('user_not_found');
            }
        });
        
        db.close();
    });
});

//I tried and failed to get the following two routes done in one route
//Followed the same pattern for these routes as for the auto-generated one above (though I filled that one out)
router.get("/checkUsername", function(req, res) { 
    MongoClient.connect(cloud_url, function(err, db) { 
        var this_db = db.db('demoDB');
        this_db.collection('user_teams').find({"username": req.query.username}).toArray(function(err, result) { 
            if (result.length != 0) { 
                res.send('user_exists');
            }
            else { 
                res.send('go_ahead');
            }
        });     
        
        db.close();
    });
});

router.post("/", function(req, res) { 
    MongoClient.connect(cloud_url, function(err, db) { 
        var this_db = db.db('demoDB');
        this_db.collection('user_teams').insertOne(req.body, function(err, result) { 
            res.send('User registered');
        }); 
        db.close();
    });
});   

module.exports = router