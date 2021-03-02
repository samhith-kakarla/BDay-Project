import { combineReducers, createStore, applyMiddleware } from 'redux'; 
import thunk, { ThunkMiddleware } from 'redux-thunk'; 
import { createLogger } from 'redux-logger'; 

// REDUCERS
import { authReducer } from './reducers/authReducer'; 

// ACTION TYPES
import { rootActions } from './types/rootActionTypes'; 


const logger = createLogger(); 

export const rootReducer = combineReducers({
    authReducer,
}); 

export type AppState = ReturnType<typeof rootReducer>; 

// STORE
export const store = createStore<AppState, rootActions, {}, {}>(
    rootReducer, 
    applyMiddleware(thunk as ThunkMiddleware<AppState, rootActions>, logger), 
); 