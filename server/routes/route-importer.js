const router = require('express').Router();
const upload_image_route = require('./upload-image/upload.image.route');


router.use('/upload-image', upload_image_route);

router.use('/*', (req, res) => {
    res.status(404).send({
        statusCode: 404,
        status: 'Not Found',
    });
});

module.exports = router;