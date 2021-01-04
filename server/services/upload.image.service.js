const multer = require('multer');
var fileExtension = require('file-extension')
const path = require('path')

// Configure Storage
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/'))
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
});


var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 8MBs
        fileSize: 8000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
});
module.exports = upload;