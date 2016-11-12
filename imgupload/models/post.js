var mongoose = require('./Photo');

function Post(name, path) {
	this.name = name;
	this.path = path;
}

module.exports = Post;

/*Post.prototype.save = function(callback) {
	var post = {
		name = this.name,
		path = this.path
	};

	mongoose.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('photos', function(err, collection) {
			if(err) {
				mongoose.close();
				return callback(err);
			}

			collection.insert(post, {
				safe: true
			}, function(err) {
				mongoose.close();
				if(err) {
					return callback(err);
				}
				callback(null);
			})
		})
	})
}*/


Post.getAll = function(callback) {
	console.log(111);
	mongoose.open(function(err, db) {
	console.log(222);

		if(err) {
			return callback(err);
		}

		db.collection('photos', function(err, callback) {
	console.log(333);

			if(err) {
				mongoose.close();
				return callback(err);
			}

			collection.find({}, function(err, docs) {
				mongoose.close();
	console.log(4);

				if(err) {
					return callback(err);
				}
				callback(null, docs);
			})
		})
	})
}