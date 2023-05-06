/* eslint-disable */
import React, { useState }  from 'react'
import { addWinner, addReservedWinner } from '../app/ludo/ludoSlice';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles/match.module.css';

const ReservedList = () => {
    const dispatch = useDispatch();
    const [name , setName] = useState('');
    const [playerId, setId] = useState(''); 
    const handleSubmit = (e) => {
        e.preventDefault();
        if(name.trim() && playerId.trim()){
           dispatch (addReservedWinner({name, playerId, id: uuidv4(), win: true}));
           dispatch(addWinner(5));
           setName('');
            setId('');
        }
      }
  return (
    <div>
         <form className="form" onSubmit={handleSubmit}>
            <label className={styles.label}
            htmlFor="name">Player Name</label>
            <input className={styles.input}
            type="text" id="name" name="name"  value={name}
            onChange={(e)=> setName(e.target.value)} required
            />
            <label className={styles.label}
             htmlFor="name">Player  ID</label>
            <input className={styles.input} 
            type="number" id="ID" name="ID"  value={playerId}
            onChange={(e) => setId(e.target.value)} required
            />
            <button  className={styles.button}
            type="submit"  >
                Submit</button>
        </form>
    </div>
  )
}

export default ReservedList