const initialState = {
    currentRoute: '/',
    navValue: 0
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'CHANGE_ROUTE':
            return {
                ...state,
                currentRoute: action.newRoute
            }
        case 'CHANGE_VALUE':
            return {
                ...state,
                navValue: action.navValue
            }

        default:
            return state
    }
}

export default UserReducer