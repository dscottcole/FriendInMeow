const initialState = {
    test: ''
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'TEST_USER':
            return {
                ...state,
                test: action.testString
            }

        default:
            return state
    }
}

export default UserReducer