const express = require("express")
const db = require("./config/connection.js")
const routes = require("./routes")

//Setting up express
const PORT = 3001
const app = express()

app.use(express.json())
app.use(routes)

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`App listening on ${PORT}`)
    })
})