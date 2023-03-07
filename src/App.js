import React, { useState, useEffect } from 'react';

import ports from './assets/ports';

import './App.css';

function App() {

  const [quizStarted, setQuizStarted] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [cursor, setCursor] = useState(0); // will keep track of which question we are on

  const totalQuestions = ports.length;
  const protocols = ports.map((p) => (p.service));
  const portNumbers = ports.map((p) => (p.port));

  console.log("PORTS", ports);
  console.log("protocols", protocols);
  console.log("portNumbers", portNumbers);

  function begin() {
    setQuizStarted(true);
    console.log("begin");
  }

  function answerPort(port) {
    if (ports[cursor].port == port) {
      console.log("CORRECT");
      setCorrect(correct+1);
    } else {
      console.log("WRONG");
    }
    nextQuestion();
  }

  function nextQuestion() {
    setCursor((cursor + 1) % totalQuestions);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Network Port Quiz</h1>
      </header>
      {
        quizStarted && 
        <div>
          <div className="score">
            <h3>{correct} / { totalQuestions }</h3>
          </div>
          <div>
            <h2>{ ports[cursor].service }</h2>

            { portNumbers.map((item,index)=>{ 
              return <button key={index} onClick={() => { answerPort(item) }}>{ item }</button>
             })}
          </div>
        </div>
      }
      <div>
       { !quizStarted && <button onClick={begin}>BEGIN</button> }
      </div>
    </div>
  );
}

export default App;
