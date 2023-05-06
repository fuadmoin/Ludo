/*eslint-disable*/
import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { newGame } from '../app/ludo/ludoSlice';
import styles from '../styles/rank.module.css';

const PlayersRank = () => {
    const dispatch = useDispatch();
    const {rank, gameName} = useSelector((state) => state.ludo);
    const displayStyle = {
        textDecoration: 'none',
        color: 'black',
      };
  return (
    <div>
        <h1 className={styles.GameName}>{gameName}</h1>
        <h2 className={styles.title}>Players' Rank</h2>
        
        <div className={styles.rankList}>
        <h3>Rank</h3>
        <h3 className={styles.pname}>Player Name</h3>
        <h3 className={styles.pid}>Player ID</h3>
       < div className={styles.first}>
        <small> 1.</small> <small className={styles.item} >{rank[0].firstplace[0].name}</small>
         <small >{rank[0].firstplace[0].playerId}</small> </div>
         < div className={styles.second}>
        <small >2.</small> <small className={styles.item} >{rank[0].secondplace[0].name}</small>
         <small  >{rank[0].secondplace[0].playerId}</small> </div>
            < div className={styles.third}>
        <small >3.</small> <small className={styles.item}>{rank[0].thirdPlace[0].name}</small>
         <small  >{rank[0].thirdPlace[0].playerId}</small> </div>
            </div>

        <NavLink style={displayStyle} to="/">
            <button  className={styles.button + ' ' +styles.buttonN}
            onClick={() => {dispatch(newGame())}}>New Game</button>
        </NavLink>
    </div>
  )
}

export default PlayersRank