import React, { useState, useEffect, useMemo, useCallback } from 'react';
import "./App.css"
const App = () => {
  const [input, setInput] = useState('0');
  const [result, setResult] = useState(0);
  const [memory, setMemory] = useState("");

  const calculateResult = useMemo(() => {
    try {

      return eval(input);
    } catch (error) {
      return '0';
    }
  }, [input]);

  useEffect(() => {
    setResult(calculateResult);
  }, [calculateResult]);

  const handleButtonClick = useCallback(
    (buttonValue) => {
      switch (buttonValue) {
        case '=':
          setInput(String(result));
          break;
        case 'C':
          setInput('0');
          setResult(0);
          break;
        case 'M':
          setMemory(result);
          setInput(result)
          break;
        case 'R':
          setInput((prevInput) => prevInput + memory);
          break;
        case '<-':
          setInput((prevInput) => (prevInput.length > 1 ? prevInput.slice(0, -1) : '0'));
          break;
        default:
          setInput((prevInput) => (prevInput === '0' ? String(buttonValue) : prevInput + buttonValue));
      }
    },
    [result, memory]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const key = event.key;

      if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === 'Enter') {
        event.preventDefault();
        handleButtonClick(key === 'Enter' ? '=' : key);
      } else if (key === 'Backspace') {
        handleButtonClick('<-');
      }
    },
    [handleButtonClick]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="keypad">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C', '<-', 'M', 'R'].map(
          (button) => (
            <button key={button} onClick={() => handleButtonClick(button)}>
              {button}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default App;

