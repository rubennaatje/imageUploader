var express = require('express');
var router = express.Router();
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var db;

var upload = multer({
  dest: 'public/uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
});


MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err,database) {
  if(err){
    return console.log('error with the db');
  }
  db = database;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Express' });
});

router.post('/upload', upload.single('displayImage'), function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/quotes',function (req,res){
  db.collection('qoutes').save(req.body,function(err,result){
    if(err) return console.log(err);

    console.log('saved the collection');
    res.redirect('/');
  })
});

router.get('/klanten',function (req,res) {
  db.collection('klant').find().toArray(function (err, results) {
    if(err){
      console.log(err);
    }
    console.log(results);
    res.render('klanten',{klanten: results}); 
    db.close();
  });

});

module.exports = router;