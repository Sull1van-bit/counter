import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import increaseSound from './assets/abs-cancel-1.wav';
import decreaseSound from './assets/abs-confirm-1.wav';
import backgroundMusic from './assets/background.mp3'; 
import './App.css';

function HyperspeedBackground() {
  return (
    <Canvas className="hyperspeed-canvas">
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />
    </Canvas>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const increaseAudioRef = useRef(null);
  const decreaseAudioRef = useRef(null);
  const backgroundAudioRef = useRef(null);

  
  const handleFirstInteraction = () => {
    if (!musicPlaying) {
      backgroundAudioRef.current.volume = 0.3; 
      backgroundAudioRef.current.loop = true; 
      backgroundAudioRef.current.play();
      setMusicPlaying(true);
    }
  };

  const playIncreaseSound = () => {
    handleFirstInteraction();
    increaseAudioRef.current.currentTime = 0;
    increaseAudioRef.current.play();
    setCount(count + 1);
  };

  const playDecreaseSound = () => {
    handleFirstInteraction();
    decreaseAudioRef.current.currentTime = 0;
    decreaseAudioRef.current.play();
    setCount(count - 1);
  };

  return (
    <div className="app-container" onClick={handleFirstInteraction}>
      {/* Hidden audio elements */}
      <audio ref={increaseAudioRef} src={increaseSound} preload="auto" />
      <audio ref={decreaseAudioRef} src={decreaseSound} preload="auto" />
      <audio ref={backgroundAudioRef} src={backgroundMusic} preload="auto" />
      
      <HyperspeedBackground />
      <div className="counter-card">
        <h1>{count}</h1>
        <div className="te-buttons">
          <button className="te-button" onClick={playDecreaseSound}>
            <svg viewBox="0 -960 960 960">
              <path d="M200-440v-80h560v80H200Z" />
            </svg>
          </button>
          <button className="te-button" onClick={playIncreaseSound}>
            <svg viewBox="0 -960 960 960">
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </button>
        </div>
        {/* Optional music controls */}
        <button 
          className="music-toggle"
          onClick={() => {
            if (musicPlaying) {
              backgroundAudioRef.current.pause();
            } else {
              backgroundAudioRef.current.play();
            }
            setMusicPlaying(!musicPlaying);
          }}
        >
          {musicPlaying ? '🔊' : '🔇'}
        </button>
      </div>
    </div>
  );
}

export default App;