let express = require('express')
let api_routes = require ('./routes/api.js')
let path = require('path')

//create web application
let app = express()

// the 127.0.0.1:3000 has the same web application as 127.0.0.1:8080/api/students

let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))

// be able to handle JSON request, convert data to JavaScript
app.use(express.json())

app.use('/api', api_routes)

app.use(function(req, res, next) {
    // respond with a 404 to any other request
    res.status(404).send('Not found')
})

app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Server error')
})

// start server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})

