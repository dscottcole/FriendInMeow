const initialState = {
    breeds: [],
    breedNames: [],
    adoptableBreedNames: []
}

const CatReducer = (state = initialState, action) => {

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

export default CatReducer