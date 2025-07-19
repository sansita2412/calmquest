import React, { useRef, useState, useEffect } from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import Checklist from './components/Checklist';
import './App.css';

const backgroundGIFs = [
  '/assets/bg1.gif',
  '/assets/bg2.gif',
  '/assets/bg3.gif',
  '/assets/bg4.gif',
  '/assets/newbg.gif',
];

const audioTracks = [
  { name: 'Frogs', file: '/assets/frogs.mp3' },
  { name: 'Rain', file: '/assets/rain.mp3' },
  { name: 'Wind', file: '/assets/wind.mp3' },
  { name: 'Love', file: '/assets/love.mp3' },
  { name: 'Ghibli', file: '/assets/ghibli.mp3' },
];



function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => { });
    }
  }, [audioIndex]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  const nextBackground = () => {
    setBgIndex((prevIndex) => (prevIndex + 1) % backgroundGIFs.length);
  };

  const prevBackground = () => {
    setBgIndex((prevIndex) =>
      prevIndex === 0 ? backgroundGIFs.length - 1 : prevIndex - 1
    );
  };

  const nextAudio = () => {
    setAudioIndex((prev) => (prev + 1) % audioTracks.length);
  };

  const prevAudio = () => {
    setAudioIndex((prev) => (prev === 0 ? audioTracks.length - 1 : prev - 1));
  };

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };



  return (
    <div
      className={`app-container ${darkMode ? 'dark' : ''}`}
      style={{
        backgroundImage: `url('${backgroundGIFs[bgIndex]}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        transition: 'background-image 0.8s ease-in-out',
      }}
    >
      {/* 🌙 Dark Mode in Top-Left */}
      {/* 🌙 Dark Mode in Top-Left */}
      <div className="top-left-controls">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* ⛶ Fullscreen in Top-Right */}
      <div className="top-right-controls">
        <button className="fullscreen-toggle" onClick={handleFullscreen}>
          ⛶
        </button>
      </div>












      {/* 🎧 Background Music */}
      <audio
        ref={audioRef}
        autoPlay
        loop
        muted={isMuted}
        key={audioTracks[audioIndex].file}
      >
        <source src={audioTracks[audioIndex].file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {darkMode && <div className="dark-overlay"></div>}


      {/* 🍅 Pomodoro Section */}
      <div className="timer-box">
        <h1 className="title">Pomodoro Timer 🍅</h1>
        <PomodoroTimer />

        {/* 🔊 Audio Controls */}
        <div className="audio-controls">
          <button className="control-button" onClick={prevAudio}>⮜♪</button>
          <button className="control-button" onClick={toggleMute}>
            {isMuted ? '🔇' : '🔊'}
          </button>
          <button className="control-button" onClick={nextAudio}>♪⮞</button>
        </div>
        <div className="track-label">
          ✩ ♬ ₊.🎧⋆☾⋆⁺₊✧: {audioTracks[audioIndex].name}
        </div>
      </div>

      {/* 📌 Checklist Drawer */}
      <div className="checklist-tab" onClick={() => setShowChecklist(!showChecklist)}>
        📌 Checklist
      </div>
      <div className={`checklist-drawer ${showChecklist ? 'visible' : ''}`}>
        <Checklist />
      </div>

      {/* 🎠 Background Switch Controls */}
      <div className="bg-controls">
        <button className="control-button" onClick={prevBackground}>⮜</button>
        <button className="control-button" onClick={nextBackground}>⮞</button>
      </div>
    </div>
  );
}

export default App;
