const Match = require('../models/match')

module.exports = {
    index,
    new: newMatch,
    show,
    create
}

async function index(req, res) {
    const matches = await Match.find({})
    res.render('matches/index', { title: 'All Matches', matches})
}

function newMatch(req, res) {
    res.render('matches/new', { title: 'Add Match', errorMsg: ''})
    
}

async function show(req,res) {
    const match = await Match.findById(req.params.id)
    res.render('matches/show', { title: 'Match', match })
}

async function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
      }
      try {
        const match = await Match.create(req.body);
        res.redirect(`/matches/${match._id}`);
      } catch (err) {
        console.log(err);
        res.render('matches/new', { errorMsg: err.message });
      }
}