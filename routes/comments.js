var express = require('express');
const ensureLoggedIn = require('../config/ensureLoggedIn');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');
const comments = require('../controllers/comments');

router.post('/matches/:id/comments', ensureLoggedIn, commentsCtrl.create)

router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete)

router.get('/matches/:matchId/comments/:commentId', commentsCtrl.edit)

router.put('/comments/:id', commentsCtrl.update)

module.exports = router;