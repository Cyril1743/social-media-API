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
        const thought = await Thought.find({ _id: req.params.id })

        if (!thought) {
            return res.status(404).json("No thought found")
        }

        res.json(thought)
    },
    async createThought(req, res) {
        const newThought = await Thought.create({ username: req.body.username, thoughtText: req.body.thoughtText })
        const user = await User.updateOne(
            { _id: req.body.userId },
            { $push: { thoughts: newThought.id } },
            { new: true })

        if (!user){
            return res.json("No user found, but post created")
        }

        res.status(201).json(newThought)
    }
}