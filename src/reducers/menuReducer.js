//Reducer changes state; it receives state and action
//Add all data to state
export default (state = [], action) => {
    switch(action.type) {
        case "ADD_MENUS":
            return [...state, ...action.payload];
        default:
            return state
    }
}

