/* eslint-disable */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { addWinner, nextMatch } from '../app/ludo/ludoSlice';
import { useSelector, useDispatch } from 'react-redux';
import ReservedList from './ReservedList';
import styles from '../styles/match.module.css';

const MatchPage = () => {
    const dispatch = useDispatch();
    const {matches, reservedWinners, finalRound, thirdPlace, winnersList, gameName, round} = useSelector((state) => state.ludo);
    const [winner, setWinner] = useState('');
    const handleChange = (id) => {
        dispatch(addWinner(id));
    };
    const displayStyle = {
        textDecoration: 'none',
        color: 'black',
      };

  return (
    <div> 
         <h1 className={styles.GameName}>{gameName}</h1>
        {matches.length <=2 && reservedWinners.length === 0? 
        matches.length === 1?
        thirdPlace .length ===0 && finalRound.length? 
        <h2 className={styles.title}>For third place</h2> : <h2 className={styles.title}>Final </h2> : <h2 className={styles.title}>Top Four</h2> : <h2 className={styles.title}>Round {round}</h2>}

      
        
              <div className="match-list">
            {matches.map((match, index) => ( 
                <div key={index} 
                className={styles.container}>
                    <small className={styles.index}>Match {index + 1} :</small>
                    <div className="team1">
                        <small className={styles.name}>{match.team1.name}</small>
                        <small className={styles.id}>{match.team1.playerId}</small>
                        <input
          type="checkbox"
          className={styles.check}
          checked={match.team1.win}
          onChange={() => handleChange(match.team1.id)}
        />
                    </div>
                    <small className={styles.vs}>VS</small>
                    <div className={styles.team2}>
                        <small className={styles.name}>{match.team2.name}</small>
                        <small className={styles.id}>{match.team2.playerId}</small>
                        <input
          type="checkbox"
          className={styles.check}
          checked={match.team2.win}
          onChange={() => handleChange(match.team2.id)}
        />   </div>
                </div>
            ) )} 
            </div>
 <div className={styles.reservedContainer}>
            <div className="winner-list">
                <h3 className={styles.winnersList}>Winners List</h3>
            { winnersList.length? 
            winnersList.map((winner, index) => (
                <div className={styles.winners}>
                <small className={styles.number}>{index + 1}.</small>
               <small className={styles.names}>{winner.name}</small>
               <small >{winner.playerId}</small> </div> 
            )):null }
         
            </div> { round ===1?
            <div className="reserved-list">
                <h4 className={styles.reserved}>Reserved Winner</h4>
                <ReservedList />
                <small className={styles.info}><strong>Hint:</strong> If you want to add players who were not on
                 the original list, you can do so by using the given form; you should only
                  add the winner, not both players. Remember to make sure
                 the winner list is a multiple of 4. Click next to continue.</small>
                </div> : null}
                </div>  
                { winnersList.length % 2 === 0 && winnersList.length >0? <NavLink style={displayStyle} to="/generateMatch">
                    <button 
                     className={styles.button + ' ' +styles.buttonN}
                    onClick={() => {dispatch(nextMatch())} }
                    type="button">Next</button>
                    </NavLink>:null } 
                { winnersList.length === 1 && finalRound.length === 2? <NavLink style={displayStyle} to="/generateMatch">
                    <button 
                     className={styles.button + ' ' +styles.buttonN}
                    onClick={() => {dispatch(nextMatch())} }
                    type="button">Next</button>
                    </NavLink>:null }
                    
                { matches.length === 1 && winnersList.length === 1 && finalRound.length === 0? <NavLink style={displayStyle} to="/playersRank">
                <>
                <small  className={styles.info}><strong>Hint:</strong>  Your game has ended, click next to see top 3 winners List.</small>
                 <button 
                  className={styles.button + ' ' +styles.buttonN}
                    onClick={() => {dispatch(nextMatch())} }
                    type="button">Next</button> </>
                    </NavLink>:null }
    </div>
  )
}

export default MatchPage;