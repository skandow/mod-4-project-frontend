export const addUser = user => {
    return {
        type: "ADD_USER", 
        user
    }
}

export const editUser = user => {
    return {
        type: "EDIT_USER",
        user
    }
}