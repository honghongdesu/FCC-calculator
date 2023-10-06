import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const extr = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };


  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "plusminus") {
      if(answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (isOperator(symbol)) {
      setExpression(extr + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if(expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNum = expression.split(/[-+/*]/g).pop();
      if (lastNum?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

const calculate = () => {
  if (isOperator(extr.charAt(extr.length - 1))) return;
  const parts = extr.split(" ");
  const newParts = [];
  for (let i = parts.length-1; i >= 0; i--) {
    if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i-1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
    } else {
      newParts.unshift(parts[i]);
    }
  }
  const newExpression = newParts.join(" ");
  if(isOperator(newExpression.charAt(0))) {
    setAnswer(eval(answer + newExpression) as string);
  } else {
    setAnswer(eval(newExpression) as string);
  }
  setExpression("");
}

  return (
    <>
      <div className='container'>
        <h1>Sakura-Flavored Calculator</h1>
        <div id="calculator">
          <div id="display" style={{textAlign: "right"}}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
            <button id="clear" onClick={() => buttonPress("clear")} className="pink">AC</button>
            <button id="plusminus" onClick={() => buttonPress("plusminus")} className="pink">+/-</button>
            <button id="divide" onClick={() => buttonPress("/")} className="rose">/</button>
            <button id="seven" onClick={() => buttonPress("7")} className="white">7</button>
            <button id="eight" onClick={() => buttonPress("8")} className="white">8</button>
            <button id="nine" onClick={() => buttonPress("9")} className="white">9</button>
            <button id="multiply" onClick={() => buttonPress("*")} className="rose">x</button>
            <button id="four" onClick={() => buttonPress("4")} className="white">4</button>
            <button id="five" onClick={() => buttonPress("5")} className="white">5</button>
            <button id="six" onClick={() => buttonPress("6")} className="white">6</button>
            <button id="subtract" onClick={() => buttonPress("-")} className="rose">-</button>
            <button id="one" onClick={() => buttonPress("1")} className="white">1</button>
            <button id="two" onClick={() => buttonPress("2")} className="white">2</button>
            <button id="three" onClick={() => buttonPress("3")} className="white">3</button>
            <button id="add" onClick={() => buttonPress("+")} className="rose">+</button>
            <button id="zero" onClick={() => buttonPress("0")} className="white">0</button>
            <button id="decimal" onClick={() => buttonPress(".")} className="white">.</button>
            <button id="equals" onClick={() => buttonPress("=")} className="rose">=</button>
        </div>
      </div>
    </>
  )
}

export default App
