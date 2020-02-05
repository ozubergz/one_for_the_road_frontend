const initialState = {
    items: [],
    total: 0
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "ADD_ITEM_CART":            
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case "REMOVE_ALL_CART_ITEMS":
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}