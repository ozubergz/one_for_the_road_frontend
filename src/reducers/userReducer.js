const initialState = {
    token: null,
    id: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "SET_USER":
            return {
                token: action.payload.token,
                id: action.payload.id
            }
        case "REMOVE_USER":
            return {
                token: null,
                id: null
            }
        default:
            return state;    
    }
}