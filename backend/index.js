const express = require('express')
const app = express()
require("./model.js/db")
const UserRoute = require('./routes/UserController')

app.use('/', UserRoute);

app.listen(3000, () =>{
  console.log("Initing code...")
})