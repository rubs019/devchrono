var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var MongoClient = require('mongodb').MongoClient
	, assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = "Pomodoro";
  res.render('index', { title : title});
});

router.post('/save', function(req, res, next){
  var data = req.body;
  console.log(data);

  // Connection URL
  var url = 'mongodb://local.dev:27017/';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

	  var insertPomo = function(db, callback) {
		  // Get the documents collection
		  var collection = db.collection('documents');
		  // Insert some documents
		  collection.insertMany([
			  {minute : data.minute}, {second : data.second}, {title : data.title}, {content : data.content}
		  ], function(err, result) {
			  assert.equal(err, null);
			  assert.equal(3, result.result.n);
			  assert.equal(3, result.ops.length);
			  console.log("Inserted 3 documents into the collection");
			  callback(result);
		  });
	  };
	  var findDocuments = function(db, callback) {
		  // Get the documents collection
		  var collection = db.collection('documents');
		  // Find some documents
		  collection.find({}).toArray(function(err, docs) {
			  assert.equal(err, null);
			  console.log("Found the following records");
			  console.log(docs);
			  callback(docs);
		  });
	  };
	  insertPomo(db, function(){
		  findDocuments(db, function() {
			  db.close();
			  res.json({callback:true, data: data})
		  });
      });
  });
});

module.exports = router;
