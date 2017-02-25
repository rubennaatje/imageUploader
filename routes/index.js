var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  dest: 'public/uploads/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Express' });
});

router.post('/upload', upload.single('displayImage'), function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
