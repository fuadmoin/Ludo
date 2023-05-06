/* eslint-disable */
import React, { useState } from 'react'
import { addPlayer, updatePlayers } from '../app/ludo/ludoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import styles from '../styles/register.module.css';

const PlayerName = () => {
    const dispatch = useDispatch();
    const {numOfPlayers, players, gameName} = useSelector((state) => state.ludo);
  const [index, setIndex] = useState(players.length + 1);
  const [name , setName] = useState('');
const [playerId, setId] = useState(''); 
const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPlayerId, setNewPlayerId] = useState('');
  const displayStyle = {
    textDecoration: 'none',
    color: 'black',
  };
const handleName = (e) =>{
  setName(e.target.value);
}
const handleId = (e) =>{
    setId(e.target.value);
}
  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.trim() && playerId.trim() &&  index <= numOfPlayers){
       dispatch (addPlayer({name, playerId, id: uuidv4(), win: false}));
        setIndex(index+1);
        setName('');
        setId('');

    }

  }
  const handleDoubleClick = (player) => {
    setEditingPlayerId(player.id);
    setNewName(player.name);
    setNewPlayerId(player.playerId);
  };
  const handleUpdatedDone = (event) => {
    if (event.key === 'Enter') {
        dispatch(updatePlayers({id: editingPlayerId, name: newName, playerId: newPlayerId}));
        setEditingPlayerId(null);
        setNewName('');
        setNewPlayerId('');
    }
  };

  return (
    <div>
        <h1 className={styles.GameName}>{gameName}</h1>
        <form className="form" onSubmit={handleSubmit}>
            <label className={styles.textLabel} 
             htmlFor="name">Player {index}'s Name</label>
            <input className={styles.textInput}
             type="text" id="name" name="name"  value={name}
            onChange={handleName} required
            />
            <label className={styles.textLabel}
              htmlFor="name">Player {index}'s ID</label>
            <input className={styles.textInput}
             type="number" id="ID" name="ID"  value={playerId}
            onChange={handleId} required
            />
            <button className={styles.button}
             type="submit"  disabled={index > numOfPlayers}>
                Submit</button>
        </form>
    <div className={styles.listContainer}>
        <h2 className={styles.h2}>Players Name</h2>
        <h2 className={styles.list}>Players ID</h2>
  

        { 
        players.map((player, index) => (
            <div key={player.id}
            className={styles.playersContainer}
            onDoubleClick={() => handleDoubleClick(player)}
            >
              { 
              editingPlayerId === player.id ? (
                <>
                  <input
                    type="text"
                    className={styles.textInputE}
                    value={newName}
                    onChange={ (e) => setNewName(e.target.value)}
                    onKeyDown={handleUpdatedDone} required
                  />
                  <input
                    type="text"
                    className={styles.textInputE + ' ' + styles.textInputN}
                    value={newPlayerId}
                    onChange={ (e) => setNewPlayerId(e.target.value)}
                    onKeyDown={handleUpdatedDone} required
                  />
                  
                </>
              ) :
              
              ( <>
                 <small className={styles.name}>{index + 1}</small>
                <small className={styles.name}>{player.name}</small>
                <small className={styles.name}>{player.playerId}</small> </>)}
                </div>
              
        ))} 
        </div>
        <div className="nextMessage">
        {index > numOfPlayers? <>
        <p className={styles.info}><strong>Hint:</strong> You entered the players' names and IDs. 
        Double-click on the list to edit a player's name and ID. After completing,
         click next to continue.</p>
                  <NavLink style={displayStyle} to="/generateMatch"> <button 
                  className={styles.button + ' ' + styles.buttonN}
                  type="button"  >Next</button> </NavLink> </>
                : null}
            </div>
    </div>
  )
}

PlayerName.propTypes = {}

export default PlayerName