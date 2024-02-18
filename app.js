const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors') 



const errMiddleware = require('./middleware/error')




app.use(cors());
app.use(express.json())
app.use(bodyParser.json());


//Routes
const userRoute = require('./routes/userRoute')



app.use('/api',userRoute)




//MiddleWare for Error
app.use(errMiddleware)

module.exports = app