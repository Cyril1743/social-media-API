const users = require("express").Router()
const {getAllUsers, newUser, getUserById, updateUser, deleteUser, addFriend, removeFriend} = require("../../controllers/userControllers.js")

users.route("/").get(getAllUsers).post(newUser)

users.route("/:id").get(getUserById).put(updateUser).delete(deleteUser)

users.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend)

module.exports = users