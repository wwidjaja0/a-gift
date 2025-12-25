import { Routes, Route, useParams, Navigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import API_BASE_URL from './config/api'
import LoadingScreen from './components/LoadingScreen'
import GiftWrapper from './components/GiftWrapper'
import GiftContent from './components/GiftContent'
import Letter from './components/Letter'
import NotePopup from './components/NotePopup'

function GiftPage() {
  const { personId } = useParams()
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [showNotePopup, setShowNotePopup] = useState(false)
  const [musicUrl, setMusicUrl] = useState('')
  const audioRef = useRef(null)

  // Fetch music URL when gift is opened
  useEffect(() => {
    if (giftOpened && personId) {
      const fetchMusic = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/notes/${personId}`)
          if (response.data.musicUrl) {
            setMusicUrl(response.data.musicUrl)
          }
        } catch (err) {
          console.error('Error fetching music:', err)
        }
      }
      fetchMusic()
    }
  }, [giftOpened, personId])

  // Play music when musicUrl is available
  useEffect(() => {
    if (musicUrl && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Error playing music:', err)
      })
    }
  }, [musicUrl])

  if (!personId) {
    return <Navigate to="/default" replace />
  }

  return (
    <div className="app">
      {!loadingComplete ? (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      ) : !giftOpened ? (
        <GiftWrapper onOpen={() => setGiftOpened(true)}>
        </GiftWrapper>
      ) : (
        <div className="main-content">
          <div className="snow"></div>
          {musicUrl && (
            <audio
              ref={audioRef}
              src={musicUrl}
              loop
              preload="auto"
              style={{ display: 'none' }}
            />
          )}
          <GiftContent personId={personId} />
          <Letter onClick={() => setShowNotePopup(true)} />
          {showNotePopup && (
            <NotePopup
              personId={personId}
              onClose={() => setShowNotePopup(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/default" replace />} />
      <Route path="/:personId" element={<GiftPage />} />
    </Routes>
  )
}

export default App

