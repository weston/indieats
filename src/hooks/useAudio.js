import { useState, useRef, useCallback } from 'react'

// Simple Web Audio API sound generator
function generateQuackSound(audioContext) {
  const duration = 0.2
  const sampleRate = audioContext.sampleRate
  const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate)
  const data = buffer.getChannelData(0)

  // Generate a quack-like sound (combination of frequencies)
  for (let i = 0; i < data.length; i++) {
    const t = i / sampleRate
    // Mix multiple frequencies for a quack sound
    const freq1 = 200 + Math.sin(t * 10) * 50 // Base quack
    const freq2 = 400 + Math.sin(t * 15) * 100 // Higher harmonic
    const wave1 = Math.sin(2 * Math.PI * freq1 * t)
    const wave2 = Math.sin(2 * Math.PI * freq2 * t)
    const envelope = Math.exp(-t * 8) // Quick decay
    data[i] = (wave1 * 0.6 + wave2 * 0.4) * envelope * 0.3
  }

  return buffer
}

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
  const quackBufferRef = useRef(null)
  const munchBufferRef = useRef(null)

  const unlockAudio = useCallback(() => {
    if (unlockedRef.current) return
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) return
      
      audioContextRef.current = new AudioContext()
      quackBufferRef.current = generateQuackSound(audioContextRef.current)
      munchBufferRef.current = generateMunchSound(audioContextRef.current)
      unlockedRef.current = true
    } catch (e) {
      console.warn('Audio context creation failed:', e)
    }
  }, [])

  const playSound = useCallback((soundType) => {
    if (muted || !unlockedRef.current || !audioContextRef.current) return

    try {
      const buffer = soundType === 'quack' 
        ? quackBufferRef.current 
        : munchBufferRef.current
      
      if (!buffer) return

      const source = audioContextRef.current.createBufferSource()
      source.buffer = buffer
      source.connect(audioContextRef.current.destination)
      source.start(0)
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

