import React, { useState } from 'react';

import portsJSON from './assets/ports';

import './App.css';

function App() {

  const totalQuestions = portsJSON.length;

  const [ports, setPorts] = useState(portsJSON);
  const [quizStarted, setQuizStarted] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [portNumbers, setPortNumbers] = useState(portsJSON.map((p) => (p.port)));
  const [cursor, setCursor] = useState(0); // will keep track of which question we are on

  function begin() {
    setQuizStarted(true);
    setCorrect([]);
    setCursor(0);
    setPortNumbers(shuffle(portNumbers));
    setPorts(shuffle(ports));

    console.log("PORTS", ports);
    console.log("portNumbers", portNumbers);

    console.log("begin");
  }

  function answerPort(port) {
    if (ports[cursor].port == port) {
      const newCorrect = correct.concat([port]);
      console.log("CORRECT", newCorrect);
      setCorrect(newCorrect);
    } else {
      console.log("WRONG");
    }
    nextQuestion();
  }

  function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
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
        <div className="quiz-container">
          <div className="score">
            <h3><span className="thin">Score:</span> &nbsp; {correct.length} / { totalQuestions }</h3>
          </div>
          <div>
            <h2>
              <span className="thin">Question {cursor + 1}:</span> &nbsp; { ports[cursor].service }
            </h2>
            <p>{ ports[cursor].description }</p>
            <div className="button-container">
              { portNumbers.map((item,index)=>{ 
                return <button key={index} onClick={() => { answerPort(item) }}>{ item }</button>
              })}
            </div>
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
