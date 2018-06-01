var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Poll = require("../models/Poll.js");
var passport = require('passport');
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
    Poll.find(function(err, results){
        if(err){console.error(err);}
        res.json(results);
    })
});

//NEW POLL
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Poll.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    } else {        
        res.status(401).json({success: false, msg: 'Unauthorized.'});
    }
  });

module.exports = router;