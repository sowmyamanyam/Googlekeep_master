const multer = require('multer');
const path = require('path');
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config()

// need to create a aws configuration json fileError
// AWS.config.loadFromPath('./config/awsConfig.json');
AWS.config.update({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    region:process.env.REGION
  });


const s3 = new AWS.S3();

// Init Upload setting the configuration of S3 aws
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ravikeepimage',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null,new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
        }
    })

})
// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, '\images');
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//     }
//   });
//   const upload= multer({ storage: fileStorage }).single('image')

module.exports = upload
