import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const Button: React.FC<{
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }> = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.1s ease',
        backgroundColor: className.includes('operator') ? '#ff9500' : 
                        className.includes('clear') ? '#a6a6a6' : '#333',
        color: className.includes('clear') ? '#000' : '#fff',
        outline: 'none',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.95)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(145deg, #2c2c2c, #1a1a1a)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'SF Pro Display, -apple-system, sans-serif',
    }}>
      {/* Display */}
      <div style={{
        background: '#000',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'right',
        marginBottom: '20px',
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        <div style={{
          color: '#fff',
          fontSize: '48px',
          fontWeight: '300',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        gap: '12px',
        flex: 1,
      }}>
        <Button onClick={clear} className="clear">AC</Button>
        <Button onClick={() => {}} className="clear">±</Button>
        <Button onClick={() => {}} className="clear">%</Button>
        <Button onClick={() => inputOperation('÷')} className="operator">÷</Button>

        <Button onClick={() => inputNumber('7')}>7</Button>
        <Button onClick={() => inputNumber('8')}>8</Button>
        <Button onClick={() => inputNumber('9')}>9</Button>
        <Button onClick={() => inputOperation('×')} className="operator">×</Button>

        <Button onClick={() => inputNumber('4')}>4</Button>
        <Button onClick={() => inputNumber('5')}>5</Button>
        <Button onClick={() => inputNumber('6')}>6</Button>
        <Button onClick={() => inputOperation('-')} className="operator">−</Button>

        <Button onClick={() => inputNumber('1')}>1</Button>
        <Button onClick={() => inputNumber('2')}>2</Button>
        <Button onClick={() => inputNumber('3')}>3</Button>
        <Button onClick={() => inputOperation('+')} className="operator">+</Button>

        <Button onClick={() => inputNumber('0')} style={{ gridColumn: 'span 2' }}>0</Button>
        <Button onClick={() => inputNumber('.')}>.</Button>
        <Button onClick={performCalculation} className="operator">=</Button>
      </div>
    </div>
  );
};

export default Calculator;