export default function usersReducer(
    state = [],
    action) {
        let array
        switch (action.type) {
            case "ADD_USER":
                return [...state, action.user];
            case "EDIT_USER":
                array = []
                array.push(action.user)
                return array
            case "DELETE_USER":
                array = [] 
                return array 
        default:
            return state
    }
}