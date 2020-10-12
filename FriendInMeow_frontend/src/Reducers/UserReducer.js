const initialState = {
    userCity: '',
    userState: '',
    userPostalCode: 0,
    userRadius: 100
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

        default:
            return state
    }
}

export default UserReducer