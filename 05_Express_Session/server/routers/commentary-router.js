//Third-Party Module
const express = require('express');

//Local Module
const commentaryController = require('../controllers/commentary-controller');

//Init Router
const router = express.Router();

router.get('/commentary', commentaryController.listCommentary);
router.post('/commentary', commentaryController.saveCommentary);
router.put('/commentary/:id', commentaryController.updateCommentary);
router.delete('/commentary/:id', commentaryController.deleteCommentary);

module.exports = router;