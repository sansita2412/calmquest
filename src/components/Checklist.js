import React, { useState } from 'react';
import './Checklist.css';

function Checklist() {
    const [items, setItems] = useState([]);
    const [inputText, setInputText] = useState('');
    const [priority, setPriority] = useState('easy');
    const [visible, setVisible] = useState(false); // Toggle visibility

    const handleAdd = () => {
        if (inputText.trim() !== '') {
            setItems([...items, { text: inputText, done: false, priority }]);
            setInputText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const toggleDone = (index) => {
        const updated = [...items];
        updated[index].done = !updated[index].done;
        setItems(updated);

        if (updated[index].done) {
            const audio = new Audio(`/assets/${updated[index].priority}.mp3`);
            audio.play().catch((e) => console.log('Tick sound failed:', e));
        }
    };

    return (
        <>
            {/* Floating Checklist Toggle Button */}
            <button className="checklist-toggle" onClick={() => setVisible(!visible)}>
                📋 Checklist
            </button>

            {/* Slide-in Drawer */}
            <div className={`checklist-drawer ${visible ? 'visible' : ''}`}>
                <h2 className="checklist-heading">✨ My Tasks</h2>

                <div className="checklist-input">
                    <input
                        type="text"
                        placeholder="What do you want to do?"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="easy">🟢 Easy</option>
                        <option value="medium">🟡 Medium</option>
                        <option value="hard">🔴 Hard</option>
                    </select>
                    <button onClick={handleAdd}>➕</button>
                </div>

                <ul className="checklist-items">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={`checklist-item ${item.done ? 'done' : ''} ${item.priority}`}
                            onClick={() => toggleDone(index)}
                        >
                            <input type="checkbox" checked={item.done} readOnly />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Checklist;
