import notesReducer from './notesReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    users: usersReducer,
    notes: notesReducer
})

export default rootReducer
