export const loadNotes = notes => {
    return {
        type: "LOAD_NOTES",
        notes
    }
}

export const addNote = note => {
    return {
        type: "ADD_NOTE", 
        note
    }
}

export const editNote = note => {
    return {
        type: "EDIT_NOTE",
        note
    }
}

export const deleteNote = id => {
    return {
        type: "DELETE_NOTE",
        id
    }
}