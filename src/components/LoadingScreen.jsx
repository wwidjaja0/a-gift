import { useEffect, useState } from 'react'
import './LoadingScreen.css'

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    // Animation duration: 2 seconds
    const duration = 2000
    const interval = 16 // ~60fps
    const increment = 100 / (duration / interval)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment
        if (newProgress >= 100) {
          clearInterval(progressTimer)
          setAnimationComplete(true)
          setTimeout(() => {
            onComplete()
          }, 300)
          return 100
        }
        return newProgress
      })
    }, interval)

    return () => clearInterval(progressTimer)
  }, [onComplete])

  return (
    <div className="loading-screen">
      <div className={`loading-content ${animationComplete ? 'fade-out' : ''}`}>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen

