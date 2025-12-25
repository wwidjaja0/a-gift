import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const notesFilePath = path.join(__dirname, 'notes.json')

// Ensure notes.json exists
if (!fs.existsSync(notesFilePath)) {
  fs.writeFileSync(notesFilePath, JSON.stringify({
    person1: "Hello! This is a personalized note for person1. You can customize this message for each person.",
    person2: "Hello! This is a personalized note for person2. You can customize this message for each person."
  }, null, 2))
}

// GET /api/notes/:personId
app.get('/api/notes/:personId', (req, res) => {
  try {
    const { personId } = req.params
    const notesData = JSON.parse(fs.readFileSync(notesFilePath, 'utf8'))
    
    if (notesData[personId]) {
      const personNote = notesData[personId]
      // Handle both old format (string) and new format (object)
      if (typeof personNote === 'string') {
        res.json({ note: personNote })
      } else {
        res.json({ 
          note: personNote.note || '',
          musicUrl: personNote.musicUrl || ''
        })
      }
    } else {
      res.status(404).json({ error: 'Note not found for this person' })
    }
  } catch (error) {
    console.error('Error reading notes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

