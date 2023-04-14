const Thought = require("../models/Thought")
const User = require("../models/User.js")

module.exports = {
    async getAllUsers(req, res) {
        try {
            const allUsers = await User.find({})

            res.json(allUsers)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async newUser(req, res) {
        try {
            const newUser = await User.create(req.body)

            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            .populate(['post', 'friends'])

            if (!user) {
                return res.json("No user found")
            }

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true })

            if (!updatedUser) {
                return res.status(404).json("No user found")
            }

            res.json(updatedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete(
                { _id: req.params.id }
            )
            
            await Thought.deleteMany({username: deletedUser.username})

            if (!deletedUser){
                return res.status(404).json("No user found")
            }

            res.json(deletedUser)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async addFriend(req, res) {
        try {
             const user = await User.findOneAndUpdate(
                {_id : req.params.id}, 
                { $push : { friends: req.params.friendId}}, 
                {new: true})
                .populate("friends")

                if (!user){
                    return res.status(404).json("No such user")
                }

                res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.id},
                { $pull : {friends: req.params.friendId}},
                {new: true})
                .populate("friends")
            
                if(!user) {
                    return res.status(404).json("No such user")
                }

                res.json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}