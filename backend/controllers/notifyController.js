const Notifies = require('../models/notifyModel');

const notifyController = {
    createNotify: async (req, res) => {
        try {
            const { id, recipients, url, content, image, text, isRead } = req.body;

            if (recipients.include(req.user._id.toString())) return;

            const notify = await new Notifies({
                id, recipients, url, content, image, text, isRead, user: req.user
            })
            notify.save()
            return res.json({ notify })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    removeNotify: async (req, res) => {
        try {
            const notify = await Notifies.findOneAndDelete({
                _id: req.params.id,
                url: req.query.url
            })

            return res.json({ notify })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    }
    ,
    getNotify: async (req, res) => {
        try {
            const notifies = await Notifies.find({
                recipients: req.user._id
            }).sort("createdAt").populate("user", "avatar fullname username")

            return res.json({ notifies })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    isReadNotify: async (req, res) => {
        try {
            const notifies = await Notifies.findOneAndUpdate({
                _id: req.params.id
            }, { isRead: true })

            return res.json({ notifies })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
    deleteAllNotify: async (req, res) => {
        try {
            const notify = await Notifies.deleteMany({
                recipients: req.user._id
            })

            return res.json({ notifies })
        } catch (err) {
            return res.status(500).json({
                msg: err.message
            })
        }
    },
}

module.exports = notifyController;