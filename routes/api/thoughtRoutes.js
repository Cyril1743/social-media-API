const thought = require("express").Router()
const { getAllThoughts, getThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require("../../controllers/thoughtControllers")

thought.route("/").get(getAllThoughts).post(createThought)

thought.route("/:id").get(getThought).put(updateThought).delete(deleteThought)

thought.route("/:id/reactions").post(createReaction)

thought.route("/:id/reactions/:reactionId").delete(deleteReaction)

module.exports = thought