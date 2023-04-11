const Match = require('../models/match')

module.exports = {
    create,
    delete: deleteComment,
}

async function create(req, res) {
    const match = await Match.findById(req.params.id)

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    match.comments.push(req.body)
    try {
        await match.save()
    } catch (err) {
        console.log(err)
    }
    res.redirect(`/matches/${match._id}`)
}

async function deleteComment(req, res) {
    console.log(req.params)
    const match = await Match.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id})
    console.log(match)
    if(!match) return res.redirect('/matches')
    match.comments.remove(req.params.id)
    await match.save()
    res.redirect(`/matches/${match._id}`)
}
