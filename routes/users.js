/* global require, module */
var express = require('express');
var router = express.Router();

/*
 * GET userlist
 * The purpose of this code is: if you do an HTTP GET to /users/userlist,
 * our server will return JSON that lists all of the users in the database.
 */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({},{}, function(e, docs) {
    res.json(docs);
  });
});

module.exports = router;
