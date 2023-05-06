/*eslint-disable*/
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    // Here we will be adding the initial state
    players : [],
    numOfPlayers: 0,
    matches: [],
    winnersList: [],
    reservedWinners: [],
    finalRound:[],
    thirdPlace:[],
    gameName: "",
    round: 1,
};

const ludoSlice = createSlice({
    name: "ludo",
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        setNumberOfPlayers: (state, action) =>{
            state.numOfPlayers = action.payload;
        },
        updatePlayers: (state, action) => {
            const {name, playerId, id} = action.payload;
         const players = state.players.map((player) => {
            if(player.id === id){
                return {...player, name: name, playerId: playerId}
            }
            return player;
         });
         return{
            ...state,
            players,
         }
        },
        addMatch: (state, action) => ({
            ...state,
            matches:  action.payload,
        }),
        addWinner: (state, action) => {
      
            const players = state.players.map((player) => {
                if(player.id === action.payload)
                {
                    return {...player, win: !player.win}
                }
                return player;
            });
            const matches = state.matches.map((player) => {
             if(player.team1.id === action.payload)
             {
                 return {...player,
                     team1: {...player.team1, win: !player.team1.win},
                     team2: {...player.team2, win: false}
                    }
             }
             else if(player.team2.id === action.payload)
             {
                 return {...player, 
                    team1: {...player.team1, win: false},
                    team2: {...player.team2, win: !player.team2.win}
                }
             }
                return player;
            });

            let winnerIds = [];
         
            // if(matches.length === 2 ) {
            //     matches.forEach((match) => {
            //         if (match.team1.win === true) finalround.push(match.team1.id);
            //         else thirdplace.push(match.team1.id);
            //         if (match.team2.win === true) finalround.push(match.team2.id);
            //         else thirdplace.push(match.team2.id);
            //     });
            // } 
            // else if(matches.length === 1 && state.finalRound.length === 0){ 
                
            //     matches.forEach((match) => {
            //         if (match.team1.win === true) winnerIds.push(match.team1.id);
            //         else secondplace.push(match.team1.id);
            //         if (match.team2.win === true) winnerIds.push(match.team2.id);
            //         else secondplace.push(match.team2.id);
            //     });
            // }
            // else {
            matches.forEach((match) => {
                if (match.team1.win === true) winnerIds.push(match.team1.id);
                if (match.team2.win === true) winnerIds.push(match.team2.id);
            });
            const filter = (ids) =>{
                let result = [];
                ids.forEach((id) =>{
                 const player = players.filter((winner) => winner.id === id);
                 result = [...result, ...player]
                });
                return result;
            }
           let finalRound = state.finalRound;
           let thirdPlace = state.thirdPlace;
           let second = [];
           let winnersList = filter(winnerIds);
        //    if(finalround.length > 0)
        //   {  finalRound = filter(finalround);}
        //   else finalRound = state.finalRound;
        //    const thirdPlace = filter(thirdplace);
        //    const second = filter(secondplace);
        winnersList = [...winnersList, ...state.reservedWinners];
        if(matches.length === 2 && state.reservedWinners.length === 0) { 
         finalRound = [];
         finalRound = [...winnersList];
         thirdPlace =[];
         thirdPlace = players.filter((player) => !winnersList.includes(player));
     }
     if(matches.length === 1 && state.finalRound.length === 0)
     {
        second = players.filter((player) => !winnersList.includes(player));
     }
           let rank;
              if(state.matches.length === 1) {
                if(state.thirdPlace.length === 0 && state.finalRound.length > 0)
                {
                    rank = [ {thirdPlace: [...winnersList] ,
                        secondplace: "to be determined",
                        firstplace: "to be determined",
                    } ]
                }
                else if (state.finalRound.length === 0)
                {
                    const [{ thirdPlace}] = state.rank;
                    rank =[{firstplace : [...winnersList], secondplace:[...second], thirdPlace}];
                }
              }
           
       
        // if(state.finalRound.length > 0 && state.matches.length === 2) {
        //     winnersList = [ ...state.finalRound];
        // }
         return {  ...state,
            players,
            winnersList,
            matches,
            finalRound,
            rank,
            thirdPlace,}
        },
        addReservedWinner: (state, action) =>{
            state.reservedWinners.push(action.payload);
        },
        nextMatch: (state) => {
            let players;
            let thirdPlace = state.thirdPlace;
            let finalRound = state.finalRound;
            if(state.thirdPlace.length === 2){ 
            players = state.thirdPlace.map((player) => {
                return {...player, win: false}
            }); thirdPlace = []}
            else if (state.thirdPlace.length === 0 && state.finalRound.length ===2){
                players = state.finalRound.map((player) => {
                    return {...player, win: false}
                });  finalRound = []
            }
            else {   players = state.winnersList.map((player) => {
                return {...player, win: false}
            }); }
            const round = state.round + 1;
            return { ...state, players, round, winnersList: [], matches:[], reservedWinners:[], finalRound, thirdPlace}
        },
        newGame: (state) => {
            return {...state,
                 players: [], matches: [], winnersList: [], 
                 reservedWinners: [], finalRound: [], numOfPlayers: 0,
                 thirdPlace: [], rank: [], round: 1, gameName: ""}
        },
        updateGame: (state, action) => {
 return {
    ... state,
    gameName: action.payload,
 }
        },
    },
});

export const ludoMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (
        ludoSlice.actions.addPlayer.match(action) ||
        ludoSlice.actions.setNumberOfPlayers.match(action) ||
        ludoSlice.actions.updatePlayers.match(action) ||
        ludoSlice.actions.addMatch.match(action) ||
        ludoSlice.actions.addWinner.match(action) ||
        ludoSlice.actions.addReservedWinner.match(action) ||
        ludoSlice.actions.nextMatch.match(action) ||
        ludoSlice.actions.newGame.match(action) ||
        ludoSlice.actions.updateGame.match(action)
    ) {
        const state = store.getState();
        localStorage.setItem('ludoState', JSON.stringify(state.ludo));
    }
    return result;
};

export default ludoSlice.reducer;
export const { addPlayer, setNumberOfPlayers, 
    updatePlayers, addMatch, addWinner, addReservedWinner,
     nextMatch, newGame, updateGame} = ludoSlice.actions;