
//action creator returns action object that is sent to the reducer
export const fetchAllData = () => {
    return(dispatch) => {
        fetch("http://localhost:3000/api/categories")
        .then(res => res.json())
        .then(data => {
            if(data.status === 500) {
                console.log("Server Error")
            } else {
                dispatch({type: "ADD_MENUS", payload: data})
            }
        });
    }
}

export const addItemToCart = (item) => {
    return {
        type: "ADD_ITEM_CART",
        payload: item
    }
}

export const setTotalPrice = (total) => {
    return {
        type: "SET_TOTAL",
        payload: total
    }
}