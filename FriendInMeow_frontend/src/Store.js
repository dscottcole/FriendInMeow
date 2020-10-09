import { createStore } from 'redux';
import { combineReducers } from "redux";
import CatReducer from './Reducers/CatReducer'
import NavReducer from './Reducers/NavReducer'
import UserReducer from './Reducers/UserReducer'

const comboReducer = combineReducers({
    catState: CatReducer,
    navState: NavReducer,
    userState: UserReducer
})


const Store = createStore(
    comboReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default Store