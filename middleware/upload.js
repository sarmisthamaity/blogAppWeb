const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    }, filename: (req, file, callback) => {
        callback(null, Date.now() + "____" + file.originalname);
    }
});

const maxSize = 5 * 1024 *1024            // approxmately 5MB

const fileUpload = multer({
    storage: fileStorage,
    fileFilter: (req, file, callback) => {
        console.log("uploading file........");
        if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
            callback(null, true);
        } else{
            callback(null, false)
            return callback(new Error ('only .jpg or .png or .jpeg file is accepted'));
        }   
    },
     limits: {
        fileSize: maxSize
    }
});

module.exports = fileUpload;