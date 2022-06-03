const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()

const { mongoose } = require('./database')

//Settings
app.set('port', process.env.PORT || 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use(require('./routes/task.routes'))

//Static files
app.use(express.static(path.join(__dirname, 'public')))


//Starting the server
app.listen(app.get('port'), (req,res) => {
    console.log(`Server on port ${app.get('port')}`)
})