import { useState, useEffect } from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
  const [tenzies, setTenzies] = useState(false);

  const generateDice = (id) => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return { id: id, value: randomNumber, isHeld: false };
  };

  const allNewDice = () => {
    const diceNumbers = [];

    for (let i = 0; i < 10; i++) {
      diceNumbers.push(generateDice(i));
    }

    return diceNumbers;
  };

  const [dice, setDice] = useState(allNewDice());

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstDieValue = dice[0].value;
    const allSameValues = dice.every((die) => die.value === firstDieValue);

    if (allHeld && allSameValues) {
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((dice) =>
          dice.isHeld ? { ...dice } : generateDice(dice.id)
        )
      ); 
    } else { // New Game
      setTenzies(false);
      setDice(allNewDice);
    }
  };

  const holdDice = (id) => {
    setDice((oldDice) => {
      return oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col game-wrapper p-4">
            <div className="game-inner-wrapper p-3 rounded-3 row">
              <div className="die-container">
                {tenzies && <Confetti />}
                {dice.map((dice) => (
                  <Die
                    digit={dice.value}
                    isHeld={dice.isHeld}
                    key={dice.id}
                    onClick={() => holdDice(dice.id)}
                  />
                ))}
              </div>
              <button onClick={rollDice} className="btn btn-primary btn-lg">
                {tenzies ? "New Game" : "Roll"}
              </button>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
