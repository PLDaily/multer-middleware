var express = require('express');
var path = require('path');
var fs = require('fs');
var Photo = require('../models/Photo');
var join = path.join;
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log(__dirname);
        callback(null, path.join(__dirname, "../public/photos"));
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
var muilter = multer({ storage: storage });

router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function(req, res, next) {
	Photo.find({}, function(err, photos) {
		if(err) {
			return console.log(err);
		}
		res.render('photo', {
			title: 'Photos',
			photos: photos
		})
	})
});

router.get('/upload', function(req, res, next) {
	res.render('upload', {
		title: 'Photo upload'
	});
});

router.post('/upload', function(req, res, next) {
	var upload = muilter.single('img');
	upload(req, res, function(err) {
		console.log(req.file);
		var imgName = req.file.originalname;
		var name = req.body.name || imgName;
		console.log(imgName);
		console.log(name);
	    Photo.create({
	        name: name,
	        path: imgName
	    }, function(err) {
	        if (err) return next(err);
	        res.redirect('/');
	    });
	})
});  

router.get('/photo/:id/download', function(req, res, next) {
	console.log(req.params.id);
	var id = req.params.id;
	Photo.findById(id, function(err, photo){
      if (err) return next(err);
      var imgPath = path.join(__dirname, "../public/photos/" + photo.path);
      res.download(imgPath, photo.name+'.jpeg');
    });
})
module.exports = router;
