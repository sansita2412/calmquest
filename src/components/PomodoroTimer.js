import React, { useState, useEffect, useCallback } from 'react';

function PomodoroTimer() {
    const [pomodoroLength, setPomodoroLength] = useState(25);
    const [shortBreakLength, setShortBreakLength] = useState(5);
    const [longBreakLength, setLongBreakLength] = useState(15);

    const [timeLeft, setTimeLeft] = useState(pomodoroLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [mode, setMode] = useState('pomodoro'); // 'pomodoro', 'short', 'long'

    // Handle session end logic (wrapped in useCallback to fix ESLint)
    const handleSessionEnd = useCallback(() => {
        setIsRunning(false);
        if (mode === 'pomodoro') {
            const nextCycle = cycleCount + 1;
            setCycleCount(nextCycle);
            setMode(nextCycle === 4 ? 'long' : 'short');
        } else {
            if (cycleCount >= 4) setCycleCount(0);
            setMode('pomodoro');
        }
    }, [cycleCount, mode]);

    // Update timer when mode or lengths change
    useEffect(() => {
        if (mode === 'pomodoro') setTimeLeft(pomodoroLength * 60);
        if (mode === 'short') setTimeLeft(shortBreakLength * 60);
        if (mode === 'long') setTimeLeft(longBreakLength * 60);
    }, [mode, pomodoroLength, shortBreakLength, longBreakLength]);

    // Timer logic
    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleSessionEnd();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, handleSessionEnd]);

    // Button actions
    const handleStartPause = () => setIsRunning(!isRunning);

    const handleReset = () => {
        setIsRunning(false);
        setCycleCount(0);
        setMode('pomodoro');
        setTimeLeft(pomodoroLength * 60);
    };

    // Format mm:ss
    const formatTime = () => {
        const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const sec = (timeLeft % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    // Manual mode switching
    const handleManualMode = (selectedMode) => {
        setIsRunning(false);
        setMode(selectedMode);
    };

    return (
        <div className="pomodoro-container">
            {/* Header with clickable labels */}
            <div className="session-switcher">
                <span
                    className={`session-label ${mode === 'pomodoro' ? 'active' : ''}`}
                    onClick={() => handleManualMode('pomodoro')}
                >
                    🍅 Pomodoro
                </span>
                <span
                    className={`session-label ${mode === 'short' ? 'active' : ''}`}
                    onClick={() => handleManualMode('short')}
                >
                    ☕ Short Break
                </span>
                <span
                    className={`session-label ${mode === 'long' ? 'active' : ''}`}
                    onClick={() => handleManualMode('long')}
                >
                    🧘 Long Break
                </span>
            </div>

            {/* Timer */}
            <div className="timer-display">{formatTime()}</div>

            {/* Controls */}
            <div className="timer-controls">
                <button className="timer-button" onClick={handleStartPause}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button className="timer-button" onClick={handleReset}>Reset</button>
            </div>

            {/* Cycle Info */}
            <div className="cycle-info">
                Session: {mode === 'pomodoro' ? (cycleCount % 4) + 1 : cycleCount % 4 || 4} / 4
            </div>

            {/* Settings */}
            <h3 className="settings-title">⏱ Customize Timer</h3>
            <div className="settings">
                <div className="setting-row">
                    <label>Pomodoro Duration (mins):</label>
                    <input
                        type="number"
                        value={pomodoroLength}
                        min="1"
                        onChange={(e) => setPomodoroLength(Number(e.target.value))}
                    />
                </div>
                <div className="setting-row">
                    <label>Short Break (mins):</label>
                    <input
                        type="number"
                        value={shortBreakLength}
                        min="1"
                        onChange={(e) => setShortBreakLength(Number(e.target.value))}
                    />
                </div>
                <div className="setting-row">
                    <label>Long Break (mins):</label>
                    <input
                        type="number"
                        value={longBreakLength}
                        min="1"
                        onChange={(e) => setLongBreakLength(Number(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}

export default PomodoroTimer;
