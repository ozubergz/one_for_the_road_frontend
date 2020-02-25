export default (state = false, action) => {
    switch(action.type) {
        case "ADMIN_ACCESS":
            return state = true;
        default:
            return state
    }
}