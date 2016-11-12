var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log(__dirname);
        callback(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function(req, file, callback) {
        callback(null, Date.now().toString() + file.originalname);
    }
});
var muilter = multer({ storage: storage});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/uploadSingle', function(req, res, next) {
	res.render('uploadSingle', {});
});

router.post('/uploadSingle', function(req, res, next) {
	var upload = muilter.single('uploadInput');
	upload(req, res, function(err) {
		console.log(req.file);
	})
})


router.get('/uploadArray', function(req, res, next) {
    res.render('uploadArray', {});
});

router.post('/uploadArray', function(req, res, next) {
    console.log(__dirname);
    console.log(req.file);
    var upload = muilter.array('uploadInput', 3);
    upload(req, res, function(err) {
        console.log(req.files);
    })
})

router.get('/uploadFilter', function(req, res, next) {
    res.render('uploadFilter', {});
});

router.post('/uploadFilter', function(req, res, next) {
    console.log(__dirname);
    console.log(req.file);
    var upload = muilter.fields([{ name: 'uploadInput', maxCount: 2 }, { name: 'uploadInput1', maxCount: 2 }, { name: 'uploadInput2', maxCount: 4 }])
    upload(req, res, function(err) {
        if(err) {
            console.log(err);
        }
        console.log(req.files);
    })
});
module.exports = router;
