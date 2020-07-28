export default function notesReducer(
    state = [],
    action) {
        switch (action.type) {
            case "LOAD_NOTES":
                return action.notes
            case "ADD_NOTE":
                return [...state, action.note];
            case "EDIT_NOTE":
                return state.map(note => {
                    if (note.id === action.note.id) {
                        return action.note
                    } else {
                        return note
                    }
                })
            case "DELETE_NOTE": 
                return state.filter(note => note.id !== action.id)
        default:
            return state
    }
}