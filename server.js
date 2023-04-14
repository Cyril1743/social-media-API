const express = require("express")
const db = require("./config/connection.js")

//Setting up express
const PORT = 3001
const app = express()

app.use(express.json())