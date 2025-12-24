import { useRef, useEffect } from 'react'
import './FoodItem.css'

function FoodItem({ food, onDragStart, onDrag, onDragEnd }) {
  const itemRef = useRef(null)
  const isDraggingRef = useRef(false)
  const pointerIdRef = useRef(null)
  const offsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const element = itemRef.current
    if (!element) return

    const handlePointerDown = (e) => {
      e.preventDefault()
      e.stopPropagation()
      isDraggingRef.current = true
      pointerIdRef.current = e.pointerId
      element.setPointerCapture(e.pointerId)
      
      // Calculate offset based on food's stored position (food.x, food.y)
      // This ensures consistency with how positions are stored
      const clickXvw = (e.clientX / window.innerWidth) * 100
      const clickYvh = (e.clientY / window.innerHeight) * 100
      
      // Offset is the difference between click position and food's stored position
      // This maintains the relative position when dragging
      offsetRef.current = {
        x: clickXvw - food.x,
        y: clickYvh - food.y
      }
      
      onDragStart(food.id)
    }

    const handlePointerMove = (e) => {
      if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId) return
      e.preventDefault()
      
      // Use viewport coordinates directly (vw/vh) and apply offset
      const x = (e.clientX / window.innerWidth) * 100 - offsetRef.current.x
      const y = (e.clientY / window.innerHeight) * 100 - offsetRef.current.y
      
      onDrag(food.id, x, y)
    }

    const handlePointerUp = (e) => {
      if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId) return
      e.preventDefault()
      
      isDraggingRef.current = false
      if (pointerIdRef.current !== null) {
        element.releasePointerCapture(pointerIdRef.current)
        pointerIdRef.current = null
      }
      
      // Use viewport coordinates directly (vw/vh) and apply offset
      const x = (e.clientX / window.innerWidth) * 100 - offsetRef.current.x
      const y = (e.clientY / window.innerHeight) * 100 - offsetRef.current.y
      
      // Reset offset
      offsetRef.current = { x: 0, y: 0 }
      
      onDragEnd(food.id, x, y)
    }

    const handlePointerCancel = (e) => {
      if (pointerIdRef.current === e.pointerId) {
        isDraggingRef.current = false
        element.releasePointerCapture(e.pointerId)
        pointerIdRef.current = null
        // Reset offset
        offsetRef.current = { x: 0, y: 0 }
        // Resume falling if cancelled
        onDragEnd(food.id, food.x, food.y)
      }
    }

    element.addEventListener('pointerdown', handlePointerDown)
    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerup', handlePointerUp)
    element.addEventListener('pointercancel', handlePointerCancel)
    element.addEventListener('pointerleave', handlePointerUp)

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerup', handlePointerUp)
      element.removeEventListener('pointercancel', handlePointerCancel)
      element.removeEventListener('pointerleave', handlePointerUp)
    }
  }, [food.id, food.x, food.y, onDragStart, onDrag, onDragEnd])

  const getFoodShape = () => {
    const { type } = food
    
    switch (type.shape) {
      case 'banana':
        return (
          <g>
            <path
              d="M 30 30 Q 40 20 50 25 Q 60 30 65 40 Q 70 55 65 70 Q 60 80 50 75 Q 40 80 35 70 Q 30 55 30 40 Z"
              fill={type.color}
            />
            <ellipse cx="45" cy="50" rx="3" ry="8" fill="#FFD700" opacity="0.6" />
            <ellipse cx="55" cy="55" rx="3" ry="8" fill="#FFD700" opacity="0.6" />
          </g>
        )
      case 'carrot':
        return (
          <g>
            <path
              d="M 50 15 L 60 25 L 65 35 L 63 50 L 60 65 L 55 75 L 50 80 L 45 75 L 40 65 L 37 50 L 35 35 L 40 25 Z"
              fill={type.color}
            />
            <path
              d="M 50 15 L 45 5 L 50 10 L 55 5 Z"
              fill="#228B22"
            />
            <path
              d="M 50 15 L 48 8 L 50 12 L 52 8 Z"
              fill="#32CD32"
            />
          </g>
        )
      default: // circle for strawberry, cookie, apple
        if (type.id === 'strawberry') {
          return (
            <g>
              <circle cx="50" cy="50" r="30" fill={type.color} />
              <circle cx="45" cy="45" r="5" fill="#FF1493" opacity="0.7" />
              <circle cx="55" cy="45" r="5" fill="#FF1493" opacity="0.7" />
              <circle cx="50" cy="55" r="5" fill="#FF1493" opacity="0.7" />
              <path d="M 50 20 L 48 10 L 50 12 L 52 10 Z" fill="#228B22" />
            </g>
          )
        } else if (type.id === 'cookie') {
          return (
            <g>
              <circle cx="50" cy="50" r="30" fill={type.color} />
              <circle cx="40" cy="45" r="3" fill="#8B4513" />
              <circle cx="55" cy="50" r="3" fill="#8B4513" />
              <circle cx="50" cy="60" r="3" fill="#8B4513" />
              <circle cx="45" cy="55" r="2" fill="#8B4513" />
            </g>
          )
        } else {
          // apple
          return (
            <g>
              <circle cx="50" cy="50" r="30" fill={type.color} />
              <path d="M 50 20 L 48 10 L 50 12 L 52 10 Z" fill="#228B22" />
              <ellipse cx="45" cy="45" rx="4" ry="6" fill="#FFB6C1" opacity="0.8" />
            </g>
          )
        }
    }
  }

  const driftOffset = food.state === 'falling' 
    ? Math.sin(food.rotation * Math.PI / 180) * 2 
    : 0

  return (
    <div
      ref={itemRef}
      className={`food-item ${food.state} ${food.dragging ? 'dragging' : ''}`}
      style={{
        left: `${food.x + driftOffset}vw`,
        top: `${food.y}vh`,
        transform: `rotate(${food.rotation}deg) ${food.dragging ? 'scale(1.1)' : 'scale(1)'}`,
        '--food-color': food.type.color,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="food-svg"
      >
        {getFoodShape()}
      </svg>
    </div>
  )
}

export default FoodItem

