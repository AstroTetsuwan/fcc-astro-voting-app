var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Poll = require("../models/Poll.js");
var User = require("../models/User.js");
var passport = require('passport');
var validator = require('validator');
require('../config/passport')(passport);

var getToken = function (headers) {
        if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
        } else {
        return null;
        }
  };


//GET POLLS FOR MAIN PAGE
router.get('/', function(req, res){
    Poll.find()
    .populate("author", "_id username")
    .exec(function(err, results){
        if(err){console.error(err);}
        console.log(results);
        res.json(results);
    });
});

//NEW POLL
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        User.findOne({_id: req.body.authorId}, function(err, user){
            if (err) return next(err);
            Poll.create({
                title: req.body.title,
                choices: req.body.choices,
                author: user
            }, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        });
        
    } else {        
        res.status(401).json({success: false, msg: 'Unauthorized.'});
    }
});

//GET POLL BY ID
router.get('/details/:pollId', function(req, res){
    var pollId = validator.escape(req.params.pollId);
    Poll.findById(pollId)
    .populate("author", "_id username")
    .exec({_id: pollId}, function(err, poll){
        if(err) console.log(err);
        res.json(poll);
    });
});

//GET ALL USER'S POST
router.get("/userpolls/:userId", passport.authenticate('jwt', {session: false}), function(req, res){
   
    var token = getToken(req.headers);
    if(token){
        var userId = validator.escape(req.params.userId);

        User.findOne({_id: userId}, function(err, user){
            if (err) return next(err);
            Poll.find({author: user}, function(err, results){
                if(err) return next(err);
                res.json(results);
            });
        });

        
    }
    else{
        res.status(401).json({success: false, msg: 'Unauthorized.'});
    }
});

//USER DELETE ITS OWN POST
router.delete("/userpolls/:pollId", passport.authenticate('jwt', {session: false}), function(req, res){
    var token = getToken(req.headers);
    if(token){
        var pollId = validator.escape(req.params.pollId);
        Poll.deleteOne({_id: pollId}, function(err){
            if(err){ console.error(err); }
            console.log("Deleted, I suppose.")
            res.json({success: true});
        });
    }
    else{
        res.status(401).json({success: false, msg: 'Unauthorized.'});
    }
});


//VOTE FOR POLL
router.get("/vote/:pollId/:choiceIndex", function(req, res){
    var pollId = validator.escape(req.params.pollId),
        choiceIndex = validator.escape(req.params.choiceIndex);
    
    console.log(pollId);
    console.log(choiceIndex);

    Poll.findById(pollId, function(err, poll){

        if(err){console.log(err);}
        poll.choices[choiceIndex].nbrVotes += 1;

        poll.save(function(err, updatedPoll){
            if(err){console.log(err);}
            res.json(updatedPoll);
        });
    })
});


module.exports = router;