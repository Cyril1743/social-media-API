const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/socialMediaDB')

module.exports = mongoose.connection