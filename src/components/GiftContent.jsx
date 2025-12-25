import GiftItem from './GiftItem'
import './GiftContent.css'

function GiftContent() {
  // Example gift items - can be customized or loaded from props/state
  const giftItems = [
    {
      id: 1,
      title: 'Gift Item 1',
      description: 'Click to discover',
      image: null, // Can add image URL here
      link: '#',
      type: 'link'
    },
    {
      id: 2,
      title: 'Gift Item 2',
      description: 'Click to discover',
      image: null,
      link: '#',
      type: 'link'
    },
    {
      id: 3,
      title: 'Gift Item 3',
      description: 'Click to discover',
      image: null,
      link: '#',
      type: 'link'
    }
  ]

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

