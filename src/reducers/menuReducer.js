const initialState = {
    menus: []
}

//Reducer changes state; it receives state and action
export default (state = initialState, action) => {
    switch(action.type) {
        case "ADD_MENUS":
            return { 
                ...state,
                menus: [...action.payload]
            }
        default:
            return state
    }
}