const initialState = {
    currentRoute: '/'
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'CHANGE_ROUTE':
            return {
                ...state,
                currentRoute: action.newRoute
            }

        default:
            return state
    }
}

export default UserReducer