const multer = require('multer');
const path = require('path')


const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    }, filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// const s = path.join(path.dirname(__dirname)) + '/images'
// console.log(s, 'nnnnnn');

const maxSize = 3 * 1024 * 1024            // approxmately 5MB

const fileUpload = multer({
    storage: fileStorage,
    fileFilter: (req, file, callback) => {
        console.log("uploading file........");
        if (file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            console.log('hope all good');
            callback(null, true);
        } else {
            callback(null, false)
            return callback(new Error('only .jpg or .png or .jpeg file is accepted'));
        }
    },
    limits: {
        fileSize: maxSize
    }
});

module.exports = fileUpload;
