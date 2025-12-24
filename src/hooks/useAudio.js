import { useState, useRef, useCallback, useEffect } from 'react'

function generateMunchSound(audioContext) {
  const duration = 0.15
  const sampleRate = audioContext.sampleRate
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate)
  const data = buffer.getChannelData(0)

  // Generate a soft munch sound
  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate
    const freq = 150 + Math.random() * 100 // Noise-like
    const wave = Math.sin(2 * Math.PI * freq * t) * (Math.random() - 0.5)
    const envelope = Math.exp(-t * 12)
    data[i] = wave * envelope * 0.2
  }

  return buffer
}

export function useAudio() {
  const [muted, setMuted] = useState(false)
  const audioContextRef = useRef(null)
  const unlockedRef = useRef(false)
  const quackAudioRef = useRef(null)
  const quackBufferRef = useRef(null)
  const munchBufferRef = useRef(null)

  // Load the quack MP3 file
  useEffect(() => {
    const loadQuackSound = async () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) return

        // Initialize audio context if not already created
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext()
        }
        
        // Load MP3 file
        const response = await fetch('/quack.mp3')
        if (!response.ok) {
          throw new Error(`Failed to fetch quack.mp3: ${response.status}`)
        }
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer)
        quackBufferRef.current = audioBuffer

        // Also create HTML5 Audio element as fallback
        const audio = new Audio('/quack.mp3')
        audio.preload = 'auto'
        quackAudioRef.current = audio
      } catch (e) {
        console.warn('Failed to load quack sound:', e)
      }
    }

    loadQuackSound()
  }, [])

  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) return
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
      }
      munchBufferRef.current = generateMunchSound(audioContextRef.current)
      unlockedRef.current = true
    } catch (e) {
      console.warn('Audio context creation failed:', e)
    }
  }, [])

  const playSound = useCallback(async (soundType) => {
    if (muted) return

    try {
      if (soundType === 'quack') {
        // Ensure audio context is resumed (required for iOS)
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        
        // Try Web Audio API first
        if (quackBufferRef.current && audioContextRef.current) {
          const source = audioContextRef.current.createBufferSource()
          source.buffer = quackBufferRef.current
          source.connect(audioContextRef.current.destination)
          source.start(0)
        } else if (quackAudioRef.current) {
          // Fallback to HTML5 Audio
          const audio = quackAudioRef.current.cloneNode()
          audio.volume = 1.0
          await audio.play()
        }
      } else if (soundType === 'munch') {
        if (!unlockedRef.current || !audioContextRef.current || !munchBufferRef.current) return
        
        // Ensure audio context is resumed
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        
        const source = audioContextRef.current.createBufferSource()
        source.buffer = munchBufferRef.current
        source.connect(audioContextRef.current.destination)
        source.start(0)
      }
    } catch (e) {
      console.warn('Sound playback failed:', e)
    }
  }, [muted])

  const toggleMute = useCallback(() => {
    setMuted(prev => !prev)
  }, [])

  return {
    playSound,
    muted,
    toggleMute,
    unlockAudio,
  }
}

