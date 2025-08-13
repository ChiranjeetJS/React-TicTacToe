import { useState } from "react";

export default function TicTacToe() {
  const data = {

  }
  let positions = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  const [count, setCount] = useState(0);
  const [xPosition, setX] = useState([]);
  const [yPosition, setY] = useState([]);
  const [winner, setWinner] = useState(null)
  const [winningComb, setWinningComb] = useState([])
  const [board, setBoard] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [isAI, setIsAI] = useState(false)
  const playwithAI = () => {
    if (xPosition.length > 0 || yPosition.length > 0) {
      resetBoard();
    }
    setIsAI(true)
  }
  const validate = (position, type) => {
    
    const str = "Winner is "
    

    if (position.includes(1) && position.includes(2) && position.includes(3)) {
      
      setWinningComb([1, 2, 3])
      return str+type;
    }
    if (position.includes(1) && position.includes(4) && position.includes(7)) {
      
      setWinningComb([1, 4, 7])

      return str+type;
    }
    if (position.includes(1) && position.includes(5) && position.includes(9)) {
      
      setWinningComb([1, 5, 9])

      return str+type;
    }
    if (position.includes(2) && position.includes(5) && position.includes(8)) {
      
      setWinningComb([2, 5, 8])

      return;
    }
    if (position.includes(3) && position.includes(5) && position.includes(7)) {
      
      setWinningComb([3, 5, 7])

      return str+type;
    }
    if (position.includes(3) && position.includes(6) && position.includes(9)) {
      setWinner(str + type)
      setWinningComb([3, 6, 9])

      return str+type;
    }
    if (position.includes(4) && position.includes(5) && position.includes(6)) {
      setWinner(str + type)
      setWinningComb([4, 5, 6])

      return str+type;
    }
    if (position.includes(7) && position.includes(8) && position.includes(9)) {
      setWinner(str + type)
      setWinningComb([7, 8, 9])

      return str+type;
    }
    return null
  };
  const makeAIMove = (xPosition, yPosition) => {
    if(winner){
      return;
    }
    const available = board.filter(val => !xPosition.includes(val) && !yPosition.includes(val));
    if (available.length == 0) {
      return
    }
    let currentWinner = null
    console.log(available)
    let indx = Math.floor(Math.random() * available.length)
    let position = available[indx]
    const newY = [...yPosition, position]
    setY(newY)
    if (newY.length >= 3) {
     currentWinner = validate(newY, "AI")

    }
    return currentWinner
  }
  const handleClick = (e) => {
    let id = e

    setCount((prev) => {
      let newCount = prev + 1
      let currentWinner = null

      if (newCount % 2 == 1) {
        const newX = [...xPosition, id]
        setX(newX)
        if (newX.length >= 3 && currentWinner === null) {
         currentWinner = validate(newX, "A");
        }

        if (isAI && currentWinner == null)  {
          setTimeout(() => {
            if (currentWinner === null) {
           currentWinner =  makeAIMove(newX, yPosition);
            }
          }, 500);
          newCount = newCount + 1
        }
      }
      else {
        const newY = [...yPosition, id]
        setY(newY)
        if (newY.length >= 3 && currentWinner === null) {
       currentWinner =validate(newY, "B");
        }
      }
    
      setWinner(currentWinner)
      return newCount;
    });
  };
  const resetBoard = () => {
    setCount(0);
    setX([])
    setY([])
    setWinner(null)
    setIsAI(false)


  }
  return (
    <div>
      <h2>{winner !== null ? winner : count === 9 ? "Match Drawn " : null}</h2>
      <h2>{isAI?"Playing Against AI":"Playing 1 vs 1"}</h2>
      <h2>{count === 0 ?  "Match Start ": null}</h2>
      <h2>{count > 0 && winner === null ? count % 2 == 0 ? "Player A turn":"Player B turn":null}</h2>

      <div className="outer-div">
        <div className="tictac-div">
          {board.map((val) => (
            <button key={val} style={{ backgroundColor: (winner !== null && winningComb.includes(val)) ? "green" : "white",color:"black" }}
              d={val} onClick={() => handleClick(val)}
              disabled={winner !== null || xPosition.includes(val) || yPosition.includes(val)}>
              {xPosition.includes(val) ? "X" : yPosition.includes(val) ? "O" : null}
            </button>
          ))}

        </div>
      </div>
      <button className="play-again" onClick={() => resetBoard()}>Play 1 vs 1</button>
      <button className="play-again" onClick={() => playwithAI()}>Play Against AI</button>

    </div>
  );

}
