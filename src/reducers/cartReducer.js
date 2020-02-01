export default (state = [], action) => {
    switch(action.type) {
        case "ADD_ITEM_CART":
            return [...state, action.payload]
        default:
            return state
    }
}