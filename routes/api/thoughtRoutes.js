const thought = require("express").Router()

thought.route("/").get(getAllThoughts)

thought.route("/:id").get(getThought).post(createThought).put(updateThought).delete(deleteThought)

thought.route("/:id/reactions").post(createReaction).delete(deleteReaction)