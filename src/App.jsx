import { useState, useEffect, useRef, useCallback } from 'react'
import Ostrich from './components/Ostrich'
import FoodItem from './components/FoodItem'
import Sparkles from './components/Sparkles'
import MuteToggle from './components/MuteToggle'
import { useAudio } from './hooks/useAudio'
import { useReducedMotion } from './hooks/useReducedMotion'
import './App.css'

const FOOD_TYPES = [
  { id: 'strawberry', color: '#FF6B9D', shape: 'circle' },
  { id: 'banana', color: '#FFE66D', shape: 'banana' },
  { id: 'cookie', color: '#D4A574', shape: 'circle' },
  { id: 'carrot', color: '#FF8C42', shape: 'carrot' },
  { id: 'apple', color: '#FF6B6B', shape: 'circle' },
]

const MAX_FOOD_ITEMS = 8
const SPAWN_INTERVAL = 2000 // 2 seconds
const FALL_SPEED = 0.25 // vh per frame (half speed)
const ANTICIPATION_RADIUS = 12 // vh
const EAT_RADIUS = 8 // vh

function App() {
  const [foodItems, setFoodItems] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [ostrichState, setOstrichState] = useState('idle')
  const gameRef = useRef(null)
  const animationFrameRef = useRef(null)
  const lastSpawnRef = useRef(Date.now() - SPAWN_INTERVAL) // Start so first spawn happens immediately
  const foodIdRef = useRef(0)
  const { playSound, muted, toggleMute, unlockAudio } = useAudio()
  const reducedMotion = useReducedMotion()
  const mouthPositionRef = useRef({ x: 0, y: 0 })
  const ostrichStateRef = useRef('idle')
  const handleEatFoodRef = useRef(null)

  // Handle food eaten (called from game loop, food already removed from array)
  const handleEatFood = useCallback((foodId) => {
    // Don't remove food here - it's already removed in the game loop
    
    // Always play quack sound when ostrich eats
    playSound('quack')
    
    // Set to happy state to trigger bounce animation
    setOstrichState('happy')
    ostrichStateRef.current = 'happy'
    
    // After bounce animation completes (0.7s), return to idle
    setTimeout(() => {
      setOstrichState('idle')
      ostrichStateRef.current = 'idle'
    }, 700)
  }, [playSound])

  // Store ref to handleEatFood for game loop
  useEffect(() => {
    handleEatFoodRef.current = handleEatFood
  }, [handleEatFood])

  // Update ostrich state ref when state changes
  useEffect(() => {
    ostrichStateRef.current = ostrichState
  }, [ostrichState])

  // Update game loop
  const updateGame = useCallback(() => {
    const now = Date.now()

    setFoodItems(prev => {
      let hasNearbyFood = false
      const foodsToEat = []

      // Update existing food positions
      let updated = prev.map(food => {
        // Update falling food
        if (food.state === 'falling' && !food.dragging) {
          const newY = food.y + food.velocity
          const newRotation = food.rotation + food.rotationSpeed

          // Recycle if off screen
          if (newY > 110) {
            return {
              ...food,
              y: -10,
              x: Math.random() * 80 + 10,
              rotation: Math.random() * 360,
            }
          }

          return {
            ...food,
            y: newY,
            rotation: newRotation,
          }
        }

        // Check mouth proximity for dragging food - only for anticipation, not auto-eat
        // Food is only eaten when released near mouth (via handleDragEnd)
        if (food.state === 'dragging' && mouthPositionRef.current.x > 0) {
          const dx = food.x - mouthPositionRef.current.x
          const dy = food.y - mouthPositionRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < ANTICIPATION_RADIUS) {
            hasNearbyFood = true
            // Don't auto-eat - only eat on release via handleDragEnd
          }
        }

        return food
      })

      // Remove foods that are being eaten
      if (foodsToEat.length > 0) {
        updated = updated.filter(food => !foodsToEat.includes(food.id))
        // Reset spawn timer to allow immediate spawning of new food
        lastSpawnRef.current = now - SPAWN_INTERVAL
        foodsToEat.forEach(foodId => {
          if (handleEatFoodRef.current) {
            handleEatFoodRef.current(foodId)
          }
        })
      }

      // ALWAYS check for spawning - this is critical
      // Use the updated array length (after removals) to check if we can spawn
      const timeSinceLastSpawn = now - lastSpawnRef.current
      const canSpawn = updated.length < MAX_FOOD_ITEMS
      // If we're well below max, spawn more aggressively (reduce interval requirement)
      const spawnInterval = updated.length < MAX_FOOD_ITEMS / 2 ? SPAWN_INTERVAL * 0.5 : SPAWN_INTERVAL
      const shouldSpawn = timeSinceLastSpawn > spawnInterval && canSpawn

      if (shouldSpawn) {
        const type = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)]
        const newFood = {
          id: foodIdRef.current++,
          type,
          x: Math.random() * 80 + 10,
          y: -10,
          velocity: FALL_SPEED,
          state: 'falling',
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
        }
        lastSpawnRef.current = now
        updated = [...updated, newFood]
      }

      // Update ostrich state (but don't interfere with happy state)
      const currentState = ostrichStateRef.current
      if (hasNearbyFood && currentState !== 'anticipation' && currentState !== 'happy') {
        setOstrichState('anticipation')
        ostrichStateRef.current = 'anticipation'
      } else if (!hasNearbyFood && currentState === 'anticipation') {
        setOstrichState('idle')
        ostrichStateRef.current = 'idle'
      }
      // Don't change state if it's 'happy' - let the timeout in handleEatFood handle it

      return updated
    })
  }, [])

  // Start game loop - use ref to avoid restarting
  const updateGameRef = useRef(updateGame)
  useEffect(() => {
    updateGameRef.current = updateGame
  }, [updateGame])

  useEffect(() => {
    let isActive = true

    const loop = () => {
      if (!isActive) return

      try {
        updateGameRef.current()
      } catch (error) {
        console.error('Game loop error:', error)
      }

      animationFrameRef.current = requestAnimationFrame(loop)
    }

    animationFrameRef.current = requestAnimationFrame(loop)

    return () => {
      isActive = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, []) // Only run once on mount

  // Update mouth position when ostrich renders
  const handleMouthPosition = useCallback((x, y) => {
    mouthPositionRef.current = { x, y }
  }, [])

  // Handle food drag start
  const handleDragStart = useCallback((foodId) => {
    // Unlock audio on first interaction to ensure sounds can play
    unlockAudio()
    setFoodItems(prev => prev.map(f => 
      f.id === foodId ? { ...f, state: 'dragging', dragging: true } : f
    ))
  }, [unlockAudio])

  // Handle food drag
  const handleDrag = useCallback((foodId, x, y) => {
    setFoodItems(prev => prev.map(f => 
      f.id === foodId ? { ...f, x, y } : f
    ))
  }, [])

  // Handle food drag end - food disappears and mouth closes when released near ostrich
  const handleDragEnd = useCallback((foodId, x, y) => {
    const dx = x - mouthPositionRef.current.x
    const dy = y - mouthPositionRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < EAT_RADIUS * 1.5) {
      // Close enough to eat - remove food and close mouth when released
      setFoodItems(prev => {
        const food = prev.find(f => f.id === foodId)
        if (!food) return prev // Food already removed
        
        const updated = prev.filter(f => f.id !== foodId)
        
        // Reset spawn timer to allow immediate spawning of new food
        const now = Date.now()
        lastSpawnRef.current = now - SPAWN_INTERVAL
        
        // Immediately try to spawn new food if we're below max
        // This ensures spawning happens even if game loop has stale state
        if (updated.length < MAX_FOOD_ITEMS) {
          const type = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)]
          const newFood = {
            id: foodIdRef.current++,
            type,
            x: Math.random() * 80 + 10,
            y: -10,
            velocity: FALL_SPEED,
            state: 'falling',
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
          }
          lastSpawnRef.current = now
          return [...updated, newFood]
        }
        
        return updated
      })
      
      // Trigger effects (sound, happy bounce animation)
      // handleEatFood will set state to 'happy' and then 'idle' after animation
      handleEatFood(foodId)
    } else {
      // Not close enough - drop it gently
      setFoodItems(prev => {
        const food = prev.find(f => f.id === foodId)
        if (!food) return prev
        
        return prev.map(f =>
          f.id === foodId ? { ...f, state: 'falling', dragging: false, velocity: FALL_SPEED } : f
        )
      })
      
      // Update ostrich state outside of setFoodItems to avoid batching issues
      setOstrichState(prev => prev === 'anticipation' ? 'idle' : prev)
    }
  }, [handleEatFood])

  return (
    <div className="app" ref={gameRef}>
      <div className="background">
        <div className="sky" />
        <div className="ground" />
      </div>
      
      <Ostrich 
        state={ostrichState} 
        reducedMotion={reducedMotion}
        onMouthPosition={handleMouthPosition}
      />
      
      {foodItems.map(food => (
        <FoodItem
          key={food.id}
          food={food}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />
      ))}
      
      {sparkles.map(sparkle => (
        <Sparkles key={sparkle.id} x={sparkle.x} y={sparkle.y} />
      ))}
      
      <MuteToggle muted={muted} onToggle={toggleMute} />
    </div>
  )
}

export default App

