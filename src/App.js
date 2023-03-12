import React, { useState } from 'react';

import portsJSON from './assets/ports';

import './App.css';

function App() {

  const totalQuestions = portsJSON.length;

  const [ports, setPorts] = useState(portsJSON);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [portNumbers, setPortNumbers] = useState(portsJSON.map((p) => (p.port)));
  const [cursor, setCursor] = useState(0); // will keep track of which question we are on

  function begin() {
    setQuizStarted(true);
    setQuizEnded(false);
    setCorrect([]);
    setIncorrect([]);
    setCursor(0);
    setPortNumbers(shuffle(portNumbers));
    setPorts(shuffle(ports));

    console.log("begin");
  }

  function answerPort(port) {
    if (ports[cursor].port == port) {
      const newCorrect = correct.concat([port]);
      console.log("CORRECT", newCorrect);
      setCorrect(newCorrect);
    } else {
      const newIncorrect = incorrect.concat([ports[cursor]]);
      console.log("WRONG", newIncorrect);
      setIncorrect(newIncorrect);
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
    console.log("cursor", cursor, totalQuestions);
    const newCursor = cursor + 1;

    if (newCursor == totalQuestions) {
      console.log("NO MORE QUESTIONS");
      setQuizEnded(true);
      return;
    }

    setCursor(newCursor % totalQuestions);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Network Port Quiz</h1>
      </header>
      {
        quizStarted &&
        <div className="score">
          <h3><span className="thin">Score:</span> &nbsp; { correct.length } / { totalQuestions }</h3>
        </div>
      }
      {
        quizStarted && !quizEnded &&
        <div className="quiz-container">
          <div>
            <h2>
              <span className="thin">Question {cursor + 1}:</span> &nbsp; { ports[cursor].service }
            </h2>
            <div className="description-container">
              <p>{ ports[cursor].description }</p>
            </div>
            <div className="button-container">
              { portNumbers.map((item,index)=>{ 
                return (
                  <button 
                    key={index}
                    disabled={ correct.includes(item) }
                    className={ correct.includes(item) ? 'correct' : '' }
                    onClick={() => { answerPort(item) }}>{ item }
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      }
      {
        quizStarted && quizEnded &&
        <div>
          <h2 className="final-score">{ Math.floor((correct.length / totalQuestions) * 100) }%</h2>

          <button onClick={begin}>RESTART</button>

          { incorrect.length > 0 && 
            <div className="description-container">
              <h3>Incorrect Answers</h3>
              { 
                incorrect.map((item,index)=>{ 
                return (
                    <div key={index}>
                      { item.service } runs on port { item.port }
                    </div>
                  )
                })
              }
            </div>
          }
        </div>
      }
      {
        !quizStarted && 
        <div>
          <div className="description-container">
            <p>Test your knowledge of common network ports and protocols.</p>
          </div>

          <button onClick={begin}>BEGIN</button>
        </div>
      }
    </div>
  );
}

export default App;
