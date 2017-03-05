Dropzone.options.myAwesomeDropzone = {
    accept: function(file, done) {
        console.log("uploaded");
        done();
    },
    init: function() {
        this.on("addedfile", function() {
            if (this.files[1]!=null){
                this.removeFile(this.files[0]);
            }
        });
    }
};

Dropzone.options.myAwesomeDropzone = {
    init: function () {
        this.on("complete", function (file) {
            if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                setTimeout(function(){
                    location.reload();
                },2000);
            }
        });
    }
};