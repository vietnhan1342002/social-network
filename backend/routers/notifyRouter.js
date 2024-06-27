const router = require('express').Router();
const auth = require('../middlewares/auth');
const notifyController = require('../controllers/notifyController');

router.post('/notify', auth, notifyController.createNotify);
router.delete('/notify/:id', auth, notifyController.removeNotify);
router.get('/notifies', auth, notifyController.getNotify);
router.delete('/deleteallnotify', auth, notifyController.deleteAllNotify);
router.delete('/isreadnotify/:id', auth, notifyController.isReadNotify);


module.exports = router;