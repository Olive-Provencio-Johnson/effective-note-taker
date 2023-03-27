var express = require('express')
var fs = require('fs')
var { v4:uuidv4 } = require('uuid')

var app = express()
var PORT = 3001

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))

app.listen(PORT, function() {
    console.log(`App listening on PORT: http://localhost:${PORT}`)
})