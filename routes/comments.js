var express = require('express');
const ensureLoggedIn = require('../config/ensureLoggedIn');
var router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/matches/:id/comments', ensureLoggedIn, commentsCtrl.create)

router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete)

module.exports = router;