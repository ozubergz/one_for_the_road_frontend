import { trackPromise} from 'react-promise-tracker';

//action creator returns action object that is sent to the reducer
//fetch all category data
export const fetchAllData = () => {
    return(dispatch) => {
        //trackPromise tracks promises when data is loading
        trackPromise(
            fetch("http://localhost:3000/api/categories")
            .then(res => res.json())
            .then(data => {
                if(data.status === 500) {
                    console.log("Server Error")
                } else {
                    dispatch({type: "ADD_MENUS", payload: data})
                }
            })
        )
    }
}

export const addItemToCart = (item) => {
    return {
        type: "ADD_ITEM_CART",
        payload: item
    }
}

export const addLocalItems = (items) => {
    return {
        type: "ADD_LOCAL_ITEMS",
        payload: items
    }
}

export const removeAllCartItems = () => {
    return {
        type: "REMOVE_ALL_CART_ITEMS",
        payload: []
    }
}

export const setUser = (object) => {
    return {
        type: "SET_USER",
        payload: object
    }
}

export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}