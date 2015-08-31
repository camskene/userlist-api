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

/*
 * POST to adduser
 * This basically just says "we're going to post some data (req.body), and
 * you're going to insert it into our 'userlist' collection in the database.
 * If that goes well, return an empty string. If it goes poorly, return the
 * error message that the database gives us."
 */
router.post('/adduser', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, function(err, result) {
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});


/*
 * DELETE to deleteuser
 */
router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.id;
  collection.remove({ '_id': userToDelete}, function(err) {
    res.send(
      (err === null) ? { msg: ''} : { msg: 'error: ' + err}
    );
  });
});

module.exports = router;
