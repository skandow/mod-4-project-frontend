import notesReducer from './notesReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'

export default rootReducer = combineReducers({
    users: usersReducer,
    notes: notesReducer
})
