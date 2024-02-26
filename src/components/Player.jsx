import { useState } from "react";

export default function Player({initialName,symbol,isActive,onChangeName}){
    const[playerName,setPlayerName]=useState(initialName);
const[isEditing,setIsEditing]=useState(false);

function handleClick(){
  //  setIsEditing(!isEditing); // schedules to update isEditing to true initially
  setIsEditing(editing=>!editing);
  if(isEditing){
  onChangeName(symbol,playerName)
  }
}
function handleChangePlayerName(event){
    console.log(event);
    setPlayerName(event.target.value);
}
let editablePlayerName= <span className="player-name">{playerName}</span> 
//let buttonName="Edit";
if(isEditing){
    editablePlayerName= <input type="text" required value={playerName} onChange={handleChangePlayerName}/>
//    buttonName="Save"
}

    return(
        <li className={isActive ? "active":""}>
          <span className="player">
             {editablePlayerName}     
          <span className="player-symbol">{symbol}</span>  
          </span>   
          <button onClick={handleClick}>{isEditing ? 'Save': "Edit"}</button>     
        </li>
    );

}