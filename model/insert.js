/**
 * Created by rubz_johnson on 04/01/17.
 */
module.exports = {

	insertDocuments :function(db, callback) {
		// Get the documents collection
		var collection = db.collection('documents');
		// Insert some documents
		collection.insertMany([
			{a : 1}, {a : 2}, {a : 3}
		], function(err, result) {
			assert.equal(err, null);
			assert.equal(3, result.result.n);
			assert.equal(3, result.ops.length);
			console.log("Inserted 3 documents into the collection");
			callback(result);
		});
	}
};