import './GiftItem.css'

function GiftItem({ item }) {
  const handleClick = () => {
    if (item.link && item.link !== '#') {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="gift-item" onClick={handleClick}>
      <div className="gift-item-content">
        {item.image ? (
          <img src={item.image} alt={item.title} className="gift-item-image" />
        ) : (
          <div className="gift-item-placeholder">
            <span className="gift-icon-small">🎁</span>
          </div>
        )}
        <h3 className="gift-item-title">{item.title}</h3>
        {item.description && (
          <p className="gift-item-description">{item.description}</p>
        )}
      </div>
    </div>
  )
}

export default GiftItem

