import {combineReducers, createStore, Reducer} from 'redux'
import {UserReducer, UserState} from "./user.reducer";

export interface ICombinedReducers {
    user: UserState
}

const CombinedReducers: Reducer<ICombinedReducers> = combineReducers({
    user: UserReducer
});

export const store = createStore(CombinedReducers) ;
