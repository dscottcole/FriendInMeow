const initialState = {
    breeds: [],
    breedNames: [],
    adoptableBreedNames: [],
    adoptableCats: [],
    adoptableCatsPage: 1,
    adoptableCatsPages: 0
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
        case 'SET_CATS':
            return {
                ...state,
                adoptableCats: action.adoptableCats
            }
        case 'SET_CATS_TOTAL':
            return {
                ...state,
                adoptableCatsTotal: action.adoptableCatsTotal
            }
        case 'SET_CATS_PAGE':
            return {
                ...state,
                adoptableCatsPage: action.adoptableCatsPage
            }
        case 'SET_CATS_PAGES':
            return {
                ...state,
                adoptableCatsPages: action.adoptableCatsPages
            }

        default:
            return state
    }
}

export default CatReducer