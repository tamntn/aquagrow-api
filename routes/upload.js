const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'aquagrow',
    api_key: '798717396695557',
    api_secret: 'NZ5pJUWxbuOsaoW6PH3uOjvZHPo'
});

router.post('/api/upload', upload.array('files[]'), function (req, res) {
    const base64Img = req.files[0].buffer.toString('base64');
    cloudinary.v2.uploader.unsigned_upload_stream("n6tcbf4d", function (err, result) {
        if (err) {
            res.send({ error: "Profile picture upload failed!" });
        } else {
            res.send(result);
        }
    }).end(req.files[0].buffer);
})

module.exports = router;