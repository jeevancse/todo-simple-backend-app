require("@babel/register");

const express = require("express");
const app = express()
const PORT = process.env.PORT || 3001
const bodyParser = require("body-parser")
require("dotenv").config()
const path = require("path");
const { pubRoute } = require("./src/routers/pub.router");
require("./src/configs/database.mongoose")
const cors = require("cors")


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use("/pub",pubRoute)

app.listen(PORT, function(){
    console.log(`App is listening at ${PORT}`)
})

  