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
      // Step 1: Create/resume AudioContext IMMEDIATELY (critical for iOS)
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext()
        }

        // Resume immediately - don't await anything before this!
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }

        // Step 2: Play a tiny silent buffer to fully unlock iOS
        try {
          const silentBuffer = audioContextRef.current.createBuffer(1, 1, 22050)
          const source = audioContextRef.current.createBufferSource()
          source.buffer = silentBuffer
          source.connect(audioContextRef.current.destination)
          source.start(0)
        } catch (e) {
          // Silent buffer failed, but continue
        }

        // Generate munch sound buffer
        munchBufferRef.current = generateMunchSound(audioContextRef.current)
      }

      // Step 3: Also unlock HTML5 Audio as fallback
      if (quackAudioRef.current) {
        try {
          const audio = quackAudioRef.current
          audio.volume = 1.0
          audio.currentTime = 0
          // Play and immediately pause to unlock
          await audio.play()
          audio.pause()
          audio.currentTime = 0
        } catch (e) {
          // HTML5 unlock failed, but continue
        }
      }

      unlockedRef.current = true
      return true
    } catch (e) {
      unlockedRef.current = false
      return false
    }
  }, [])

  const playSound = useCallback(async (soundType) => {
    if (muted) return
    if (!unlockedRef.current) return // Don't play if not unlocked

    try {
      if (soundType === 'quack') {
        // Simple approach: just use the HTML5 Audio element
        if (quackAudioRef.current) {
          const audio = quackAudioRef.current

          // Stop current playback if any
          audio.pause()
          audio.currentTime = 0
          audio.volume = 1.0

          // Play the sound
          const playPromise = audio.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Silently handle play failures
            })
          }
        }
      } else if (soundType === 'munch') {
        if (!audioContextRef.current || !munchBufferRef.current) return

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
  }, [muted, unlockAudio])

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

