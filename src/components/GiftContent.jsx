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

  const gridClass = `gift-items-grid ${giftItems.length < 3 ? `few-items few-items-${giftItems.length}` : ''}`

  return (
    <div className="gift-content">
      <div className={gridClass} data-count={giftItems.length}>
        {giftItems.map((item) => (
          <GiftItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default GiftContent

