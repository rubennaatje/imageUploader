var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/test');
var multer = require('multer');
var upload = multer({
    dest: 'public/uploads/',
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    }
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});
var imageSchema = mongoose.Schema({
    name: String,
    ip: String,
    created: { type: Date, default: Date.now },
    public: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});

imageSchema.methods.speak = function () {
    return this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
};


module.exports = mongoose.model('Image', imageSchema);