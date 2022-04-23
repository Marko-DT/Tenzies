import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";
import dies from "./dies";

export default function App() {
  const [diesArray, setDiesArray] = useState([]);
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    setDiesArray(dies);
  }, []);
  useEffect(() => {
    if (diesArray.length) {
      let isAllheld = diesArray.every((die) => die.isFreez === true);
      let isAllSame = diesArray.every((die) => die.num === diesArray[0].num);
      if (isAllheld && isAllSame) {
        setTenzies(true);
      }
    }
  }, [diesArray]);
  const dieClicked = (idx) => {
    setDiesArray((prevDies) =>
      prevDies.map((die) =>
        die.id === idx ? { ...die, isFreez: !die.isFreez } : die
      )
    );
  };
  const rollClicked = () => {
    // let num = Math.floor(Math.random()*5)+1;
    // let getNum = (num) => {
    //     n= Math.floor(Math.random()*5)+1;
    //     while(n===num){
    //             n = Math.floor(Math.random()*5)+1;
    //         }
    //        return n;
    // }
    setDiesArray((prevDies) =>
      prevDies.map((die) =>
        !die.isFreez ? { ...die, num: Math.floor(Math.random() * 5) + 1 } : die
      )
    );
  };
  const newGameClicked = () => {
    setTenzies(false);
    setDiesArray(dies);
  };
  return (
    <main>
      {tenzies && <Confetti />}
      <h4 className="title">Tenzies</h4>
      <p className="description">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dies">
        {diesArray.map((die) => (
          <Die
            key={die.id}
            id={die.id}
            isFreez={die.isFreez}
            dieClicked={dieClicked}
            num={die.num}
          />
        ))}
      </div>
      <button className="roll" onClick={tenzies ? newGameClicked : rollClicked}>
        {!tenzies ? "Roll" : "New Game"}
      </button>
    </main>
  );
}
