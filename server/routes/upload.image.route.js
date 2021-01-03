const express = require('express');
const router = express.Router();
const upload = require('../services/upload.image.service');

router.post('/', upload.single('Image'), (req, res, next) => {
    const file = req.file
    // console.log(req);
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
});

module.exports = router;