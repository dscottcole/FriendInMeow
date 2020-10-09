import { createStore } from 'redux';


const initialState = {
    breeds: [],
    breedNames: [],
    adoptableBreedNames: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_BREEDS':
            return {
                ...state, 
                breeds: action.breeds
            }

        case 'GET_BREED_NAMES':
            return {
                ...state, 
                breedNames: action.breedNames
            }
        
        case 'GET_ADOPTABLE_BREED_NAMES':
            return {
                ...state,
                adoptableBreedNames: action.adoptableBreedNames
            }

        default:
            return state
    }
}

const Store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default Store