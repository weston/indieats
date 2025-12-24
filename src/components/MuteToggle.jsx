import './MuteToggle.css'

function MuteToggle({ muted, onToggle }) {
  return (
    <button
      className="mute-toggle"
      onClick={onToggle}
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 10V14C16 15.1 15.1 16 14 16H13L9 20V16H6C4.9 16 4 15.1 4 14V10C4 8.9 4.9 8 6 8H9L13 4V8H14C15.1 8 16 8.9 16 10Z"
            fill="currentColor"
          />
          <path
            d="M19.07 4.93L17.66 6.34C19.1 7.79 20 9.79 20 12C20 14.21 19.1 16.21 17.66 17.66L19.07 19.07C20.88 17.26 22 14.76 22 12C22 9.24 20.88 6.74 19.07 4.93Z"
            fill="currentColor"
          />
          <path
            d="M15.54 8.46L14.13 9.87C14.7 10.45 15 11.2 15 12C15 12.8 14.7 13.55 14.13 14.13L15.54 15.54C16.5 14.58 17 13.33 17 12C17 10.67 16.5 9.42 15.54 8.46Z"
            fill="currentColor"
          />
          <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 10V14C16 15.1 15.1 16 14 16H13L9 20V16H6C4.9 16 4 15.1 4 14V10C4 8.9 4.9 8 6 8H9L13 4V8H14C15.1 8 16 8.9 16 10Z"
            fill="currentColor"
          />
          <path
            d="M19.07 4.93L17.66 6.34C19.1 7.79 20 9.79 20 12C20 14.21 19.1 16.21 17.66 17.66L19.07 19.07C20.88 17.26 22 14.76 22 12C22 9.24 20.88 6.74 19.07 4.93Z"
            fill="currentColor"
          />
          <path
            d="M15.54 8.46L14.13 9.87C14.7 10.45 15 11.2 15 12C15 12.8 14.7 13.55 14.13 14.13L15.54 15.54C16.5 14.58 17 13.33 17 12C17 10.67 16.5 9.42 15.54 8.46Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  )
}

export default MuteToggle

