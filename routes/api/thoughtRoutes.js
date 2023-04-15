const thought = require("express").Router()
const { getAllThoughts, getThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require("../../controllers/thoughtControllers")

thought.route("/").get(getAllThoughts)

thought.route("/:id").get(getThought).post(createThought).put(updateThought).delete(deleteThought)

thought.route("/:id/reactions").post(createReaction)

thought.route("/:id/reactions/:reactionId").delete(deleteReaction)