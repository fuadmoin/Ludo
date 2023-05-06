/* eslint-disable */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { setNumberOfPlayers, updateGame } from '../app/ludo/ludoSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/home.module.css';

const Home = () => {
   const[ players, setPlayers] = useState('');
   const [message, setMessage] = useState('');
   const [gamename, setgameName] = useState('');
   const [newGameName, setNewGameName] = useState('');
   const [editing, setEditing] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
  const {numOfPlayers, gameName} = useSelector((state) => state.ludo);
  const dispatch = useDispatch();
   const handlChange = (num) => {
    setPlayers(num.target.value);
   }
   const displayStyle = {
    textDecoration: 'none',
    color: 'black',
  };
   const handlSubmit = (e) => {
    e.preventDefault();
    if(players % 4 === 0) {
    setIsSubmitted(true);
   dispatch(setNumberOfPlayers(players));
    setPlayers(''); 
    setMessage('');
}
 else {
    setMessage('Number of players must be a multiple of 4!');
    setPlayers('');
 }  
   }
   const handleEdit = (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    }
const handleName = (e) => {
    e.preventDefault();
    if(gamename.trim()){
    dispatch(updateGame(gamename));
    setgameName('');}
}
const handleDoubleClick = () => {
    setEditing(true);
}
const handleUpdateDone = (e) =>{
 if(e.key === 'Enter') {
    dispatch(updateGame(newGameName));
    setEditing(false);
    
 }
}
  return (
    <div>
        <h1 className={styles.title}>Welcome to Ludo Competition Manager</h1>
       { gameName.length === 0 ?
       <form className="form" onSubmit={handleName}>
            <label className={styles.textl}
            htmlFor="name">Enter Game Name:</label>
            <input className={styles.textInputE}
             required type="text" id="name" name="name"
            value={gamename}
            onChange={(e) => { setgameName(e.target.value)}}
            />
       </form>
      :<> <h2
      className={styles.GameName}
      onDoubleClick={handleDoubleClick} > 
      {editing?
      <input 
      type="text"
      className={styles.textInputE}
      value={newGameName}
      onChange={ (e) => setNewGameName(e.target.value)}
      onKeyDown={handleUpdateDone} required
    />
    :  gameName }
      </h2>
       <form className="form" onSubmit={handlSubmit}>
            <label className={styles.textLabel} htmlFor="name">How many Players Do you want to register?</label>
            <input required type="number" id="number" name="name" 
            value={players} 
            className={styles.textInput}
            onChange={handlChange}
            />
            {isSubmitted ? 
            <button type="button" 
            className={styles.button}
            onClick={handleEdit}>Edit</button> : <>
                <button 
                className={styles.button}
                type="submit" >Submit</button>
                <span className={styles.warning}>{message}</span> </>
                }
            </form> </>}
            {isSubmitted || numOfPlayers > 0 && gameName.length >0 ? <>
            <small className={styles.info}> <strong>hint:</strong>  Your number of players is {numOfPlayers}. 
            Double-click on the title of the game to edit the name of the game, click the edit button
             to edit the number of players, or click next to continue.</small>
              <NavLink style={displayStyle} to="./playerName"> <button
              className={styles.button + ' ' +styles.buttonN}
              type="button"  >Next</button> </NavLink> </>
            : null        }
    </div>
  )
}

export default Home