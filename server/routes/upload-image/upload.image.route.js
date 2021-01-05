const express = require('express');
const router = express.Router();
const upload = require('../../services/upload.image.service');
const path = require('path')

router.post('', upload.single('Image'), (req, res, next) => {
    const file = req.file
    // console.log(req);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    // console.log(req)
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file.filename,
    });

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
});

router.get('/images/:imageId', function (req, res) {
    const imageParam = req.params.imageId;
    res.sendFile(path.join(`${process.env.HOME || process.env.USERPROFILE}/downloads/${imageParam}`))
});

module.exports = router;