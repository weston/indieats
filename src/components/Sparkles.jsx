import './Sparkles.css'

function Sparkles({ x, y }) {
  return (
    <div 
      className="sparkles-container"
      style={{
        left: `${x}vw`,
        top: `${y}vh`,
      }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            '--delay': i * 0.05,
          }}
        />
      ))}
    </div>
  )
}

export default Sparkles

