const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


let notes = [
    {
        "id": 1,
        "content": "How to use: \n 1. type in text area & click '+' to save. \n 2. Hover on card to get delete/edit options."
    },
    {
        "id": 2,
        "content": "“Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way.” – Michael Scott (Season 5, The Duel)"
    },
    {
        "id": 3,
        "content": "“I wish there was a way to know you’re in the good old days, before you’ve actually left them.” – Andy Bernard (Season 9, Finale)"
    }
]


app.get('/notes', (req, res) => {
    res.json(notes)
})

app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id)

    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.post('/notes', (req, res) => {
    const content = req.body.content
    const id = () => {
        if (notes.length > 0) {
            return Math.max(...notes.map(note => note.id)) + 1
        } else {
            return 1
        }
    }

    if (content) {
        const note = {
            "id": id(),
            "content": content
        }
        notes = notes.concat(note)
        res.send(note)
    } else {
        res.status(400).send({ error: 'content is missing' })
    }
})

app.put('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const updatedNote = req.body.content

    const updatedNotes = notes.map(note => {
        if (note.id === id) {
            return { "id": id, "content": updatedNote }
        } else {
            return note
        }
    })

    notes = updatedNotes
})

app.delete('/notes/:id', (req, res) => {
    const id = Number(req.params.id)

    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})