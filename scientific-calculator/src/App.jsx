import React, { useState, useEffect } from 'react';
import { create, all } from 'mathjs';
import { History, Settings, MoreHorizontal } from 'lucide-react';

const math = create(all);

const App = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [isSci, setIsSci] = useState(true);

  const handleKeyClick = (val) => {
    if (val === '=') {
      calculate();
    } else if (val === 'C') {
      setExpression('');
      setResult('');
    } else if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else {
      setExpression(prev => prev + val);
    }
  };

  const calculate = () => {
    try {
      if (!expression) return;
      // Convert display symbols to mathjs compatible ones
      let expr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e')
        .replace(/sin/g, 'sin(')
        .replace(/cos/g, 'cos(')
        .replace(/tan/g, 'tan(')
        .replace(/log/g, 'log10(')
        .replace(/ln/g, 'log(')
        .replace(/√/g, 'sqrt(');

      // Simple auto-closing brackets for convenience
      const openBrackets = (expr.match(/\(/g) || []).length;
      const closeBrackets = (expr.match(/\)/g) || []).length;
      for (let i = 0; i < openBrackets - closeBrackets; i++) {
        expr += ')';
      }

      const res = math.evaluate(expr);
      const formattedRes = math.format(res, { precision: 10 });
      setResult(formattedRes.toString());
      setHistory(prev => [{ expr: expression, res: formattedRes }, ...prev].slice(0, 10));
    } catch (err) {
      setResult('Error');
    }
  };

  const sciButtons = [
    { label: 'sin', val: 'sin' }, { label: 'cos', val: 'cos' }, { label: 'tan', val: 'tan' }, { label: 'π', val: 'π' }, { label: 'e', val: 'e' },
    { label: 'log', val: 'log' }, { label: 'ln', val: 'ln' }, { label: '(', val: '(' }, { label: ')', val: ')' }, { label: '√', val: '√' },
  ];

  const mainButtons = [
    { label: 'C', val: 'C', type: 'clear' },
    { label: 'DEL', val: 'DEL', type: 'operator' },
    { label: '%', val: '%', type: 'operator' },
    { label: '÷', val: '÷', type: 'operator' },
    { label: '7', val: '7' }, { label: '8', val: '8' }, { label: '9', val: '9' },
    { label: '×', val: '×', type: 'operator' },
    { label: '4', val: '4' }, { label: '5', val: '5' }, { label: '6', val: '6' },
    { label: '-', val: '-', type: 'operator' },
    { label: '1', val: '1' }, { label: '2', val: '2' }, { label: '3', val: '3' },
    { label: '+', val: '+', type: 'operator' },
    { label: 'e', val: 'e' }, { label: '0', val: '0' }, { label: '.', val: '.' },
    { label: '=', val: '=', type: 'equals' },
  ];

  return (
    <div className="calculator-container">
      <div className="mode-toggle">
        <span>DEG</span>
        <History size={16} />
      </div>
      
      <div className="display">
        <div className="history">{expression || '0'}</div>
        <div className="input">{result || expression || '0'}</div>
      </div>

      <div className="scientific-panel">
        {sciButtons.map(btn => (
          <button 
            key={btn.label} 
            className="scientific"
            onClick={() => handleKeyClick(btn.val)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="keypad">
        {mainButtons.map(btn => (
          <button 
            key={btn.label} 
            className={btn.type || ''}
            onClick={() => handleKeyClick(btn.val)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
