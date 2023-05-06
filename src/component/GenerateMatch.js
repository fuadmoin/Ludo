/*eslint-disable*/

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addMatch } from '../app/ludo/ludoSlice';
import { NavLink } from 'react-router-dom';
import styles from '../styles/generateMatch.module.css';

const GenerateMatch = () => {
    const dispatch = useDispatch();
   const [genereated, setGenerated] = useState(false);
    const {matches, players, gameName} = useSelector((state) => state.ludo);
const generateMatch = (teams) => {
    let shuffledTeams = [...teams];
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
      
    }
    let matches = [];
    for (let i = 0; i < shuffledTeams.length; i += 2) {
        let team1 = shuffledTeams[i];
        let team2 = shuffledTeams[i + 1];
    
        matches.push({ team1, team2 });
      }
    return matches;
}

const handleGenerateMatch = () => {
    const matches = generateMatch(players)
    dispatch(addMatch(matches));
    setGenerated(true);
}

const displayStyle = {
    textDecoration: 'none',
    color: 'black',
  };

  return (
    <div>
         <h1 className={styles.GameName}>{gameName}</h1>
        <button className={styles.button}
        onClick={handleGenerateMatch}>Generate Match</button>
        <div className="match-list">
            {matches.map((match, index) => ( 
                <div className={styles.container}
                key={index} >
                    <small className={styles.index}>Match {index + 1} :</small>
                    <div className="team1">
                        <small className={styles.name} >{match.team1.name}</small>
                        <small className={styles.name + ' ' +styles.id}>{match.team1.playerId}</small>
                    </div>
                    <small className={styles.vs}>VS</small>
                    <div className={styles.team2}>
                        <small className={styles.name}>{match.team2.name}</small>
                        <small className={styles.name + ' ' +styles.id} >{match.team2.playerId}</small>
                    </div>
                </div>

            ) )} 
            </div>
            {genereated || matches.length > 0? 
            <>
            <p className={styles.info}><strong>Hint:</strong> You can generate as many matches as you like. After you get your desired result, click next to continue.</p>
            <NavLink style={displayStyle} to="/matchPage"> <button 
            className={styles.button + ' ' +styles.buttonN}
            type="button"  >Next</button> </NavLink> </>
             : null}
    </div>
  )
}

export default GenerateMatch;