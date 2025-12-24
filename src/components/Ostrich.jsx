import { useEffect, useRef } from 'react'
import './Ostrich.css'

function Ostrich({ state, reducedMotion, onMouthPosition }) {
  const containerRef = useRef(null)
  const blinkIntervalRef = useRef(null)

  // Update mouth position for proximity detection
  useEffect(() => {
    const updateMouthPosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const mouthX = (rect.left + rect.width / 2) / window.innerWidth * 100
        const mouthY = (rect.top + rect.height * 0.4) / window.innerHeight * 100
        onMouthPosition(mouthX, mouthY)
      }
    }
    
    updateMouthPosition()
    window.addEventListener('resize', updateMouthPosition)
    return () => window.removeEventListener('resize', updateMouthPosition)
  }, [onMouthPosition])

  // Blink animation
  useEffect(() => {
    if (reducedMotion) return
    
    const blink = () => {
      const eyes = containerRef.current?.querySelectorAll('.eye')
      if (eyes) {
        eyes.forEach(eye => {
          eye.classList.add('blink')
          setTimeout(() => eye.classList.remove('blink'), 150)
        })
      }
    }

    blinkIntervalRef.current = setInterval(blink, 3000 + Math.random() * 3000)
    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current)
      }
    }
  }, [reducedMotion])

  return (
    <div 
      ref={containerRef}
      className={`ostrich-container ${state} ${reducedMotion ? 'reduced-motion' : ''}`}
    >
      <svg
        className="ostrich"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body */}
        <ellipse
          cx="100"
          cy="120"
          rx="50"
          ry="60"
          fill="#F5DEB3"
          className="body"
        />
        
        {/* Neck */}
        <ellipse
          cx="100"
          cy="80"
          rx="25"
          ry="50"
          fill="#F5DEB3"
          className="neck"
        />
        
        {/* Head */}
        <ellipse
          cx="100"
          cy="40"
          rx="35"
          ry="30"
          fill="#F5DEB3"
          className="head"
        />
        
        {/* Beak - changes based on state */}
        <path
          d={state === 'anticipation' || state === 'happy' 
            ? "M 85 45 L 65 50 L 85 55 Z" 
            : "M 85 48 L 70 50 L 85 52 Z"}
          fill="#FFA500"
          className="beak"
        />
        
        {/* Eyes */}
        <circle
          cx="92"
          cy="38"
          r={state === 'anticipation' ? "6" : "5"}
          fill="#000"
          className="eye"
        />
        <circle
          cx="108"
          cy="38"
          r={state === 'anticipation' ? "6" : "5"}
          fill="#000"
          className="eye"
        />
        
        {/* Eye highlights */}
        <circle
          cx="94"
          cy="36"
          r="2"
          fill="#FFF"
          className="eye-highlight"
        />
        <circle
          cx="110"
          cy="36"
          r="2"
          fill="#FFF"
          className="eye-highlight"
        />
        
        {/* Legs */}
        <rect
          x="85"
          y="170"
          width="8"
          height="30"
          fill="#FFA500"
          rx="4"
          className="leg"
        />
        <rect
          x="107"
          y="170"
          width="8"
          height="30"
          fill="#FFA500"
          rx="4"
          className="leg"
        />
        
        {/* Feet */}
        <ellipse
          cx="89"
          cy="200"
          rx="12"
          ry="6"
          fill="#FF6347"
          className="foot"
        />
        <ellipse
          cx="111"
          cy="200"
          rx="12"
          ry="6"
          fill="#FF6347"
          className="foot"
        />
        
        {/* Tail feathers */}
        <ellipse
          cx="150"
          cy="110"
          rx="20"
          ry="40"
          fill="#DEB887"
          className="tail-feather"
        />
        <ellipse
          cx="155"
          cy="100"
          rx="15"
          ry="35"
          fill="#CD853F"
          className="tail-feather"
        />
      </svg>
    </div>
  )
}

export default Ostrich

