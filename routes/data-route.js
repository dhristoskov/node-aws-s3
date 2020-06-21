const express = require('express');

const router = express.Router();
const dataController = require('../controllers/data-controller');
const fileUpload = require('../middleware/file-upload');

router.post('/upload', fileUpload.single('data'), dataController.uploadData);
router.get('/:name', dataController.getData);


module.exports = router;