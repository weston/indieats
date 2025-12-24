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
        const mouthY = (rect.top + rect.height * 0.08) / window.innerHeight * 100
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
        viewBox="0 0 200 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cute cartoon baby ostrich gradients */}
          {/* Body - darker purplish-grey */}
          <radialGradient id="bodyGradient" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#6B5B7D" />
            <stop offset="30%" stopColor="#5A4A6A" />
            <stop offset="60%" stopColor="#4A3A5A" />
            <stop offset="100%" stopColor="#3A2A4A" />
          </radialGradient>
          {/* Light grey head/neck feathers */}
          <radialGradient id="headFeatherGradient" cx="50%" cy="45%">
            <stop offset="0%" stopColor="#E8E8E8" />
            <stop offset="50%" stopColor="#D0D0D0" />
            <stop offset="100%" stopColor="#B8B8B8" />
          </radialGradient>
          <radialGradient id="neckFeatherGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#E0E0E0" />
            <stop offset="50%" stopColor="#C8C8C8" />
            <stop offset="100%" stopColor="#B0B0B0" />
          </radialGradient>
          <radialGradient id="bodyTopLight" cx="45%" cy="30%">
            <stop offset="0%" stopColor="#5A5A5A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3A3A3A" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodyFluff" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A4A4A" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#3A3A3A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="bodyShadow" cx="50%" cy="60%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bodyHighlight" cx="45%" cy="35%">
            <stop offset="0%" stopColor="#5A5A5A" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#4A4A4A" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#3A3A3A" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2A2A2A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bodyRimLight" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#6A6A6A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6A6A6A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="neckSkinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="20%" stopColor="#FFE4E1" />
            <stop offset="40%" stopColor="#FFB6C1" />
            <stop offset="60%" stopColor="#FFA0B0" />
            <stop offset="80%" stopColor="#FF8FA0" />
            <stop offset="100%" stopColor="#FF7F90" />
          </linearGradient>
          <linearGradient id="neckBlueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F0F8FF" />
            <stop offset="30%" stopColor="#E0F0FF" />
            <stop offset="60%" stopColor="#B0D0FF" />
            <stop offset="100%" stopColor="#90B0FF" />
          </linearGradient>
          {/* Orange beak */}
          <linearGradient id="beakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="50%" stopColor="#FF7F32" />
            <stop offset="100%" stopColor="#FF6B1A" />
          </linearGradient>
          {/* Beak tip - dark grey/black */}
          <linearGradient id="beakTipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A4A4A" />
            <stop offset="100%" stopColor="#2A2A2A" />
          </linearGradient>
          <linearGradient id="beakShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          {/* Orange legs matching beak */}
          <linearGradient id="legGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="50%" stopColor="#FF7F32" />
            <stop offset="100%" stopColor="#FF6B1A" />
          </linearGradient>
          {/* Pink wing accents */}
          <radialGradient id="wingPinkGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFB6C1" />
            <stop offset="100%" stopColor="#FFA0B0" />
          </radialGradient>
          <radialGradient id="legShadow" cx="50%" cy="60%">
            <stop offset="0%" stopColor="#FF7F90" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FF7F90" stopOpacity="0" />
          </radialGradient>
          {/* Large expressive eyes - dark brown/black with lighter brown iris */}
          <radialGradient id="eyeGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#3D2817" />
            <stop offset="40%" stopColor="#2A1A0F" />
            <stop offset="70%" stopColor="#1A0F08" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          <radialGradient id="eyeIrisGradient" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#8B6F47" />
            <stop offset="50%" stopColor="#6B4F2F" />
            <stop offset="100%" stopColor="#4A2F17" />
          </radialGradient>
          <radialGradient id="eyeShine" cx="30%" cy="25%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wingWhiteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0E0E0" />
            <stop offset="50%" stopColor="#F0F0F0" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <radialGradient id="featherTexture" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#3A3A3A" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#2A2A2A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="featherDetail" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#2A2A2A" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#1A1A1A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="featherHighlight" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#5A5A5A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#5A5A5A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bodySideShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="neckHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="skinTexture" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFB6C1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFB6C1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Fluffy tail feathers - soft and rounded, cute cartoon style */}
        <ellipse cx="155" cy="140" rx="24" ry="48" fill="url(#bodyGradient)" className="tail-feather" opacity="0.9" />
        <ellipse cx="160" cy="130" rx="20" ry="42" fill="url(#bodyGradient)" className="tail-feather" opacity="0.85" />
        <ellipse cx="165" cy="120" rx="16" ry="36" fill="url(#bodyGradient)" className="tail-feather" opacity="0.8" />
        {/* Tail feather shadows */}
        <ellipse cx="152" cy="145" rx="20" ry="38" fill="#2A1A3A" opacity="0.2" />
        <ellipse cx="157" cy="135" rx="17" ry="32" fill="#2A1A3A" opacity="0.15" />

        {/* Wings with pink accents on underside/flanks - super cute and detailed */}
        {/* Right wing */}
        <ellipse cx="135" cy="160" rx="40" ry="30" fill="url(#bodyGradient)" className="wing" opacity="0.95" />
        {/* Wing shadow for depth */}
        <ellipse cx="133" cy="162" rx="38" ry="28" fill="#2A1A3A" opacity="0.25" />
        {/* Wing highlight */}
        <ellipse cx="137" cy="158" rx="35" ry="26" fill="#7A6B8D" opacity="0.2" />
        {/* Pink accent on wing underside/flank - layered for cuteness */}
        <ellipse cx="130" cy="168" rx="30" ry="24" fill="url(#wingPinkGradient)" opacity="0.85" />
        <ellipse cx="125" cy="172" rx="24" ry="20" fill="#FFB6C1" opacity="0.75" />
        <ellipse cx="120" cy="175" rx="20" ry="17" fill="#FFC0CB" opacity="0.65" />
        <ellipse cx="118" cy="177" rx="16" ry="14" fill="#FFD0DD" opacity="0.5" />
        {/* Wing feather detail */}
        <ellipse cx="140" cy="165" rx="12" ry="18" fill="#5A4A6A" opacity="0.2" />
        <ellipse cx="128" cy="162" rx="10" ry="15" fill="#5A4A6A" opacity="0.18" />
        <ellipse cx="132" cy="170" rx="8" ry="12" fill="#4A3A5A" opacity="0.15" />

        {/* Left wing */}
        <ellipse cx="65" cy="160" rx="40" ry="30" fill="url(#bodyGradient)" className="wing" opacity="0.95" />
        {/* Wing shadow for depth */}
        <ellipse cx="67" cy="162" rx="38" ry="28" fill="#2A1A3A" opacity="0.25" />
        {/* Wing highlight */}
        <ellipse cx="63" cy="158" rx="35" ry="26" fill="#7A6B8D" opacity="0.2" />
        {/* Pink accent on wing underside/flank - layered for cuteness */}
        <ellipse cx="70" cy="168" rx="30" ry="24" fill="url(#wingPinkGradient)" opacity="0.85" />
        <ellipse cx="75" cy="172" rx="24" ry="20" fill="#FFB6C1" opacity="0.75" />
        <ellipse cx="80" cy="175" rx="20" ry="17" fill="#FFC0CB" opacity="0.65" />
        <ellipse cx="82" cy="177" rx="16" ry="14" fill="#FFD0DD" opacity="0.5" />
        {/* Wing feather detail */}
        <ellipse cx="60" cy="165" rx="12" ry="18" fill="#5A4A6A" opacity="0.2" />
        <ellipse cx="72" cy="162" rx="10" ry="15" fill="#5A4A6A" opacity="0.18" />
        <ellipse cx="68" cy="170" rx="8" ry="12" fill="#4A3A5A" opacity="0.15" />

        {/* Round, plump body - transitions from light grey at top to darker purplish-grey - extra cute */}
        {/* Upper chest/neck area - light grey with more detail */}
        <ellipse cx="100" cy="140" rx="52" ry="38" fill="url(#headFeatherGradient)" />
        <ellipse cx="100" cy="135" rx="47" ry="32" fill="#E8E8E8" opacity="0.7" />
        <ellipse cx="100" cy="130" rx="42" ry="28" fill="#F0F0F0" opacity="0.5" />
        {/* Chest feather detail */}
        <ellipse cx="95" cy="138" rx="8" ry="12" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="105" cy="138" rx="8" ry="12" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="100" cy="142" rx="10" ry="14" fill="#D0D0D0" opacity="0.3" />

        {/* Main body - darker purplish-grey with lots of detail */}
        <ellipse cx="100" cy="170" rx="72" ry="82" fill="url(#bodyGradient)" className="body" />
        {/* Body shadow layers for depth */}
        <ellipse cx="95" cy="182" rx="67" ry="77" fill="#2A1A3A" opacity="0.35" />
        <ellipse cx="93" cy="185" rx="62" ry="72" fill="#1A0A2A" opacity="0.2" />
        {/* Body highlight layers */}
        <ellipse cx="98" cy="158" rx="62" ry="72" fill="#7A6B8D" opacity="0.3" />
        <ellipse cx="100" cy="155" rx="58" ry="68" fill="#8A7B9D" opacity="0.2" />
        {/* Detailed feather texture - many individual feathers */}
        <ellipse cx="115" cy="165" rx="16" ry="22" fill="#4A3A5A" opacity="0.25" />
        <ellipse cx="85" cy="165" rx="16" ry="22" fill="#4A3A5A" opacity="0.25" />
        <ellipse cx="100" cy="180" rx="20" ry="28" fill="#4A3A5A" opacity="0.2" />
        <ellipse cx="108" cy="172" rx="12" ry="18" fill="#5A4A6A" opacity="0.2" />
        <ellipse cx="92" cy="172" rx="12" ry="18" fill="#5A4A6A" opacity="0.2" />
        <ellipse cx="100" cy="190" rx="14" ry="20" fill="#4A3A5A" opacity="0.18" />
        <ellipse cx="120" cy="175" rx="10" ry="15" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="80" cy="175" rx="10" ry="15" fill="#4A3A5A" opacity="0.15" />
        {/* Additional soft feather highlights */}
        <ellipse cx="102" cy="168" rx="8" ry="12" fill="#6B5B7D" opacity="0.2" />
        <ellipse cx="98" cy="168" rx="8" ry="12" fill="#6B5B7D" opacity="0.2" />

        {/* VERY LONG, THIN S-CURVED NECK - OSTRICH CHARACTERISTIC */}
        <path
          d="M 100 15 Q 95 35, 100 55 Q 105 75, 100 95 Q 95 115, 100 135 Q 105 150, 100 160"
          stroke="url(#neckFeatherGradient)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          className="neck"
        />
        {/* Neck S-curve shadow */}
        <path
          d="M 100 15 Q 95 35, 100 55 Q 105 75, 100 95 Q 95 115, 100 135 Q 105 150, 100 160"
          stroke="#A0A0A0"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Neck highlight */}
        <path
          d="M 100 15 Q 95 35, 100 55 Q 105 75, 100 95 Q 95 115, 100 135 Q 105 150, 100 160"
          stroke="#F0F0F0"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.4"
        />
        {/* Neck shadow layers */}
        <path
          d="M 100 25 Q 98 45, 100 65 Q 102 85, 100 105 Q 98 125, 100 145"
          stroke="#A0A0A0"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          d="M 100 25 Q 98 45, 100 65 Q 102 85, 100 105 Q 98 125, 100 145"
          stroke="#808080"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          opacity="0.2"
        />
        {/* Neck highlight layers */}
        <path
          d="M 100 25 Q 98 45, 100 65 Q 102 85, 100 105 Q 98 125, 100 145"
          stroke="#F0F0F0"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M 100 25 Q 98 45, 100 65 Q 102 85, 100 105 Q 98 125, 100 145"
          stroke="#FFFFFF"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Neck feather texture - many soft light grey feathers for detail */}
        <ellipse cx="99" cy="50" rx="10" ry="14" fill="#D8D8D8" opacity="0.45" />
        <ellipse cx="101" cy="60" rx="9" ry="13" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="98" cy="70" rx="9" ry="13" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="100" cy="80" rx="9" ry="13" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="99" cy="90" rx="9" ry="13" fill="#D8D8D8" opacity="0.35" />
        <ellipse cx="101" cy="100" rx="9" ry="13" fill="#D8D8D8" opacity="0.35" />
        <ellipse cx="98" cy="110" rx="9" ry="13" fill="#D8D8D8" opacity="0.35" />
        <ellipse cx="100" cy="120" rx="9" ry="13" fill="#D8D8D8" opacity="0.35" />
        <ellipse cx="99" cy="130" rx="9" ry="13" fill="#D8D8D8" opacity="0.3" />
        {/* Secondary smaller feathers */}
        <ellipse cx="97" cy="55" rx="7" ry="11" fill="#E0E0E0" opacity="0.35" />
        <ellipse cx="103" cy="65" rx="7" ry="11" fill="#E0E0E0" opacity="0.35" />
        <ellipse cx="97" cy="75" rx="7" ry="11" fill="#E0E0E0" opacity="0.3" />
        <ellipse cx="103" cy="85" rx="7" ry="11" fill="#E0E0E0" opacity="0.3" />
        <ellipse cx="97" cy="95" rx="7" ry="11" fill="#E0E0E0" opacity="0.3" />
        <ellipse cx="103" cy="105" rx="7" ry="11" fill="#E0E0E0" opacity="0.25" />
        <ellipse cx="97" cy="115" rx="7" ry="11" fill="#E0E0E0" opacity="0.25" />
        <ellipse cx="103" cy="125" rx="7" ry="11" fill="#E0E0E0" opacity="0.25" />
        {/* Tiny accent feathers */}
        <ellipse cx="96" cy="60" rx="5" ry="8" fill="#E8E8E8" opacity="0.3" />
        <ellipse cx="104" cy="70" rx="5" ry="8" fill="#E8E8E8" opacity="0.3" />
        <ellipse cx="96" cy="80" rx="5" ry="8" fill="#E8E8E8" opacity="0.25" />
        <ellipse cx="104" cy="90" rx="5" ry="8" fill="#E8E8E8" opacity="0.25" />

        {/* SMALL, FLAT-TOP HEAD - OSTRICH CHARACTERISTIC (but still cute) */}
        {/* Base head shape - rounded but with flatter top */}
        {/* Deep shadow for 3D depth */}
        <ellipse cx="98" cy="17" rx="30" ry="24" fill="#A0A0A0" opacity="0.4" />
        <ellipse cx="97" cy="18" rx="28" ry="22" fill="#909090" opacity="0.3" />
        {/* Main head shape - wider ellipse, naturally rounded */}
        <ellipse
          cx="100"
          cy="15"
          rx="30"
          ry="24"
          fill="url(#headFeatherGradient)"
          className="head"
        />
        {/* Overlay to flatten the top slightly */}
        <path
          d="M 70 3 Q 70 3, 100 3 Q 130 3, 130 3 L 130 8 Q 130 10, 128 12 Q 100 14, 72 12 Q 70 10, 70 8 Z"
          fill="url(#headFeatherGradient)"
          opacity="0.95"
        />
        {/* Side shadow for 3D effect */}
        <ellipse cx="96" cy="16" rx="28" ry="20" fill="#B0B0B0" opacity="0.35" />
        <ellipse cx="94" cy="17" rx="26" ry="18" fill="#A0A0A0" opacity="0.25" />
        {/* Top highlight for flat top effect */}
        <path
          d="M 72 3 Q 100 3, 128 3 L 127 6 Q 127 8, 125 10 Q 100 11, 75 10 Q 73 8, 73 6 Z"
          fill="#F8F8F8"
          opacity="0.6"
        />
        <path
          d="M 75 4 Q 100 4, 125 4 L 124 6 Q 124 7, 123 8 Q 100 9, 77 8 Q 76 7, 76 6 Z"
          fill="#FFFFFF"
          opacity="0.4"
        />
        {/* Rim lighting for 3D depth */}
        <ellipse cx="100" cy="15" rx="29" ry="23" fill="none" stroke="#E8E8E8" strokeWidth="1.5" opacity="0.5" />
        <ellipse cx="100" cy="15" rx="27" ry="21" fill="none" stroke="#F0F0F0" strokeWidth="1" opacity="0.3" />
        {/* Additional depth layers */}
        <ellipse cx="103" cy="13" rx="26" ry="19" fill="#F5F5F5" opacity="0.4" />
        <ellipse cx="97" cy="16" rx="29" ry="21" fill="#D0D0D0" opacity="0.2" />

        {/* MAJOR FEATHER GROUPS - Top crown feathers (spiky) */}
        {/* Large primary crown feathers */}
        <path d="M 78 16 L 81 6 L 84 16" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 82 15 L 85 5 L 88 15" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 86 14 L 89 4 L 92 14" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 90 13 L 93 3 L 96 13" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 94 13 L 97 3 L 100 13" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 100 13 L 103 3 L 106 13" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 104 13 L 107 3 L 110 13" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 108 14 L 111 4 L 114 14" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 112 15 L 115 5 L 118 15" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />
        <path d="M 116 16 L 119 6 L 122 16" stroke="#C0C0C0" strokeWidth="3" fill="none" opacity="0.9" strokeLinecap="round" />

        {/* Secondary crown feathers - medium size */}
        <path d="M 80 18 L 82 12 L 84 18" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 84 17 L 86 11 L 88 17" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 88 16 L 90 10 L 92 16" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 92 16 L 94 10 L 96 16" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 96 16 L 98 10 L 100 16" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 100 16 L 102 10 L 104 16" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 104 16 L 106 10 L 108 16" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 108 17 L 110 11 L 112 17" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 112 18 L 114 12 L 116 18" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />
        <path d="M 116 19 L 118 13 L 120 19" stroke="#C8C8C8" strokeWidth="2.5" fill="none" opacity="0.85" strokeLinecap="round" />

        {/* Tertiary smaller feathers - creating depth */}
        <path d="M 81 20 L 83 16 L 85 20" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 85 19 L 87 15 L 89 19" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 89 19 L 91 15 L 93 19" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 93 19 L 95 15 L 97 19" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 97 19 L 99 15 L 101 19" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 101 19 L 103 15 L 105 19" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 105 19 L 107 15 L 109 19" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 109 20 L 111 16 L 113 20" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 113 21 L 115 17 L 117 21" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
        <path d="M 117 22 L 119 18 L 121 22" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />

        {/* Side feather groups - left side */}
        <path d="M 75 20 L 77 14 L 79 20" stroke="#C8C8C8" strokeWidth="2.2" fill="none" opacity="0.75" strokeLinecap="round" />
        <path d="M 77 22 L 78 18 L 80 22" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 79 24 L 80 20 L 82 24" stroke="#D0D0D0" strokeWidth="1.8" fill="none" opacity="0.65" strokeLinecap="round" />
        <path d="M 76 26 L 77 22 L 79 26" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />

        {/* Side feather groups - right side */}
        <path d="M 125 20 L 127 14 L 129 20" stroke="#C8C8C8" strokeWidth="2.2" fill="none" opacity="0.75" strokeLinecap="round" />
        <path d="M 123 22 L 124 18 L 126 22" stroke="#D0D0D0" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 121 24 L 122 20 L 124 24" stroke="#D0D0D0" strokeWidth="1.8" fill="none" opacity="0.65" strokeLinecap="round" />
        <path d="M 124 26 L 125 22 L 127 26" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />

        {/* Individual feather details - tiny accent feathers for texture */}
        <path d="M 82 22 L 83 20 L 84 22" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 86 21 L 87 19 L 88 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 90 21 L 91 19 L 92 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 94 21 L 95 19 L 96 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 98 21 L 99 19 L 100 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 102 21 L 103 19 L 104 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 106 21 L 107 19 L 108 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 110 22 L 111 20 L 112 22" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 114 23 L 115 21 L 116 23" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        <path d="M 118 24 L 119 22 L 120 24" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />

        {/* Micro feather details - ultra fine texture */}
        <path d="M 83 24 L 84 22 L 85 24" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 87 23 L 88 21 L 89 23" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 91 23 L 92 21 L 93 23" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 95 23 L 96 21 L 97 23" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 99 23 L 100 21 L 101 23" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 103 23 L 104 21 L 105 23" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 107 23 L 108 21 L 109 23" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 111 24 L 112 22 L 113 24" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 115 25 L 116 23 L 117 25" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.6" strokeLinecap="round" />

        {/* Feather shadow details for depth */}
        <ellipse cx="85" cy="19" rx="2" ry="3" fill="#B0B0B0" opacity="0.3" />
        <ellipse cx="95" cy="18" rx="2" ry="3" fill="#B0B0B0" opacity="0.3" />
        <ellipse cx="105" cy="18" rx="2" ry="3" fill="#B0B0B0" opacity="0.3" />
        <ellipse cx="115" cy="19" rx="2" ry="3" fill="#B0B0B0" opacity="0.3" />

        {/* Feather highlight details for shine */}
        <ellipse cx="87" cy="17" rx="1.5" ry="2" fill="#F0F0F0" opacity="0.5" />
        <ellipse cx="97" cy="16" rx="1.5" ry="2" fill="#F0F0F0" opacity="0.5" />
        <ellipse cx="103" cy="16" rx="1.5" ry="2" fill="#F0F0F0" opacity="0.5" />
        <ellipse cx="113" cy="17" rx="1.5" ry="2" fill="#F0F0F0" opacity="0.5" />

        {/* Additional texture - individual feather strands */}
        <path d="M 84 25 L 85 23" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 88 24 L 89 22" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 92 24 L 93 22" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 96 24 L 97 22" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 100 24 L 101 22" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 104 24 L 105 22" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 108 25 L 109 23" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 112 26 L 113 24" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 116 27 L 117 25" stroke="#D0D0D0" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />


        {/* LARGE OSTRICH EYES - POSITIONED HIGHER TO NOT OVERLAP BEAK */}
        {/* Left eye - large but proportional, moved higher */}
        <ellipse
          cx="88"
          cy="10"
          rx={state === 'anticipation' ? "14" : "13"}
          ry={state === 'anticipation' ? "15" : "14"}
          fill="#FFFFFF"
          className="eye"
        />
        {/* Left eye - dark pupil */}
        <ellipse
          cx="88"
          cy="10"
          rx={state === 'anticipation' ? "10" : "9"}
          ry={state === 'anticipation' ? "11" : "10"}
          fill="#333333"
        />
        {/* Left eye - brown iris */}
        <ellipse
          cx="88"
          cy="10"
          rx="8"
          ry="9"
          fill="url(#eyeIrisGradient)"
          opacity="0.6"
        />
        {/* Left eye - white highlight */}
        <ellipse
          cx="86"
          cy="7"
          rx="5"
          ry="6"
          fill="#FFFFFF"
          className="eye-highlight"
        />

        {/* Right eye - large but proportional, moved higher */}
        <ellipse
          cx="112"
          cy="10"
          rx={state === 'anticipation' ? "14" : "13"}
          ry={state === 'anticipation' ? "15" : "14"}
          fill="#FFFFFF"
          className="eye"
        />
        {/* Right eye - dark pupil */}
        <ellipse
          cx="112"
          cy="10"
          rx={state === 'anticipation' ? "10" : "9"}
          ry={state === 'anticipation' ? "11" : "10"}
          fill="#333333"
        />
        {/* Right eye - brown iris */}
        <ellipse
          cx="112"
          cy="10"
          rx="8"
          ry="9"
          fill="url(#eyeIrisGradient)"
          opacity="0.6"
        />
        {/* Right eye - white highlight */}
        <ellipse
          cx="110"
          cy="7"
          rx="5"
          ry="6"
          fill="#FFFFFF"
          className="eye-highlight"
        />

        {/* SHORT, FLAT BEAK - SINGLE UNIFIED BEAK THAT OPENS */}
        {/* Complete beak when closed - looks like one solid piece */}
        {(state !== 'anticipation' && state !== 'happy') && (
          <>
            <path
              d="M 100 20 Q 94 24, 88 23 Q 100 27, 112 23 Q 106 24, 100 20 Z"
              fill="url(#beakGradient)"
              className="beak-closed"
            />
            <path
              d="M 100 20 Q 94 24, 88 23 Q 100 27, 112 23 Q 106 24, 100 20 Z"
              fill="#FF6B1A"
              opacity="0.3"
            />
            <path
              d="M 100 20 Q 97 23, 92 23 Q 100 26, 108 23 Q 103 23, 100 20 Z"
              fill="#FFA366"
              opacity="0.5"
            />
            <ellipse cx="94" cy="23" rx="1.5" ry="1" fill="#1A1A1A" opacity="0.8" />
            <ellipse cx="106" cy="23" rx="1.5" ry="1" fill="#1A1A1A" opacity="0.8" />
          </>
        )}

        {/* Split beak when open - upper part */}
        {(state === 'anticipation' || state === 'happy') && (
          <>
            <g className="beak-upper-group">
              <path
                d="M 100 20 Q 94 24, 88 23 Q 100 25, 112 23 Q 106 24, 100 20 Z"
                fill="url(#beakGradient)"
                className="beak-upper"
              />
              <path
                d="M 100 20 Q 94 24, 88 23 Q 100 25, 112 23 Q 106 24, 100 20 Z"
                fill="#FF6B1A"
                opacity="0.3"
              />
              <path
                d="M 100 20 Q 97 23, 92 23 Q 100 24, 108 23 Q 103 23, 100 20 Z"
                fill="#FFA366"
                opacity="0.5"
              />
              <ellipse cx="94" cy="23" rx="1.5" ry="1" fill="#1A1A1A" opacity="0.8" />
              <ellipse cx="106" cy="23" rx="1.5" ry="1" fill="#1A1A1A" opacity="0.8" />
            </g>

            {/* Mouth interior - visible when open */}
            <ellipse
              cx="100"
              cy="32"
              rx="16"
              ry="10"
              fill="#FF4444"
              className="mouth-interior"
            />
            <ellipse
              cx="100"
              cy="32"
              rx="12"
              ry="7"
              fill="#FF6B6B"
              className="mouth-interior"
              opacity="0.9"
            />
            <ellipse
              cx="100"
              cy="30"
              rx="6"
              ry="4"
              fill="#FFFFFF"
              className="mouth-interior"
              opacity="0.6"
            />

            {/* Lower beak - drops down when open */}
            <g className="beak-lower-group">
              <path
                d="M 100 24 Q 94 28, 88 27 Q 100 29, 112 27 Q 106 28, 100 24 Z"
                fill="url(#beakGradient)"
                className="beak-lower"
              />
              <path
                d="M 100 24 Q 94 28, 88 27 Q 100 29, 112 27 Q 106 28, 100 24 Z"
                fill="#FF6B1A"
                opacity="0.3"
              />
              <path
                d="M 100 24 Q 97 27, 92 27 Q 100 28, 108 27 Q 103 27, 100 24 Z"
                fill="#FFA366"
                opacity="0.5"
              />
            </g>
          </>
        )}

        {/* VERY LONG, POWERFUL LEGS - OSTRICH CHARACTERISTIC */}
        {/* Left leg - upper thigh */}
        <ellipse cx="88" cy="210" rx="12" ry="8" fill="url(#legGradient)" className="leg" />
        {/* Left leg - main shaft (very long) */}
        <rect x="82" y="210" width="12" height="70" fill="url(#legGradient)" rx="6" className="leg" />
        {/* Left leg shadow */}
        <rect x="83" y="215" width="10" height="65" fill="#FF6B1A" opacity="0.2" rx="5" />
        {/* Left knee joint */}
        <circle cx="88" cy="245" r="6" fill="#FF7F32" />

        {/* Right leg - upper thigh */}
        <ellipse cx="112" cy="210" rx="12" ry="8" fill="url(#legGradient)" className="leg" />
        {/* Right leg - main shaft (very long) */}
        <rect x="106" y="210" width="12" height="70" fill="url(#legGradient)" rx="6" className="leg" />
        {/* Right leg shadow */}
        <rect x="107" y="215" width="10" height="65" fill="#FF6B1A" opacity="0.2" rx="5" />
        {/* Right knee joint */}
        <circle cx="112" cy="245" r="6" fill="#FF7F32" />

        {/* TWO-TOED FEET - OSTRICH CHARACTERISTIC (large inner toe, smaller outer toe) */}
        {/* Left foot - main pad */}
        <ellipse cx="88" cy="270" rx="20" ry="14" fill="url(#legGradient)" className="foot" />
        <ellipse cx="88" cy="270" rx="18" ry="12" fill="#FF8C42" />
        {/* Left foot shadow */}
        <ellipse cx="87" cy="272" rx="19" ry="13" fill="#FF6B1A" opacity="0.3" />
        {/* Left foot - inner toe (larger) */}
        <ellipse cx="88" cy="276" rx="12" ry="8" fill="url(#legGradient)" className="toe" />
        <ellipse cx="88" cy="276" rx="10" ry="7" fill="#FF8C42" />
        <path d="M 76 276 L 78 272 L 77 280 Z" fill="#2A2A2A" />
        {/* Left foot - outer toe (smaller) */}
        <ellipse cx="98" cy="274" rx="8" ry="6" fill="url(#legGradient)" className="toe" />
        <ellipse cx="98" cy="274" rx="7" ry="5" fill="#FF8C42" />
        <path d="M 90 274 L 92 271 L 91 277 Z" fill="#2A2A2A" />

        {/* Right foot - main pad */}
        <ellipse cx="112" cy="270" rx="20" ry="14" fill="url(#legGradient)" className="foot" />
        <ellipse cx="112" cy="270" rx="18" ry="12" fill="#FF8C42" />
        {/* Right foot shadow */}
        <ellipse cx="113" cy="272" rx="19" ry="13" fill="#FF6B1A" opacity="0.3" />
        {/* Right foot - inner toe (larger) */}
        <ellipse cx="112" cy="276" rx="12" ry="8" fill="url(#legGradient)" className="toe" />
        <ellipse cx="112" cy="276" rx="10" ry="7" fill="#FF8C42" />
        <path d="M 100 276 L 102 272 L 101 280 Z" fill="#2A2A2A" />
        {/* Right foot - outer toe (smaller) */}
        <ellipse cx="102" cy="274" rx="8" ry="6" fill="url(#legGradient)" className="toe" />
        <ellipse cx="102" cy="274" rx="7" ry="5" fill="#FF8C42" />
        <path d="M 94 274 L 96 271 L 95 277 Z" fill="#2A2A2A" />
      </svg>
    </div>
  )
}

export default Ostrich
