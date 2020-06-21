const uuid = require('uuid').v4;
const fs = require('fs')
const AWS = require('aws-sdk');

require('dotenv').config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
})

const MIME_TYPE = {
    'application/pdf': 'pdf',
    'text/plain': 'txt',   
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const uploadData = ( req, res ) => {

    const ext = MIME_TYPE[req.file.mimetype];
    const fileName = uuid() + '.' + ext;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer
    };

    try{
        s3.upload(params, (error, data) => {
            if(error){
               res.status(500).send(error);
            }
            res.status(200).send(data);
        });
    }catch(err){
        console.error(err.message)
        res.status(500).send({msg: 'Uploading failed, please try again'});
    }
}

const getData = ( req, res ) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.name,
    };

    try{
        s3.getObject(params, ( error, data ) => {
            if(error){
                res.status(500).send(error);
             }
             res.status(200).send(data.Body.toString());
        })
    }catch(err){
        console.error(err.message)
        res.status(500).send({msg: 'Fatching failed, please try again'});
    }

}

exports.uploadData = uploadData;
exports.getData = getData;