const multer = require('multer')
const {v4:uuidv4} = require('uuid')
const path = require('path')

const upload = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public');
    },
    filename: function(req, file, cb){
        const uniqueName = uuidv4();
        cb(null, `/images/uploads/${uniqueName + path.extname(file.originalname)}`)
    }
});

module.exports = multer({storage: upload});