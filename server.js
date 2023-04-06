var express = require('express')
var fs = require('fs')
var { v4:uuidv4 } = require('uuid')
var path = require('path')

var app = express()
var PORT = 3001

// Express Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))

// GET route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

// GET route to Send the note that is entered into the application 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

// GET route to Read and retrieve the notes that have been submitted
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    })
})

// POST route for all the notes 
app.post('/api/notes', (req, res) => {
    var newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var dataBase = JSON.parse(data)

        dataBase.push(newNote)
        fs.writeFile("./db/db.json", JSON.stringify(dataBase), (err) => {
            if (err) throw err
            console.log('added new note')
        })
        res.sendFile(path.join(__dirname, "/public/notes.html"))
    })
})

app.delete('/api/notes/:id', (req, res) => {
    var clicked = req.params.id

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var dataBase = JSON.parse(data)
// new DataBase to account for the deleted note. Will bring in everything that was not deleted. 
        var newDataBase = dataBase.filter(item => item.id !== clicked)
        
        fs.writeFile("./db/db.json", JSON.stringify(newDataBase), (err) => {
            if (err) throw err
            console.log('deleted note')
        })
        res.sendFile(path.join(__dirname, "/public/notes.html"))
    })
})


app.listen(PORT, function() {
    console.log(`App listening on PORT: http://localhost:${PORT}`)
})