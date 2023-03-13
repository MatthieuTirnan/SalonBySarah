import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "./reducer";


export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState
    })

    return store
}