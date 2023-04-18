const Thought = require("../models/Thought")
const User = require("../models/User")

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const allThoughts = await Thought.find({})

            res.json(allThoughts)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async getThought(req, res) {
        try {
            const thought = await Thought.find({ _id: req.params.id })

            if (!thought) {
                return res.status(404).json("No thought found")
            }

            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createThought(req, res) {
        try {
            const newThought = await Thought.create({ username: req.body.username, thoughtText: req.body.thoughtText })
            const user = await User.updateOne(
                { _id: req.body.userId },
                { $push: { thoughts: newThought.id } },
                { new: true })

            if (!user) {
                return res.json("No user found, but post created")
            }

            res.status(201).json(newThought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThouhgt = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { thoughtText: req.body.thoughtText } },
                { new: true })

            if (!updatedThouhgt) {
                return res.status(404).json("No thought with that Id")
            }

            res.status(200).json(updatedThouhgt)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.id })
            const user = await User.findOneAndUpdate({ username: deletedThought.username }, {
                $pull: { thoughts: deletedThought.id }
            })

            if (!deletedThought) {
                return res.status(404).json("No thought with that Id")
            }

            res.json(deletedThought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async createReaction(req, res) {
        try {
            const newReaction = {
                reactionBody: req.body.reactionBody,
                username: req.body.username
            }
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { reactions: newReaction } },
                { new: true })

            if (!thought) {
                return res.status(404).json("No thought with that Id")
            }

            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOne({_id : req.params.id})

            if (!thought) {
                return res.status(404).json("No thought with that Id")
            }

            thought.reactions.pull(req.params.reactionId)
            thought.save()
            
            res.json(thought)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}