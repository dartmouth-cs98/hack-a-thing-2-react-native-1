// based on blueprint from https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/
var express = require("express");
var router = express.Router();


//mongo usage copied from my hack-a-thing-1 
var MongoClient = require('mongodb').MongoClient;
var demo_password = "mongoDEMO"
var cloud_url = "mongodb+srv://demoUser:" + demo_password + "@cluster0.gtdqw.mongodb.net/demoDB?retryWrites=true&w=majority"


router.get("/", function(req, res) {
    MongoClient.connect(cloud_url, function(err, db) { 
        var this_db = db.db('demoDB');
        this_db.collection('user_teams').find({"username": req.query.username}).toArray(function(err, result) { 
            if (result.length != 0) { 

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
            if (err) throw err;
            res.send('User registered');
        }); 
        db.close();
    });
});   

module.exports = router