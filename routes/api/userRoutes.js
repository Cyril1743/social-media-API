const users = require("express").Router()

users.route("/").get(getAllUsers).post(newUser)

users.route("/:id").get(getUserById).put(updateUser).delete(deleteUser)
