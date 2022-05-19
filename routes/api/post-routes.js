const router = require ('express').Router();
const { Post, User, Vote } = require('../../models');
const sequelize = require('../../config/connection');

// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
  Vote.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id
  }).then(() => {
    // then find the post we just voted on
    return Post.findOne({
      where: {
        id: req.body.post_id
      },
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
        [
          sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
          'vote_count'
        ]
      ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });  
  });
});

module.exports = router;