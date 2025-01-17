const router = require('express').Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');

router.post('/comment', auth, commentController.createComment)
router.post('/comment/:id', auth, commentController.updateComment);
router.patch('/comment/:id/like', auth, commentController.likeComment)
router.patch('/comment/:id/unlike', auth, commentController.unlikeComment)
router.delete('/comment/:id', auth, commentController.deleteComment)

module.exports = router;