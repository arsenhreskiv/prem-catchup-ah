const { Mongoose, default: mongoose } = require('mongoose')
const Match = require('../models/match')
//const Comment = require('../models/comment')

module.exports = {
    create,
    delete: deleteComment,
    update,
    edit
}


async function edit(req, res) {
    console.log(req.params)
    const match = await Match.findById(req.params.matchId)
    //console.log(match.comments)
    const comment = match.comments.find(c => c._id == req.params.commentId)
    //console.log(comment)
    res.render('matches/edit', { title: 'Edit Comment', comment})
}

async function update(req, res) {
    const match = await Match.findOneAndUpdate(
        {
            'comments.user': req.user._id,
            'comments._id': req.params.id
        },
        {
                'comments.$.content': req.body.content
        },
        {
        new: true
        }
    )
    await match.save()
console.log(match)
    // const match = await Match.findOne({'comments._id': req.params.id})
    // const commentSubdoc = match.comments.id(req.params.id);
    
    //   // Ensure that the comment was created by the logged in user
    //   if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/matches/${match._id}`);
    //   // Update the text of the comment
    //   console.log(commentSubdoc)
    //   commentSubdoc.content = req.body.content;
    //   console.log(commentSubdoc)
    //   // Save the updated book
    //   await match.save()
    //   // Redirect back to the book's show view
    res.redirect(`/matches/${match._id}`);
};

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
