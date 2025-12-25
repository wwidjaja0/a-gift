import './Letter.css'

function Letter({ onClick }) {
  return (
    <div className="letter-container">
      <div className="letter">
        <div className="letter-envelope" onClick={onClick}>
          <div className="envelope-body"></div>
        </div>
        <div className="letter-content">
        </div>
      </div>
    </div>
  )
}

export default Letter

