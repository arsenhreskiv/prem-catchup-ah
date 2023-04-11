var express = require('express');
var ensureLoggedIn = require('../config/ensureLoggedIn');
var router = express.Router();
var matchesCtrl = require('../controllers/matches');

/* GET users listing. */
router.get('/', matchesCtrl.index);

router.get('/new', ensureLoggedIn, matchesCtrl.new);

router.post('/', matchesCtrl.create);

router.get('/:id', matchesCtrl.show)

router.post('/', ensureLoggedIn, matchesCtrl.create)

module.exports = router;
