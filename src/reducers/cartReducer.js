
export default (state = [], action) => {
    switch(action.type) {
        case "ADD_ITEM_CART":            
            return [...state, action.payload]

        case "ADD_LOCAL_ITEMS":
            return action.payload

        case "REMOVE_ALL_CART_ITEMS":
            return  action.payload

        default:
            return state
    }
}