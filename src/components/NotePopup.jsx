import { useState, useEffect } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'
import './NotePopup.css'

function NotePopup({ personId, onClose }) {
  const [note, setNote] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/api/notes/${personId}`)
        setNote(response.data.note || '')
        setImageUrl(response.data.imageUrl || '')
        setError(null)
      } catch (err) {
        console.error('Error fetching note:', err)
        setError('Failed to load note. Please try again.')
        setNote('')
      } finally {
        setLoading(false)
      }
    }

    if (personId) {
      fetchNote()
    }
  }, [personId])

  const handleClose = () => {
    setIsClosing(true)
    // Wait for exit animation to complete before closing
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div 
      className={`note-popup-overlay ${isClosing ? 'closing' : ''}`} 
      onClick={handleClose}
    >
      <div 
        className={`note-popup ${isClosing ? 'closing' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="note-popup-close" onClick={handleClose}>
          ×
        </button>
        <div className="note-popup-content">
          {loading ? (
            <div className="note-loading">
              <div className="loading-spinner"></div>
              <p>Loading your letter...</p>
            </div>
          ) : error ? (
            <div className="note-error">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <h2 className="note-title">Your Letter</h2>
              <div className="note-text">
                <p>{note}</p>
              </div>
              {imageUrl && (
                <div className="note-image-container">
                  <div className="note-image-separator"></div>
                  <img
                    src={imageUrl}
                    alt="Letter attachment"
                    className="note-image"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotePopup

