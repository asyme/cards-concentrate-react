import React, { useEffect, useState } from "react";
import './App.css';

function App() {

  const [upCard, setUpCard] = useState([]);
  const [pair, setPair] = useState([]);

  const suits = [String.fromCharCode(9830), String.fromCharCode(9830)]
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "Q"];

  const makeDeck = () => {
    var deck = []
    for (var i = 0; i < suits.length; i++) {
      for (var j = 0; j < values.length; j++) {
        var card = { value: values[j], suit: suits[i]};
        deck.push(card)
      }
    }
    // randomly swap cards 
    for (var i = 0; i < 300; i++) {
      var c1 = Math.floor(Math.random() * deck.length);
      var c2 = Math.floor(Math.random() * deck.length);
      var temp = deck[c1];
      deck[c1] = deck[c2];
      deck[c2] = temp;
    }
    return deck;
  }

  const deck = makeDeck();
  
  const [cards, SetCards] = useState(deck);

  const flipCard = (index) => {
    setUpCard((opened) => [...opened, index]);
  }

  const [turn, setTurn] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [winner, setWinner] = useState();

  const changeTurn = () => {
    if (turn == 1) setTurn(2);
    else setTurn(1);
  }

  useEffect(() => {
    if (upCard < 2) return;
    const firstCard = cards[upCard[0]];
    const secondCard = cards[upCard[1]];

    if (secondCard && firstCard.value == secondCard.value) {
      setPair([...pair, firstCard.value]);
      if (turn == 1) {
        setScore1(score1+1);
      } else {
        setScore2(score2+1);
      }
      setTimeout(() => setUpCard([]), 1000);
    }
    else if (upCard.length == 2) {
      changeTurn();
      setTimeout(() => setUpCard([]), 1000);
    }
  }, [upCard])

  useEffect(() => {
    if (score1+score2 == 10) {
      if (score1 == score2) {
        setWinner("Draw")
      }
      else if (score1 > score2) {
        setWinner(1)
      }
      else {
        setWinner(2)
      }
    }
  }, [score1, score2])


  return (
    <div className="App">
      <br/>
      Concentration - Match 2 Cards!
      <div className="cards">
        {cards.map((card, index) => {

          let flipped = false;
          if (upCard.includes(index)) flipped = true;
          if (pair.includes(card.value)) flipped = true;

          return (
            <div 
              className={`card ${flipped ? "flipped" : ""}`}
              key={index}
              onClick={() => flipCard(index)}
            >
              {`${card.value} ${card.suit}`}
            </div>
          )
        })}
      </div>

      <div className="scoreboard">
        Turn: <br/>
        Player {turn}
        <br/><br/>
        Score: <br/>
        Player 1 - {score1} <br/>
        Player 2 - {score2}
        <br/><br/>
        Winner: <br/>
        {winner} <br/><br/>
        { winner ? 
        <a href="http://localhost:3000"><u>Play again?</u></a>
        : "" }
      </div>
    </div>
  );
}

export default App;
