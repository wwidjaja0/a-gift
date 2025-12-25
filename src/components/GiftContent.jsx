import { useState, useEffect } from 'react'
import axios from 'axios'
import API_BASE_URL from '../config/api'
import GiftItem from './GiftItem'
import './GiftContent.css'

function GiftContent({ personId }) {
  const [giftItems, setGiftItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGiftItems = async () => {
      if (!personId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/api/notes/${personId}`)
        setGiftItems(response.data.giftItems || [])
      } catch (err) {
        console.error('Error fetching gift items:', err)
        setGiftItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchGiftItems()
  }, [personId])

  if (loading) {
    return (
      <div className="gift-content">
        <div className="gift-items-loading">Loading gifts...</div>
      </div>
    )
  }

  if (giftItems.length === 0) {
    return (
      <div className="gift-content">
        <div className="gift-items-empty">No gifts available</div>
      </div>
    )
  }

  return (
    <div className="gift-content">
      <div className="gift-items-grid">
        {giftItems.map((item) => (
          <GiftItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default GiftContent

