import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
import GameOver from "./components/GameOver";
const PLAYER={
  X:'Player 1',
  O:'Player 2'
}
const INITIAL_GAME_BOARD=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]
function deriveWinner(gameBoard,player){
  let winner;
for(const combination of WINNING_COMBINATIONS){
  let firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
  let secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
  let thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];

  if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
    winner=player[firstSquareSymbol];
  }
}
return winner;
}
function deriveGameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(innerArray =>[...innerArray])];
  for(const turn of gameTurns){
      const{square,player}=turn;
      const{row,col}=square;
      gameBoard[row][col]=player;
  }
  return gameBoard;
}
function App() {
  function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      return currentPlayer;
  }
  const [gameTurns, setGameTurns] = useState([]);
  const [player,setPlayer]=useState(PLAYER);

const gameBoard=deriveGameBoard(gameTurns);
const winner=deriveWinner(gameBoard,player);
const hasDraw= (gameTurns.length===9 && !winner);

const activePlayer=deriveActivePlayer(gameTurns);
  function handleSelectedGrid(rowIndex, colIndex) {
    setGameTurns((previousTurn) => {
      const currentPlayer=deriveActivePlayer(previousTurn);
      const updatedTurn = [{
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer,
      },
      ...previousTurn];
      return updatedTurn;
    })
  }
  function GameReset(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol,newName){
    setPlayer(prevPlayer =>{
      return{
        ...prevPlayer,
        [symbol]:newName
      } 
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" onChangeName={handlePlayerNameChange} isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" onChangeName={handlePlayerNameChange} isActive={activePlayer === 'O'} />
        </ol>
       {(winner || hasDraw) && <GameOver winner={winner} reset={GameReset}/> }
        <GameBoard board={gameBoard} onSelectedGrid={handleSelectedGrid}  />
      </div>
     <Logs turns={gameTurns} />
    </main>
  );
}

export default App
