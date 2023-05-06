/*eslint-disable*/

import { configureStore } from "@reduxjs/toolkit";
import ludoReducer from "./ludo/ludoSlice";
import { ludoMiddleware } from "./ludo/ludoSlice";


const preloadedState = localStorage.getItem('ludoState')
    ? { ludo: JSON.parse(localStorage.getItem('ludoState')) }
    : {};

const store = configureStore({
    reducer: {
        ludo: ludoReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ludoMiddleware),
});

export default store;