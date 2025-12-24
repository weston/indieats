import './StartScreen.css'

function StartScreen({ onStart }) {
  return (
    <div className="start-overlay">
      <button className="start-button" onClick={onStart}>
        Start
      </button>
    </div>
  )
}

export default StartScreen
