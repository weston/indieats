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
  const audioLoadedRef = useRef(false)

  // Load the quack MP3 file
  useEffect(() => {
    const loadQuackSound = async () => {
      try {
        // Create HTML5 Audio element first (more reliable on mobile)
        const audio = new Audio('/quack.mp3')
        audio.preload = 'auto'
        audio.volume = 1.0
        audio.crossOrigin = 'anonymous'
        // iOS requires user interaction to load, so we'll load on first play
        quackAudioRef.current = audio
        audioLoadedRef.current = true
        
        // Handle errors gracefully
        audio.addEventListener('error', (e) => {
          console.warn('Audio element error:', e)
        })

        // Also try to load for Web Audio API
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (AudioContext) {
          if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext()
          }
          
          const response = await fetch('/quack.mp3')
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer()
            const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer)
            quackBufferRef.current = audioBuffer
          }
        }
      } catch (e) {
        console.warn('Failed to load quack sound:', e)
      }
    }

    loadQuackSound()
  }, [])

  const unlockAudio = useCallback(async () => {
    if (unlockedRef.current) return
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
      }

      // Resume audio context (required for iOS)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()
      }

      // Play a silent sound to unlock audio on iOS
      // This is required for iOS Safari to allow audio playback
      try {
        const buffer = audioContextRef.current.createBuffer(1, 1, 22050)
        const source = audioContextRef.current.createBufferSource()
        source.buffer = buffer
        source.connect(audioContextRef.current.destination)
        source.start(0)
      } catch (e) {
        // Silent unlock might fail, that's okay
      }

      munchBufferRef.current = generateMunchSound(audioContextRef.current)
      unlockedRef.current = true

      // Also ensure HTML5 audio is ready
      if (quackAudioRef.current) {
        try {
          // Load the audio on first user interaction
          await quackAudioRef.current.load()
        } catch (e) {
          // Ignore load errors
        }
      }
    } catch (e) {
      console.warn('Audio context creation failed:', e)
    }
  }, [])

  const playSound = useCallback(async (soundType) => {
    if (muted) return

    try {
      if (soundType === 'quack') {
        // For mobile, prioritize HTML5 Audio as it's more reliable
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        
        if (isMobile && quackAudioRef.current) {
          // Use HTML5 Audio on mobile (more reliable)
          try {
            const audio = quackAudioRef.current.cloneNode()
            audio.volume = 1.0
            audio.currentTime = 0
            await audio.play()
            return
          } catch (e) {
            console.warn('HTML5 Audio playback failed, trying Web Audio API:', e)
          }
        }

        // Try Web Audio API
        if (audioContextRef.current) {
          // Ensure audio context is resumed (required for iOS)
          if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume()
          }
          
          if (quackBufferRef.current) {
            const source = audioContextRef.current.createBufferSource()
            source.buffer = quackBufferRef.current
            source.connect(audioContextRef.current.destination)
            source.start(0)
            return
          }
        }

        // Final fallback: HTML5 Audio
        if (quackAudioRef.current) {
          const audio = quackAudioRef.current.cloneNode()
          audio.volume = 1.0
          audio.currentTime = 0
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

