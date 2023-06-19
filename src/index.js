const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dbConnection = require('./db_connection/mongodb')
const AdminRoutes = require('./routes/admin')
const PlayerRoutes = require('./routes/player')
// const UserRoutes = require('./routes/user')
const cors = require('cors')
require('dotenv').config()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())


//Database connection
dbConnection()


//all routes
app.use('/admin', AdminRoutes)
app.use('/payer', PlayerRoutes)
// app.use('/user', UserRoutes)




app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Express running with port...${process.env.PORT || 5000}`)
})