const Users = require("../models/userModel");

const userController = {
    searchUser: async (req, res) => {
        try {
            const users = await Users.find({ username: { $regex: req.query.username } }).limit(10).select("fullname username avatar")
            res.json({ users })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findOne({ _id: req.params.id }).select("-password");
            if (!user) return res.status(400).json({ msg: "No user exits" });
            res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { website, fullname, story, phone, address, avatar } = req.body;

            if (!fullname) return res.status(500).json({ msg: "Fullname is requires" });

            await Users.findOneAndUpdate({ _id: req.body._id }, {
                website, fullname, story, phone, address, avatar
            });
            res.json({ msg: 'update success' });


        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    friend: async (req, res) => {
        try {
            const user = await Users.find({ _id: req.params._id, friends: req.user_id });

            if (user.length > 0) return res.status(400).json({ msg: "You have already followed" });

            const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { friends: req.user_id }
            }, { new: true }).populate("friends following", "-password");

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { following: req.params.id }
            }, { new: true });

            res.json({ newUser });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    unfriend: async (req, res) => {
        try {

            const newUser = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { friends: req.user_id }
            }, { new: true });

            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { following: req.params.id }
            }, { new: true }).populate("friends following", "-password");

            res.json({ newUser });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = userController;