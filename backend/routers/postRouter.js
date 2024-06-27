const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

router.route('/posts')
    .post(auth, postController.createPost)
    .get(auth, postController.getPost)
    

router.route('/post/:id')
    .patch(auth, postController.updatePost)
    .get(auth, postController.getSinglePost)
    .delete(auth, postController.deletePost)
    
router.patch('/post/:id/like', auth, postController.likePost)
router.patch('/post/:id/unlike', auth, postController.unlikePost)
router.get('/userposts/:id', auth, postController.getUserPosts)
router.patch('/save/:id', auth, postController.savePost)
router.patch('/unsave/:id', auth, postController.unsavePost)
router.get('/savedpostget', auth, postController.getsavedPost)


module.exports = router;