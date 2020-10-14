const initialState = {
    userCity: '',
    userState: '',
    userPostalCode: 0,
    userRadius: 100,
    isLoggedIn: false
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_USER_CITY':
            return {
                ...state,
                userCity: action.userCity
            }
        case 'SET_USER_STATE':
            return {
                ...state,
                userState: action.userState
            }
        case 'SET_USER_CODE':
            return {
                ...state,
                userPostalCode: action.userPostalCode
            }
        case 'SET_USER_RADIUS':
            return {
                ...state,
                userRadius: action.userRadius
            }
        case 'SET_STATUS':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }

        default:
            return state
    }
}

export default UserReducer