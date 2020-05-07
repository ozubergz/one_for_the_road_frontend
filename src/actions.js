import { trackPromise} from 'react-promise-tracker';
import { v4 as uuidv4 } from 'uuid';


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
                    
                    //iterate all data
                    data.map(cat => {
                        return cat.items.map(item =>{
                            return item.group_options.map(group => {
                                //change group ids to unique ids
                                group.id = uuidv4();
                                return group.options.map(option => {
                                    //change option ids to unique ids
                                    option.id = uuidv4();
                                    return option
                                });
                            });
                        });
                    });
                    
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