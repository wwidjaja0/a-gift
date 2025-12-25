import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// CORS configuration - allow your frontend domain
const allowedOrigins = [
  'https://gift-from-wid.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173', // Vite default port
  process.env.FRONTEND_URL
].filter(Boolean) // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(express.json())

const notesFilePath = path.join(__dirname, 'notes.json')

// Ensure notes.json exists
if (!fs.existsSync(notesFilePath)) {
  fs.writeFileSync(notesFilePath, JSON.stringify({
    person1: {
      note: "Hello! This is a personalized note for person1. You can customize this message for each person.",
      imageUrl: "",
      musicUrl: ""
    },
    person2: {
      note: "Hello! This is a personalized note for person2. You can customize this message for each person.",
      imageUrl: "",
      musicUrl: ""
    }
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
        res.json({ note: personNote, imageUrl: '', musicUrl: '' })
      } else {
        res.json({ 
          note: personNote.note || '',
          imageUrl: personNote.imageUrl || '',
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})

