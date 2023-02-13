const express = require('express')
const router = express()
const { UserModel } = require('../model.js/UserModel')
router.use('/', (res, req) => {
    UserModel.find((err, data) => {
        if (!err) console.log(data);
        else console.log("Error to get data : " + err);
    })
})
module.exports = router