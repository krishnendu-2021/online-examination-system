require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const main = require("./db")
const cors = require('cors')
const router = require("./routes/router")
const Student = require("./models/studentSchema")

app.use(cors())
app.use(express.json())
app.use(router)

const port = process.env.PORT || 5000
if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}
  
app.listen(port, () => {
console.log(`Example app listening on port http://localhost:${port}`)
})