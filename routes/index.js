var express = require('express');
var router = express.Router();
var Image = require('../models/Image');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname + '-' + Date.now())
  }
});

var upload = multer({storage: storage});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Express' });
});
router.get('/find/',function (req,res) {
  Image.find(function (err, kittens) {
    if (err) return console.error(err);
    for(var kitten in kittens){
      Image.findOneAndUpdate(kitten,{name: 'jason'},function(err,result){
        if(err){console.log(err);}
        else{
          console.log('nice');
        }
      });
    }
  })
});
router.post('/upload',upload.single('displayImage'), function(req, res) {
  var newImage = new Image({name:req.file.filename,ip:req.connection.remoteAddress});
  newImage.save();
  res.redirect('viewall')
});
router.get('/viewall',function(req,res){
  Image.find({}, null, {sort: {created: -1}}, function(err, images) {
    if(err) console.log(err);
    // console.log(images);
    res.render('allimages',{images:images});
  });
});
module.exports = router;
