const multer = require('multer');
const path = require('path');
const { BadRequest } = require('../helpers/errors');
const TEMP_DIR = path.resolve('./tmp');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, TEMP_DIR)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const avatarMiddleware = multer({
    storage: storage,
    fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype.includes('image')) {
            cb(null, true)
        } else {
            cb(new BadRequest(400, 'Wrong format'))
        }
    },
    limits: {
        fieldNameSize: 100,
        fileSize: 5000000,
    }
})

module.exports = avatarMiddleware;