var express = require('express');
var router = express.Router();
var Image = require('../models/Image');
var multer = require('multer');
var request = require('request');

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
router.post('/upload',upload.single('file'), function(req, res) {
  var ip = req.connection.remoteAddress;
  request('http://freegeoip.net/json/113.2.212.218', function (error, response, body) {
     console.log(response.statusCode);
    var location = 'unknown';
     if(response.statusCode == 200){

      var jsonLocation = JSON.parse(body);

      location =  jsonLocation.country_name+', '+jsonLocation.region_name;
    }
    var newImage = new Image({name:req.file.filename,ip:req.connection.remoteAddress,location:location});
    newImage.save();
    res.redirect('view/'+newImage.sId);
  });


  
});
router.get('/viewall',function(req,res){
  Image.find({}, null, {sort: {created: -1}}, function(err, images) {
    if(err) console.log(err);
    // console.log(images);
    res.render('allimages',{images:images});
  });
});


router.get('/view/:id',function(req,res){
  var id = req.params.id;
  Image.find({sId: id}, function(err,image){
    if(err){console.log(err);}
    console.log(image);
    res.render('view',{image: image[0]});
  })
});

module.exports = router;
