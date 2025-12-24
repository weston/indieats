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
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Head - Perfect sphere gradient */}
          <radialGradient id="headGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#F8F8F8" />
            <stop offset="50%" stopColor="#ECECEC" />
            <stop offset="75%" stopColor="#E0E0E0" />
            <stop offset="100%" stopColor="#D0D0D0" />
          </radialGradient>

          {/* Neck gradient with more detail */}
          <linearGradient id="neckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ECECEC" />
            <stop offset="30%" stopColor="#E0E0E0" />
            <stop offset="70%" stopColor="#D0D0D0" />
            <stop offset="100%" stopColor="#C0C0C0" />
          </linearGradient>

          {/* Body gradient - dark fluffy */}
          <radialGradient id="bodyGradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#7B6B8D" />
            <stop offset="40%" stopColor="#6B5B7D" />
            <stop offset="70%" stopColor="#5A4A6A" />
            <stop offset="100%" stopColor="#4A3A5A" />
          </radialGradient>

          {/* Wing pink gradient */}
          <radialGradient id="wingPinkGradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FFE0E9" />
            <stop offset="50%" stopColor="#FFD0DD" />
            <stop offset="100%" stopColor="#FFC0CB" />
          </radialGradient>

          {/* Beak gradient */}
          <linearGradient id="beakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA366" />
            <stop offset="50%" stopColor="#FF9955" />
            <stop offset="100%" stopColor="#FF8842" />
          </linearGradient>

          {/* Leg gradient */}
          <linearGradient id="legGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA366" />
            <stop offset="50%" stopColor="#FF9955" />
            <stop offset="100%" stopColor="#FF8842" />
          </linearGradient>

          {/* Eye gradient */}
          <radialGradient id="eyeIrisGradient" cx="45%" cy="45%">
            <stop offset="0%" stopColor="#8B6F47" />
            <stop offset="50%" stopColor="#6B4F2F" />
            <stop offset="100%" stopColor="#4A2F17" />
          </radialGradient>

          {/* Feather texture pattern */}
          <pattern id="featherTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <ellipse cx="5" cy="5" rx="2" ry="4" fill="#000000" opacity="0.1" />
            <ellipse cx="15" cy="10" rx="2" ry="4" fill="#000000" opacity="0.08" />
            <ellipse cx="10" cy="15" rx="2" ry="4" fill="#000000" opacity="0.09" />
          </pattern>
        </defs>

        {/* Body - fluffy and round */}
        <ellipse
          cx="100"
          cy="180"
          rx="65"
          ry="75"
          fill="url(#bodyGradient)"
          className="body"
        />

        {/* Body texture overlay */}
        <ellipse
          cx="100"
          cy="180"
          rx="65"
          ry="75"
          fill="url(#featherTexture)"
          opacity="0.3"
        />

        {/* Deep body shadows for depth - multiple layers */}
        <ellipse
          cx="95"
          cy="195"
          rx="58"
          ry="68"
          fill="#1A0A2A"
          opacity="0.35"
        />
        <ellipse
          cx="92"
          cy="200"
          rx="54"
          ry="64"
          fill="#0A0A1A"
          opacity="0.25"
        />
        <ellipse
          cx="105"
          cy="190"
          rx="50"
          ry="60"
          fill="#2A1A3A"
          opacity="0.2"
        />

        {/* Body highlights - multiple layers for dimension */}
        <ellipse
          cx="85"
          cy="165"
          rx="35"
          ry="40"
          fill="#8B7B9D"
          opacity="0.25"
        />
        <ellipse
          cx="80"
          cy="160"
          rx="25"
          ry="30"
          fill="#9B8BAD"
          opacity="0.15"
        />
        <ellipse
          cx="75"
          cy="155"
          rx="18"
          ry="22"
          fill="#AB9BBD"
          opacity="0.1"
        />
        <ellipse
          cx="90"
          cy="170"
          rx="28"
          ry="32"
          fill="#8B7B9D"
          opacity="0.18"
        />

        {/* Central body feather clusters - major details */}
        <ellipse cx="100" cy="175" rx="18" ry="25" fill="#3A2A4A" opacity="0.3" />
        <ellipse cx="100" cy="185" rx="20" ry="28" fill="#3A2A4A" opacity="0.25" />
        <ellipse cx="100" cy="195" rx="18" ry="24" fill="#2A1A3A" opacity="0.28" />
        <ellipse cx="100" cy="205" rx="16" ry="22" fill="#3A2A4A" opacity="0.26" />
        <ellipse cx="100" cy="215" rx="14" ry="20" fill="#4A3A5A" opacity="0.24" />

        {/* Left side feather clusters */}
        <ellipse cx="85" cy="170" rx="14" ry="20" fill="#4A3A5A" opacity="0.28" />
        <ellipse cx="80" cy="180" rx="15" ry="22" fill="#3A2A4A" opacity="0.26" />
        <ellipse cx="75" cy="190" rx="13" ry="19" fill="#4A3A5A" opacity="0.25" />
        <ellipse cx="78" cy="200" rx="12" ry="18" fill="#5A4A6A" opacity="0.23" />
        <ellipse cx="82" cy="210" rx="11" ry="16" fill="#4A3A5A" opacity="0.22" />

        {/* Right side feather clusters */}
        <ellipse cx="115" cy="170" rx="14" ry="20" fill="#4A3A5A" opacity="0.28" />
        <ellipse cx="120" cy="180" rx="15" ry="22" fill="#3A2A4A" opacity="0.26" />
        <ellipse cx="125" cy="190" rx="13" ry="19" fill="#4A3A5A" opacity="0.25" />
        <ellipse cx="122" cy="200" rx="12" ry="18" fill="#5A4A6A" opacity="0.23" />
        <ellipse cx="118" cy="210" rx="11" ry="16" fill="#4A3A5A" opacity="0.22" />

        {/* Additional mid-body feather details */}
        <ellipse cx="95" cy="178" rx="10" ry="15" fill="#5A4A6A" opacity="0.22" />
        <ellipse cx="105" cy="178" rx="10" ry="15" fill="#5A4A6A" opacity="0.22" />
        <ellipse cx="92" cy="188" rx="11" ry="16" fill="#4A3A5A" opacity="0.24" />
        <ellipse cx="108" cy="188" rx="11" ry="16" fill="#4A3A5A" opacity="0.24" />
        <ellipse cx="90" cy="198" rx="9" ry="14" fill="#5A4A6A" opacity="0.21" />
        <ellipse cx="110" cy="198" rx="9" ry="14" fill="#5A4A6A" opacity="0.21" />
        <ellipse cx="94" cy="208" rx="8" ry="12" fill="#6B5B7D" opacity="0.2" />
        <ellipse cx="106" cy="208" rx="8" ry="12" fill="#6B5B7D" opacity="0.2" />

        {/* Outer edge fluffy feather accents - left side */}
        <ellipse cx="68" cy="175" rx="9" ry="13" fill="#5A4A6A" opacity="0.25" />
        <ellipse cx="65" cy="185" rx="10" ry="14" fill="#6B5B7D" opacity="0.22" />
        <ellipse cx="63" cy="195" rx="8" ry="12" fill="#5A4A6A" opacity="0.24" />
        <ellipse cx="66" cy="205" rx="7" ry="11" fill="#6B5B7D" opacity="0.2" />
        <ellipse cx="70" cy="215" rx="6" ry="10" fill="#7B6B8D" opacity="0.18" />

        {/* Outer edge fluffy feather accents - right side */}
        <ellipse cx="132" cy="175" rx="9" ry="13" fill="#5A4A6A" opacity="0.25" />
        <ellipse cx="135" cy="185" rx="10" ry="14" fill="#6B5B7D" opacity="0.22" />
        <ellipse cx="137" cy="195" rx="8" ry="12" fill="#5A4A6A" opacity="0.24" />
        <ellipse cx="134" cy="205" rx="7" ry="11" fill="#6B5B7D" opacity="0.2" />
        <ellipse cx="130" cy="215" rx="6" ry="10" fill="#7B6B8D" opacity="0.18" />

        {/* Lower body feather details */}
        <ellipse cx="100" cy="225" rx="15" ry="18" fill="#4A3A5A" opacity="0.22" />
        <ellipse cx="90" cy="220" rx="10" ry="13" fill="#5A4A6A" opacity="0.2" />
        <ellipse cx="110" cy="220" rx="10" ry="13" fill="#5A4A6A" opacity="0.2" />
        <ellipse cx="85" cy="228" rx="8" ry="11" fill="#6B5B7D" opacity="0.18" />
        <ellipse cx="115" cy="228" rx="8" ry="11" fill="#6B5B7D" opacity="0.18" />

        {/* Very fine feather texture details - scattered throughout */}
        <ellipse cx="97" cy="172" rx="5" ry="8" fill="#4A3A5A" opacity="0.18" />
        <ellipse cx="103" cy="172" rx="5" ry="8" fill="#4A3A5A" opacity="0.18" />
        <ellipse cx="88" cy="183" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="112" cy="183" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="95" cy="193" rx="5" ry="7" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="105" cy="193" rx="5" ry="7" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="100" cy="203" rx="6" ry="8" fill="#4A3A5A" opacity="0.18" />
        <ellipse cx="92" cy="213" rx="5" ry="7" fill="#6B5B7D" opacity="0.16" />
        <ellipse cx="108" cy="213" rx="5" ry="7" fill="#6B5B7D" opacity="0.16" />

        {/* MASSIVE FEATHER DETAIL LAYER - 10x enhancement */}

        {/* Ultra-dense micro feather details - Layer 1 (top section) */}
        <ellipse cx="70" cy="150" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="75" cy="152" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="80" cy="151" rx="4" ry="6" fill="#5A4A6A" opacity="0.14" />
        <ellipse cx="85" cy="153" rx="3" ry="5" fill="#6B5B7D" opacity="0.15" />
        <ellipse cx="90" cy="152" rx="4" ry="6" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="95" cy="154" rx="3" ry="5" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="100" cy="153" rx="4" ry="6" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="105" cy="154" rx="3" ry="5" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="110" cy="152" rx="4" ry="6" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="115" cy="153" rx="3" ry="5" fill="#6B5B7D" opacity="0.15" />
        <ellipse cx="120" cy="151" rx="4" ry="6" fill="#5A4A6A" opacity="0.14" />
        <ellipse cx="125" cy="152" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="130" cy="150" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />

        {/* Ultra-dense micro feather details - Layer 2 */}
        <ellipse cx="72" cy="158" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="77" cy="160" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="82" cy="159" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="87" cy="161" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="92" cy="160" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="97" cy="162" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="102" cy="161" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="107" cy="162" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="112" cy="160" rx="3" ry="5" fill="#6B5B7D" opacity="0.16" />
        <ellipse cx="117" cy="161" rx="4" ry="6" fill="#5A4A6A" opacity="0.14" />
        <ellipse cx="122" cy="159" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="127" cy="160" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />

        {/* Ultra-dense micro feather details - Layer 3 */}
        <ellipse cx="68" cy="166" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="73" cy="168" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="78" cy="167" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="83" cy="169" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="88" cy="168" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="93" cy="170" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="98" cy="169" rx="4" ry="6" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="103" cy="170" rx="3" ry="5" fill="#6B5B7D" opacity="0.15" />
        <ellipse cx="108" cy="168" rx="4" ry="6" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="113" cy="169" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="118" cy="167" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="123" cy="168" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="128" cy="166" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />

        {/* Ultra-dense micro feather details - Layer 4 */}
        <ellipse cx="70" cy="174" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="75" cy="176" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="80" cy="175" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="85" cy="177" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="90" cy="176" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="95" cy="178" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="100" cy="177" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="105" cy="178" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="110" cy="176" rx="3" ry="5" fill="#6B5B7D" opacity="0.16" />
        <ellipse cx="115" cy="177" rx="4" ry="6" fill="#5A4A6A" opacity="0.14" />
        <ellipse cx="120" cy="175" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="125" cy="176" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="130" cy="174" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />

        {/* Ultra-dense micro feather details - Layer 5 (mid section) */}
        <ellipse cx="66" cy="182" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="71" cy="184" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="76" cy="183" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="81" cy="185" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="86" cy="184" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="91" cy="186" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="96" cy="185" rx="4" ry="6" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="101" cy="186" rx="3" ry="5" fill="#6B5B7D" opacity="0.15" />
        <ellipse cx="106" cy="184" rx="4" ry="6" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="111" cy="185" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="116" cy="183" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="121" cy="184" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="126" cy="182" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="131" cy="183" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />

        {/* Ultra-dense micro feather details - Layer 6 */}
        <ellipse cx="68" cy="190" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="73" cy="192" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="78" cy="191" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="83" cy="193" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="88" cy="192" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="93" cy="194" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="98" cy="193" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="103" cy="194" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="108" cy="192" rx="3" ry="5" fill="#6B5B7D" opacity="0.16" />
        <ellipse cx="113" cy="193" rx="4" ry="6" fill="#5A4A6A" opacity="0.14" />
        <ellipse cx="118" cy="191" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="123" cy="192" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="128" cy="190" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="133" cy="191" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />

        {/* Ultra-dense micro feather details - Layer 7 */}
        <ellipse cx="70" cy="198" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="75" cy="200" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="80" cy="199" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="85" cy="201" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="90" cy="200" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="95" cy="202" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="100" cy="201" rx="4" ry="6" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="105" cy="202" rx="3" ry="5" fill="#6B5B7D" opacity="0.15" />
        <ellipse cx="110" cy="200" rx="4" ry="6" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="115" cy="201" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="120" cy="199" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="125" cy="200" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="130" cy="198" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />

        {/* Ultra-dense micro feather details - Layer 8 */}
        <ellipse cx="72" cy="206" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="77" cy="208" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="82" cy="207" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="87" cy="209" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="92" cy="208" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="97" cy="210" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="102" cy="209" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="107" cy="210" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="112" cy="208" rx="3" ry="5" fill="#6B5B7D" opacity="0.16" />
        <ellipse cx="117" cy="209" rx="4" ry="6" fill="#5A4A6A" opacity="0.14" />
        <ellipse cx="122" cy="207" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="127" cy="208" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />

        {/* Ultra-dense micro feather details - Layer 9 (lower section) */}
        <ellipse cx="74" cy="214" rx="4" ry="6" fill="#5A4A6A" opacity="0.15" />
        <ellipse cx="79" cy="216" rx="3" ry="5" fill="#4A3A5A" opacity="0.16" />
        <ellipse cx="84" cy="215" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />
        <ellipse cx="89" cy="217" rx="3" ry="5" fill="#5A4A6A" opacity="0.17" />
        <ellipse cx="94" cy="216" rx="4" ry="6" fill="#4A3A5A" opacity="0.15" />
        <ellipse cx="99" cy="218" rx="3" ry="5" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="104" cy="217" rx="4" ry="6" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="109" cy="218" rx="3" ry="5" fill="#6B5B7D" opacity="0.15" />
        <ellipse cx="114" cy="216" rx="4" ry="6" fill="#5A4A6A" opacity="0.16" />
        <ellipse cx="119" cy="217" rx="3" ry="5" fill="#4A3A5A" opacity="0.17" />
        <ellipse cx="124" cy="215" rx="4" ry="6" fill="#6B5B7D" opacity="0.14" />

        {/* Medium-sized feather clusters - scattered throughout */}
        <ellipse cx="72" cy="155" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="84" cy="157" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="96" cy="156" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="108" cy="158" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="120" cy="157" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="128" cy="155" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />

        <ellipse cx="69" cy="163" rx="7" ry="10" fill="#4A3A5A" opacity="0.2" />
        <ellipse cx="81" cy="165" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="93" cy="164" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="105" cy="166" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="117" cy="165" rx="7" ry="10" fill="#4A3A5A" opacity="0.21" />
        <ellipse cx="129" cy="163" rx="6" ry="9" fill="#3A2A4A" opacity="0.19" />

        <ellipse cx="67" cy="171" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="79" cy="173" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="91" cy="172" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="103" cy="174" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="115" cy="173" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="127" cy="171" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="133" cy="172" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />

        <ellipse cx="71" cy="179" rx="7" ry="10" fill="#4A3A5A" opacity="0.2" />
        <ellipse cx="83" cy="181" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="95" cy="180" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="107" cy="182" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="119" cy="181" rx="7" ry="10" fill="#4A3A5A" opacity="0.21" />
        <ellipse cx="131" cy="179" rx="6" ry="9" fill="#3A2A4A" opacity="0.19" />

        <ellipse cx="69" cy="187" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="81" cy="189" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="93" cy="188" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="105" cy="190" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="117" cy="189" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="129" cy="187" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />

        <ellipse cx="67" cy="195" rx="7" ry="10" fill="#4A3A5A" opacity="0.2" />
        <ellipse cx="79" cy="197" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="91" cy="196" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="103" cy="198" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="115" cy="197" rx="7" ry="10" fill="#4A3A5A" opacity="0.21" />
        <ellipse cx="127" cy="195" rx="6" ry="9" fill="#3A2A4A" opacity="0.19" />
        <ellipse cx="133" cy="196" rx="7" ry="10" fill="#4A3A5A" opacity="0.2" />

        <ellipse cx="73" cy="203" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="85" cy="205" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="97" cy="204" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="109" cy="206" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="121" cy="205" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />

        <ellipse cx="75" cy="211" rx="7" ry="10" fill="#4A3A5A" opacity="0.2" />
        <ellipse cx="87" cy="213" rx="6" ry="9" fill="#3A2A4A" opacity="0.21" />
        <ellipse cx="99" cy="212" rx="7" ry="10" fill="#4A3A5A" opacity="0.19" />
        <ellipse cx="111" cy="214" rx="6" ry="9" fill="#3A2A4A" opacity="0.2" />
        <ellipse cx="123" cy="213" rx="7" ry="10" fill="#4A3A5A" opacity="0.21" />

        {/* Larger feather shapes for major depth */}
        <ellipse cx="76" cy="160" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="92" cy="162" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="108" cy="161" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="124" cy="160" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />

        <ellipse cx="70" cy="170" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="86" cy="172" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="102" cy="171" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="118" cy="172" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="130" cy="170" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />

        <ellipse cx="74" cy="181" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="90" cy="183" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="106" cy="182" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="122" cy="181" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />

        <ellipse cx="68" cy="191" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="84" cy="193" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="100" cy="192" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="116" cy="193" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="132" cy="191" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />

        <ellipse cx="72" cy="202" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="88" cy="204" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="104" cy="203" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="120" cy="202" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />

        <ellipse cx="80" cy="212" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />
        <ellipse cx="96" cy="214" rx="9" ry="13" fill="#2A1A3A" opacity="0.22" />
        <ellipse cx="112" cy="213" rx="10" ry="14" fill="#2A1A3A" opacity="0.23" />

        {/* Dense feather direction lines for flow - many more */}
        <path d="M 70 152 Q 72 162, 71 172" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 75 154 Q 77 164, 76 174" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 80 153 Q 82 163, 81 173" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 85 155 Q 87 165, 86 175" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 90 154 Q 92 164, 91 174" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 95 156 Q 97 166, 96 176" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 100 155 Q 100 165, 100 175" stroke="#3A2A4A" strokeWidth="0.8" opacity="0.14" fill="none" />
        <path d="M 105 156 Q 103 166, 104 176" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 110 154 Q 108 164, 109 174" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 115 155 Q 113 165, 114 175" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 120 153 Q 118 163, 119 173" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 125 154 Q 123 164, 124 174" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 130 152 Q 128 162, 129 172" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />

        <path d="M 68 162 Q 70 172, 69 182" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 73 164 Q 75 174, 74 184" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 78 163 Q 80 173, 79 183" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 83 165 Q 85 175, 84 185" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 88 164 Q 90 174, 89 184" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 93 166 Q 95 176, 94 186" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 98 165 Q 100 175, 99 185" stroke="#3A2A4A" strokeWidth="0.8" opacity="0.14" fill="none" />
        <path d="M 103 166 Q 101 176, 102 186" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 108 164 Q 106 174, 107 184" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 113 165 Q 111 175, 112 185" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 118 163 Q 116 173, 117 183" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 123 164 Q 121 174, 122 184" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 128 162 Q 126 172, 127 182" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 133 163 Q 131 173, 132 183" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />

        <path d="M 66 172 Q 68 182, 67 192" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 71 174 Q 73 184, 72 194" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 76 173 Q 78 183, 77 193" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 81 175 Q 83 185, 82 195" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 86 174 Q 88 184, 87 194" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 91 176 Q 93 186, 92 196" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 96 175 Q 98 185, 97 195" stroke="#3A2A4A" strokeWidth="0.8" opacity="0.14" fill="none" />
        <path d="M 101 176 Q 99 186, 100 196" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 106 174 Q 104 184, 105 194" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 111 175 Q 109 185, 110 195" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 116 173 Q 114 183, 115 193" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 121 174 Q 119 184, 120 194" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 126 172 Q 124 182, 125 192" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 131 173 Q 129 183, 130 193" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />

        <path d="M 68 182 Q 70 192, 69 202" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 73 184 Q 75 194, 74 204" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 78 183 Q 80 193, 79 203" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 83 185 Q 85 195, 84 205" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 88 184 Q 90 194, 89 204" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 93 186 Q 95 196, 94 206" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 98 185 Q 100 195, 99 205" stroke="#3A2A4A" strokeWidth="0.8" opacity="0.14" fill="none" />
        <path d="M 103 186 Q 101 196, 102 206" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 108 184 Q 106 194, 107 204" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 113 185 Q 111 195, 112 205" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 118 183 Q 116 193, 117 203" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 123 184 Q 121 194, 122 204" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 128 182 Q 126 192, 127 202" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />

        <path d="M 70 192 Q 72 202, 71 212" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 75 194 Q 77 204, 76 214" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 80 193 Q 82 203, 81 213" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 85 195 Q 87 205, 86 215" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 90 194 Q 92 204, 91 214" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 95 196 Q 97 206, 96 216" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 100 195 Q 100 205, 100 215" stroke="#3A2A4A" strokeWidth="0.8" opacity="0.14" fill="none" />
        <path d="M 105 196 Q 103 206, 104 216" stroke="#4A3A5A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 110 194 Q 108 204, 109 214" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 115 195 Q 113 205, 114 215" stroke="#3A2A4A" strokeWidth="0.7" opacity="0.13" fill="none" />
        <path d="M 120 193 Q 118 203, 119 213" stroke="#4A3A5A" strokeWidth="0.6" opacity="0.12" fill="none" />
        <path d="M 125 194 Q 123 204, 124 214" stroke="#3A2A4A" strokeWidth="0.6" opacity="0.12" fill="none" />

        {/* Additional shadow layers for ultra depth */}
        <ellipse cx="88" cy="197" rx="12" ry="16" fill="#1A0A2A" opacity="0.18" />
        <ellipse cx="100" cy="199" rx="14" ry="18" fill="#0A0A1A" opacity="0.16" />
        <ellipse cx="112" cy="197" rx="12" ry="16" fill="#1A0A2A" opacity="0.18" />
        <ellipse cx="94" cy="207" rx="10" ry="14" fill="#2A1A3A" opacity="0.15" />
        <ellipse cx="106" cy="207" rx="10" ry="14" fill="#2A1A3A" opacity="0.15" />

        {/* Additional highlight accents */}
        <ellipse cx="78" cy="158" rx="8" ry="11" fill="#9B8BAD" opacity="0.12" />
        <ellipse cx="90" cy="160" rx="9" ry="12" fill="#AB9BBD" opacity="0.11" />
        <ellipse cx="102" cy="159" rx="8" ry="11" fill="#9B8BAD" opacity="0.12" />
        <ellipse cx="114" cy="160" rx="9" ry="12" fill="#AB9BBD" opacity="0.11" />
        <ellipse cx="126" cy="158" rx="8" ry="11" fill="#9B8BAD" opacity="0.12" />

        {/* Wings with pink accents */}
        {/* Left wing */}
        <ellipse
          cx="65"
          cy="175"
          rx="35"
          ry="45"
          fill="url(#bodyGradient)"
          className="wing"
        />
        {/* Wing shadow */}
        <ellipse cx="67" cy="178" rx="33" ry="43" fill="#2A1A3A" opacity="0.25" />

        {/* Wing feather details - multiple layers */}
        <ellipse cx="60" cy="165" rx="8" ry="14" fill="#4A3A5A" opacity="0.35" />
        <ellipse cx="60" cy="170" rx="10" ry="18" fill="#4A3A5A" opacity="0.3" />
        <ellipse cx="65" cy="175" rx="9" ry="16" fill="#3A2A4A" opacity="0.3" />
        <ellipse cx="65" cy="180" rx="12" ry="20" fill="#4A3A5A" opacity="0.25" />
        <ellipse cx="68" cy="185" rx="10" ry="17" fill="#3A2A4A" opacity="0.28" />
        <ellipse cx="70" cy="190" rx="10" ry="16" fill="#4A3A5A" opacity="0.3" />
        <ellipse cx="72" cy="195" rx="8" ry="14" fill="#5A4A6A" opacity="0.25" />

        {/* Wing highlight */}
        <ellipse cx="58" cy="168" rx="12" ry="18" fill="#7B6B8D" opacity="0.2" />

        {/* Pink accent - layered */}
        <ellipse
          cx="60"
          cy="185"
          rx="28"
          ry="35"
          fill="url(#wingPinkGradient)"
          opacity="0.85"
        />
        <ellipse
          cx="58"
          cy="190"
          rx="22"
          ry="28"
          fill="#FFB6C1"
          opacity="0.6"
        />
        <ellipse
          cx="56"
          cy="195"
          rx="18"
          ry="22"
          fill="#FFC0CB"
          opacity="0.4"
        />

        {/* Right wing */}
        <ellipse
          cx="135"
          cy="175"
          rx="35"
          ry="45"
          fill="url(#bodyGradient)"
          className="wing"
        />
        {/* Wing shadow */}
        <ellipse cx="133" cy="178" rx="33" ry="43" fill="#2A1A3A" opacity="0.25" />

        {/* Wing feather details - multiple layers */}
        <ellipse cx="140" cy="165" rx="8" ry="14" fill="#4A3A5A" opacity="0.35" />
        <ellipse cx="140" cy="170" rx="10" ry="18" fill="#4A3A5A" opacity="0.3" />
        <ellipse cx="135" cy="175" rx="9" ry="16" fill="#3A2A4A" opacity="0.3" />
        <ellipse cx="135" cy="180" rx="12" ry="20" fill="#4A3A5A" opacity="0.25" />
        <ellipse cx="132" cy="185" rx="10" ry="17" fill="#3A2A4A" opacity="0.28" />
        <ellipse cx="130" cy="190" rx="10" ry="16" fill="#4A3A5A" opacity="0.3" />
        <ellipse cx="128" cy="195" rx="8" ry="14" fill="#5A4A6A" opacity="0.25" />

        {/* Wing highlight */}
        <ellipse cx="142" cy="168" rx="12" ry="18" fill="#7B6B8D" opacity="0.2" />

        {/* Pink accent - layered */}
        <ellipse
          cx="140"
          cy="185"
          rx="28"
          ry="35"
          fill="url(#wingPinkGradient)"
          opacity="0.85"
        />
        <ellipse
          cx="142"
          cy="190"
          rx="22"
          ry="28"
          fill="#FFB6C1"
          opacity="0.6"
        />
        <ellipse
          cx="144"
          cy="195"
          rx="18"
          ry="22"
          fill="#FFC0CB"
          opacity="0.4"
        />

        {/* Tail feathers - highly detailed with individual strands */}
        {/* Back layer */}
        <ellipse
          cx="168"
          cy="142"
          rx="12"
          ry="32"
          fill="url(#bodyGradient)"
          className="tail-feather"
          opacity="0.85"
        />
        <ellipse cx="168" cy="135" rx="4" ry="10" fill="#4A3A5A" opacity="0.4" />
        <ellipse cx="170" cy="145" rx="3" ry="8" fill="#3A2A4A" opacity="0.35" />

        {/* Middle layer */}
        <ellipse
          cx="162"
          cy="150"
          rx="16"
          ry="38"
          fill="url(#bodyGradient)"
          className="tail-feather"
          opacity="0.9"
        />
        <ellipse cx="162" cy="145" rx="5" ry="12" fill="#4A3A5A" opacity="0.4" />
        <ellipse cx="164" cy="155" rx="4" ry="10" fill="#3A2A4A" opacity="0.35" />
        <ellipse cx="160" cy="160" rx="3" ry="8" fill="#5A4A6A" opacity="0.3" />

        {/* Front layer */}
        <ellipse
          cx="155"
          cy="160"
          rx="20"
          ry="45"
          fill="url(#bodyGradient)"
          className="tail-feather"
          opacity="0.95"
        />
        <ellipse cx="155" cy="155" rx="6" ry="15" fill="#4A3A5A" opacity="0.4" />
        <ellipse cx="158" cy="165" rx="5" ry="12" fill="#4A3A5A" opacity="0.35" />
        <ellipse cx="152" cy="170" rx="4" ry="10" fill="#3A2A4A" opacity="0.4" />
        <ellipse cx="156" cy="175" rx="3" ry="8" fill="#5A4A6A" opacity="0.3" />

        {/* Individual feather strands */}
        <path d="M 155 140 Q 157 155, 156 170" stroke="#3A2A4A" strokeWidth="1" opacity="0.3" fill="none" />
        <path d="M 158 142 Q 160 157, 159 172" stroke="#3A2A4A" strokeWidth="1" opacity="0.25" fill="none" />
        <path d="M 152 145 Q 154 160, 153 175" stroke="#4A3A5A" strokeWidth="1" opacity="0.3" fill="none" />

        {/* Chest - light grey transition */}
        <ellipse
          cx="100"
          cy="145"
          rx="45"
          ry="35"
          fill="#E8E8E8"
        />
        {/* Chest feather details */}
        <ellipse cx="95" cy="142" rx="8" ry="12" fill="#D8D8D8" opacity="0.5" />
        <ellipse cx="105" cy="142" rx="8" ry="12" fill="#D8D8D8" opacity="0.5" />
        <ellipse cx="100" cy="148" rx="10" ry="14" fill="#D0D0D0" opacity="0.4" />

        {/* Long S-curved neck */}
        <path
          d="M 100 50 Q 95 70, 100 90 Q 105 110, 100 130"
          stroke="url(#neckGradient)"
          strokeWidth="22"
          fill="none"
          strokeLinecap="round"
          className="neck"
        />

        {/* Neck shadow */}
        <path
          d="M 102 50 Q 97 70, 102 90 Q 107 110, 102 130"
          stroke="#B0B0B0"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Neck highlight */}
        <path
          d="M 97 50 Q 92 70, 97 90 Q 102 110, 97 130"
          stroke="#F8F8F8"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Neck feather texture */}
        <ellipse cx="98" cy="65" rx="6" ry="10" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="102" cy="75" rx="6" ry="10" fill="#D8D8D8" opacity="0.35" />
        <ellipse cx="98" cy="85" rx="6" ry="10" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="102" cy="95" rx="6" ry="10" fill="#D8D8D8" opacity="0.35" />
        <ellipse cx="98" cy="105" rx="6" ry="10" fill="#D8D8D8" opacity="0.4" />
        <ellipse cx="102" cy="115" rx="6" ry="10" fill="#D8D8D8" opacity="0.35" />

        {/* ROUND HEAD - Perfect sphere */}
        <circle
          cx="100"
          cy="40"
          r="30"
          fill="url(#headGradient)"
          className="head"
        />

        {/* Head shadow for depth */}
        <circle
          cx="104"
          cy="44"
          r="28"
          fill="#A0A0A0"
          opacity="0.25"
        />

        {/* Head highlight - top left */}
        <ellipse
          cx="88"
          cy="30"
          rx="18"
          ry="15"
          fill="#FFFFFF"
          opacity="0.4"
        />
        <ellipse
          cx="85"
          cy="28"
          rx="12"
          ry="10"
          fill="#FFFFFF"
          opacity="0.3"
        />

        {/* Detailed head feathers around edge - more coverage */}
        {/* Left side feathers */}
        <path d="M 73 38 L 71 35 L 74 37" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.65" strokeLinecap="round" />
        <path d="M 75 35 L 73 32 L 76 34" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 78 30 L 76 27 L 79 29" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 82 26 L 80 23 L 83 25" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 86 22 L 84 19 L 87 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.55" strokeLinecap="round" />
        <path d="M 90 19 L 88 16 L 91 18" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />

        {/* Right side feathers */}
        <path d="M 127 38 L 129 35 L 126 37" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.65" strokeLinecap="round" />
        <path d="M 125 35 L 127 32 L 124 34" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 122 30 L 124 27 L 121 29" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 118 26 L 120 23 L 117 25" stroke="#D0D0D0" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 114 22 L 116 19 L 113 21" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.55" strokeLinecap="round" />
        <path d="M 110 19 L 112 16 L 109 18" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />

        {/* Top feathers */}
        <path d="M 95 14 L 94 11 L 96 13" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 100 12 L 99 9 L 101 11" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
        <path d="M 105 14 L 104 11 L 106 13" stroke="#E0E0E0" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />

        {/* Bottom feathers */}
        <path d="M 75 42 L 73 39 L 76 41" stroke="#C8C8C8" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M 125 42 L 127 39 L 124 41" stroke="#C8C8C8" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />

        {/* Eyes - large and expressive */}
        {/* Left eye white */}
        <ellipse
          cx="88"
          cy="38"
          rx={state === 'anticipation' ? "11" : "10"}
          ry={state === 'anticipation' ? "12" : "11"}
          fill="#FFFFFF"
          className="eye"
        />
        {/* Left eye iris */}
        <circle
          cx="88"
          cy="38"
          r="7"
          fill="url(#eyeIrisGradient)"
        />
        {/* Left eye pupil */}
        <circle
          cx="88"
          cy="38"
          r={state === 'anticipation' ? "4.5" : "4"}
          fill="#1A1A1A"
        />
        {/* Left eye highlight */}
        <circle
          cx="86"
          cy="36"
          r="2.5"
          fill="#FFFFFF"
          opacity="0.95"
        />
        <circle
          cx="90"
          cy="40"
          r="1.5"
          fill="#FFFFFF"
          opacity="0.6"
        />

        {/* Right eye white */}
        <ellipse
          cx="112"
          cy="38"
          rx={state === 'anticipation' ? "11" : "10"}
          ry={state === 'anticipation' ? "12" : "11"}
          fill="#FFFFFF"
          className="eye"
        />
        {/* Right eye iris */}
        <circle
          cx="112"
          cy="38"
          r="7"
          fill="url(#eyeIrisGradient)"
        />
        {/* Right eye pupil */}
        <circle
          cx="112"
          cy="38"
          r={state === 'anticipation' ? "4.5" : "4"}
          fill="#1A1A1A"
        />
        {/* Right eye highlight */}
        <circle
          cx="110"
          cy="36"
          r="2.5"
          fill="#FFFFFF"
          opacity="0.95"
        />
        <circle
          cx="114"
          cy="40"
          r="1.5"
          fill="#FFFFFF"
          opacity="0.6"
        />

        {/* Beak - opens only when anticipation */}
        {state !== 'anticipation' && (
          <>
            {/* Closed beak - triangular shape */}
            <path
              d="M 90 50 Q 85 52, 85 55 Q 85 58, 100 62 Q 115 58, 115 55 Q 115 52, 110 50 L 100 48 Z"
              fill="url(#beakGradient)"
              className="beak-closed"
            />
            {/* Beak highlight */}
            <path
              d="M 92 51 Q 88 53, 88 55 Q 88 56, 100 59 Q 112 56, 112 55 Q 112 53, 108 51 L 100 50 Z"
              fill="#FFBB88"
              opacity="0.5"
            />
            {/* Beak shadow */}
            <path
              d="M 100 58 Q 110 56, 112 55 L 100 48 Z"
              fill="#FF7730"
              opacity="0.3"
            />
            {/* Nostrils */}
            <ellipse cx="94" cy="54" rx="2" ry="1.5" fill="#8B5A2B" opacity="0.7" />
            <ellipse cx="106" cy="54" rx="2" ry="1.5" fill="#8B5A2B" opacity="0.7" />
          </>
        )}

        {state === 'anticipation' && (
          <>
            {/* Upper beak - triangular, hinged at back */}
            <g className="beak-upper-group">
              <path
                d="M 90 50 Q 85 52, 85 55 L 100 57 L 115 55 Q 115 52, 110 50 L 100 48 Z"
                fill="url(#beakGradient)"
                className="beak-upper"
              />
              {/* Upper beak highlight */}
              <path
                d="M 92 51 Q 88 53, 88 55 L 100 56 L 112 55 Q 112 53, 108 51 L 100 50 Z"
                fill="#FFBB88"
                opacity="0.6"
              />
              {/* Upper beak shadow */}
              <path
                d="M 100 56 L 112 55 L 100 48 Z"
                fill="#FF7730"
                opacity="0.2"
              />
              {/* Nostrils */}
              <ellipse cx="94" cy="54" rx="2" ry="1.5" fill="#8B5A2B" opacity="0.7" />
              <ellipse cx="106" cy="54" rx="2" ry="1.5" fill="#8B5A2B" opacity="0.7" />
            </g>

            {/* Lower beak - triangular, hinged at back */}
            <g className="beak-lower-group">
              <path
                d="M 85 58 Q 85 61, 90 63 L 100 65 L 110 63 Q 115 61, 115 58 L 100 57 Z"
                fill="url(#beakGradient)"
                className="beak-lower"
              />
              {/* Lower beak highlight */}
              <path
                d="M 88 59 Q 88 61, 92 62 L 100 63 L 108 62 Q 112 61, 112 59 L 100 58 Z"
                fill="#FFBB88"
                opacity="0.5"
              />
              {/* Lower beak shadow */}
              <path
                d="M 85 58 L 100 57 L 100 65 Z"
                fill="#FF7730"
                opacity="0.4"
              />
            </g>

            {/* Mouth interior - ON TOP of beaks */}
            <ellipse
              cx="100"
              cy="58"
              rx="18"
              ry="12"
              fill="#AA1111"
              className="mouth-interior"
            />
            <ellipse
              cx="100"
              cy="58"
              rx="15"
              ry="10"
              fill="#DD3333"
              className="mouth-interior"
              opacity="0.9"
            />
            <ellipse
              cx="100"
              cy="57"
              rx="12"
              ry="8"
              fill="#FF5555"
              opacity="0.8"
            />

            {/* Tongue */}
            <ellipse
              cx="100"
              cy="62"
              rx="10"
              ry="5"
              fill="#FF8888"
              className="mouth-interior tongue"
              opacity="0.9"
            />
            <ellipse
              cx="100"
              cy="62"
              rx="8"
              ry="4"
              fill="#FFAAAA"
              opacity="0.7"
            />
          </>
        )}

        {/* Long legs */}
        {/* Left leg */}
        <rect
          x="82"
          y="220"
          width="10"
          height="60"
          fill="url(#legGradient)"
          rx="5"
          className="leg"
        />
        {/* Leg shadow */}
        <rect
          x="84"
          y="220"
          width="8"
          height="60"
          fill="#FF7730"
          opacity="0.3"
          rx="4"
        />
        {/* Leg highlight */}
        <rect
          x="82"
          y="220"
          width="3"
          height="58"
          fill="#FFBB88"
          opacity="0.4"
          rx="1.5"
        />
        {/* Leg scales/texture */}
        <ellipse cx="86" cy="230" rx="4" ry="2" fill="#FF7730" opacity="0.3" />
        <ellipse cx="86" cy="237" rx="4" ry="2" fill="#FF7730" opacity="0.25" />
        <ellipse cx="86" cy="244" rx="4" ry="2" fill="#FF7730" opacity="0.3" />
        <ellipse cx="86" cy="251" rx="4" ry="2" fill="#FF7730" opacity="0.25" />
        <ellipse cx="86" cy="258" rx="4" ry="2" fill="#FF7730" opacity="0.3" />
        <ellipse cx="86" cy="265" rx="4" ry="2" fill="#FF7730" opacity="0.25" />
        <ellipse cx="86" cy="272" rx="4" ry="2" fill="#FF7730" opacity="0.3" />

        {/* Knee and ankle joints */}
        <circle cx="87" cy="220" r="7" fill="#FF9955" />
        <circle cx="87" cy="220" r="5" fill="#FFA366" opacity="0.5" />
        <circle cx="87" cy="250" r="5" fill="#FF8842" />
        <circle cx="87" cy="250" r="3" fill="#FF7730" opacity="0.5" />

        {/* Right leg */}
        <rect
          x="108"
          y="220"
          width="10"
          height="60"
          fill="url(#legGradient)"
          rx="5"
          className="leg"
        />
        {/* Leg shadow */}
        <rect
          x="110"
          y="220"
          width="8"
          height="60"
          fill="#FF7730"
          opacity="0.3"
          rx="4"
        />
        {/* Leg highlight */}
        <rect
          x="108"
          y="220"
          width="3"
          height="58"
          fill="#FFBB88"
          opacity="0.4"
          rx="1.5"
        />
        {/* Leg scales/texture */}
        <ellipse cx="114" cy="230" rx="4" ry="2" fill="#FF7730" opacity="0.3" />
        <ellipse cx="114" cy="237" rx="4" ry="2" fill="#FF7730" opacity="0.25" />
        <ellipse cx="114" cy="244" rx="4" ry="2" fill="#FF7730" opacity="0.3" />
        <ellipse cx="114" cy="251" rx="4" ry="2" fill="#FF7730" opacity="0.25" />
        <ellipse cx="114" cy="258" rx="4" ry="2" fill="#FF7730" opacity="0.3" />
        <ellipse cx="114" cy="265" rx="4" ry="2" fill="#FF7730" opacity="0.25" />
        <ellipse cx="114" cy="272" rx="4" ry="2" fill="#FF7730" opacity="0.3" />

        {/* Knee and ankle joints */}
        <circle cx="113" cy="220" r="7" fill="#FF9955" />
        <circle cx="113" cy="220" r="5" fill="#FFA366" opacity="0.5" />
        <circle cx="113" cy="250" r="5" fill="#FF8842" />
        <circle cx="113" cy="250" r="3" fill="#FF7730" opacity="0.5" />

        {/* Feet - two-toed ostrich feet */}
        {/* Left foot */}
        <ellipse
          cx="87"
          cy="285"
          rx="18"
          ry="10"
          fill="url(#legGradient)"
          className="foot"
        />
        <ellipse
          cx="87"
          cy="285"
          rx="16"
          ry="8"
          fill="#FF9955"
          opacity="0.7"
        />
        {/* Left foot - larger toe */}
        <ellipse
          cx="80"
          cy="288"
          rx="8"
          ry="6"
          fill="#FF9955"
        />
        <ellipse
          cx="80"
          cy="288"
          rx="6"
          ry="4"
          fill="#FFA366"
          opacity="0.6"
        />
        <path d="M 72 288 L 74 284 L 73 292 Z" fill="#2A2A2A" />
        <path d="M 72 288 L 74 284 L 73 292 Z" fill="#1A1A1A" opacity="0.5" />

        {/* Left foot - smaller toe */}
        <ellipse
          cx="94"
          cy="287"
          rx="6"
          ry="5"
          fill="#FF9955"
        />
        <ellipse
          cx="94"
          cy="287"
          rx="4"
          ry="3"
          fill="#FFA366"
          opacity="0.6"
        />
        <path d="M 88 287 L 90 283 L 89 291 Z" fill="#2A2A2A" />

        {/* Right foot */}
        <ellipse
          cx="113"
          cy="285"
          rx="18"
          ry="10"
          fill="url(#legGradient)"
          className="foot"
        />
        <ellipse
          cx="113"
          cy="285"
          rx="16"
          ry="8"
          fill="#FF9955"
          opacity="0.7"
        />
        {/* Right foot - larger toe */}
        <ellipse
          cx="106"
          cy="288"
          rx="8"
          ry="6"
          fill="#FF9955"
        />
        <ellipse
          cx="106"
          cy="288"
          rx="6"
          ry="4"
          fill="#FFA366"
          opacity="0.6"
        />
        <path d="M 98 288 L 100 284 L 99 292 Z" fill="#2A2A2A" />
        <path d="M 98 288 L 100 284 L 99 292 Z" fill="#1A1A1A" opacity="0.5" />

        {/* Right foot - smaller toe */}
        <ellipse
          cx="120"
          cy="287"
          rx="6"
          ry="5"
          fill="#FF9955"
        />
        <ellipse
          cx="120"
          cy="287"
          rx="4"
          ry="3"
          fill="#FFA366"
          opacity="0.6"
        />
        <path d="M 114 287 L 116 283 L 115 291 Z" fill="#2A2A2A" />
      </svg>
    </div>
  )
}

export default Ostrich
