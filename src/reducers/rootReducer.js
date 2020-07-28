import notesReducer from './notesReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    user: userReducer,
    notes: notesReducer
})

export default rootReducer
