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
  const silenceAudioRef = useRef(null)

  // Load and loop silence audio to keep audio unlocked on mobile
  useEffect(() => {
    const silenceAudio = new Audio('/silence.mp3')
    silenceAudio.loop = true
    silenceAudio.volume = 0.01 // Very quiet
    silenceAudio.preload = 'auto'
    silenceAudioRef.current = silenceAudio

    // Start playing on first user interaction
    const startSilence = () => {
      if (silenceAudioRef.current) {
        silenceAudioRef.current.play().catch(() => {
          // Ignore errors
        })
      }
      // Remove listeners after first interaction
      document.removeEventListener('touchstart', startSilence)
      document.removeEventListener('click', startSilence)
    }

    document.addEventListener('touchstart', startSilence, { once: true })
    document.addEventListener('click', startSilence, { once: true })

    return () => {
      document.removeEventListener('touchstart', startSilence)
      document.removeEventListener('click', startSilence)
      if (silenceAudioRef.current) {
        silenceAudioRef.current.pause()
        silenceAudioRef.current = null
      }
    }
  }, [])

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
      // Unlock HTML5 Audio by playing it (required for iOS)
      if (quackAudioRef.current) {
        try {
          const audio = quackAudioRef.current
          audio.volume = 1.0 // Set to full volume
          audio.currentTime = 0
          const playPromise = audio.play()

          // Let it play briefly then pause
          if (playPromise !== undefined) {
            playPromise.then(() => {
              audio.pause()
              audio.currentTime = 0
            }).catch(() => {
              // Ignore unlock errors
            })
          }
        } catch (e) {
          // Unlock failed, but continue
        }
      }

      // Also set up Web Audio API for munch sounds
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext()
        }

        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }

        munchBufferRef.current = generateMunchSound(audioContextRef.current)
      }

      unlockedRef.current = true
    } catch (e) {
      unlockedRef.current = true // Mark as unlocked even if it failed
    }
  }, [])

  const playSound = useCallback(async (soundType) => {
    if (muted) return

    // Ensure audio is unlocked first
    if (!unlockedRef.current) {
      await unlockAudio()
    }

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

