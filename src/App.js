import './App.css';
import processBasket from './taxCalculator';
import { useState, useEffect } from 'react';
function App() {
let [input, setInput] = useState([]);
let items = [

]
  const input1 = [
    { quantity: 1, name: 'book', price: 12.49, isImported: false, isExempt: true },
    { quantity: 1, name: 'music CD', price: 14.99, isImported: false, isExempt: false },
    { quantity: 1, name: 'chocolate bar', price: 0.85, isImported: false, isExempt: true },
  ];

  const output1 = processBasket(input1);

  const input2 = [
    { quantity: 1, name: 'imported box of chocolates', price: 10.0, isImported: true, isExempt: true },
    { quantity: 1, name: 'imported bottle of perfume', price: 47.50, isImported: true, isExempt: false },
  ];

  const output2 = processBasket(input2);

  const input3 = [
    { quantity: 1, name: 'imported bottle of perfume', price: 27.99, isImported: true, isExempt: false },
    { quantity: 1, name: 'bottle of perfume', price: 18.99, isImported: false, isExempt: false },
    { quantity: 1, name: 'packet of headache pills', price: 9.75, isImported: false, isExempt: true },
    { quantity: 1, name: 'box of imported chocolates', price: 11.25, isImported: true, isExempt: true },
  ];

  const output3 = processBasket(input3);
  return (
    <div className="App">
     <header className="App-header">
          <h1>Sales Tax Application</h1>
          <div>
            <h2>Output 1:</h2>
            <p>{output1.join('\n')}</p>
          </div>
          <div>
            <h2>Output 2:</h2>
            <p>{output2.join('\n')}</p>
          </div>
          <div>
            <h2>Output 3:</h2>
            <p>{output3.join('\n')}</p>
          </div>
        </header>
    </div>
  );
}

export default App;
