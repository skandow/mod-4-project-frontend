export default function usersReducer(
    state = [],
    action) {
        switch (action.type) {
            case "ADD_USER":
            console.log(action.user)
            return [...state, action.user];
            case "EDIT_USER":
            const array = []
            array.push(action.user)
            console.log(array)
            return array
        default:
            return state
    }
}