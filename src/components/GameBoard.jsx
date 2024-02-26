
export default function GameBoard({onSelectedGrid,board}){


    return( <ol id="game-board">
            {board.map((row,rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex)=>(
                            <li  key={`${rowIndex}-${colIndex}`}>
                                <button onClick={()=>onSelectedGrid(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}