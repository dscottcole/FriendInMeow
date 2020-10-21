const initialState = {
    userName: "",
    userLat: 0,
    userLong: 0,
    userCity: '',
    userState: '',
    userPostalCode: "",
    userRadius: 100,
    isLoggedIn: false,
    favoriteCats: []
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_USER_NAME':
            return {
                ...state,
                userName: action.userName
            }
        case 'SET_USER_LAT':
            return {
                ...state,
                userLat: action.userLat
            }
        case 'SET_USER_LONG':
            return {
                ...state,
                userLong: action.userLong
            }
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
        case 'SET_FAVORITES':
            return {
                ...state,
                favoriteCats: action.favoriteCats
            }
        

        default:
            return state
    }
}

export default UserReducer