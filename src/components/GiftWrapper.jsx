import { useState } from 'react'
import './GiftWrapper.css'

function GiftWrapper({ onOpen, children }) {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const handleClick = () => {
    if (!isOpening && !isOpened) {
      setIsOpening(true)
      // After animation completes, mark as opened and notify parent
      setTimeout(() => {
        setIsOpened(true)
        onOpen()
      }, 1500)
    }
  }

  return (
    <div className="gift-wrapper">
      <div className={`gift-container ${isOpening ? 'opening' : ''} ${isOpened ? 'opened' : ''}`}>
        <div className="gift-element-wrapper">
          {children || (
            <div className="gift-emoji-container">
              <span className="gift-emoji" onClick={handleClick}>🎁</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GiftWrapper

