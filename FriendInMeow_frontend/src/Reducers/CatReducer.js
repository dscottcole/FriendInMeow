const initialState = {
    breeds: [],
    breedNames: [],
    adoptableBreedNames: [],
    adoptableCats: [],
    adoptableCatsPage: 1,
    adoptableCatsPages: 0,
    filteredAdoptableCats: [],
    breedsPage: 0,
    breedsPages: 0,
    clickedBreed: {},
    clickedBreedImg: '',
    clickedBreedTotalAdoptable: 0,
    clickedCat: {},
    clickedCatLoc: {},
    clickedCatLocated: false,
    clickedCatOrg: {},
    filterBreed: "",
    filterGender: "",
    filterAge: ""
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
        case 'SET_FILTERED_CATS':
            return {
                ...state,
                filteredAdoptableCats: action.filteredAdoptableCats
            }
        case 'SET_FILTER_BREED':
            return {
                ...state,
                filterBreed: action.filterBreed
            }
        case 'SET_FILTER_GENDER':
            return {
                ...state,
                filterGender: action.filterGender
            }
        case 'SET_FILTER_AGE':
            return {
                ...state,
                filterAge: action.filterAge
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
        case 'SET_BREEDS_PAGE':
            return {
                ...state,
                breedsPage: action.breedsPage
            }
        case 'SET_BREEDS_PAGES':
            return {
                ...state,
                breedsPages: action.breedsPages
            }
        case 'SET_CLICKED_BREED':
            return {
                ...state,
                clickedBreed: action.clickedBreed,
                clickedBreedImg: action.clickedBreedImg,
                clickedBreedTotalAdoptable: action.clickedBreedTotalAdoptable
            }
        case 'SET_CLICKED_CAT':
            return {
                ...state,
                clickedCat: action.clickedCat
            }
        case 'SET_CLICKED_CAT_LOC':
            return {
                ...state,
                clickedCatLoc: action.clickedCatLoc
            }
        case 'SET_CLICKED_CAT_LOCATED':
            return {
                ...state,
                clickedCatLocated: action.clickedCatLocated
            }
        case 'SET_CLICKED_CAT_ORG':
            return {
                ...state,
                clickedCatOrg: action.clickedCatOrg
            }

        default:
            return state
    }
}

export default CatReducer