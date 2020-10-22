import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const CatFilter = (props) => {

    let [breedOptions, setBreedOptions] = useState([])

    let genderOptions = [
        {
            value: "",
            label: "No Filter"
        },
        {
            value: "female",
            label: "Female"
        },
        {
            value: "male",
            label: "Male"
        }
    ]

    let ageOptions = [
        {
            value: "",
            label: "No Filter"
        },
        {
            value: "baby",
            label: "Baby"
        },
        {
            value: "young",
            label: "Young"
        },
        {
            value: "adult",
            label: "Adult"
        },
        {
            value: "senior",
            label: "Senior"
        },
    ]

    const buildBreedOptions = () => {
        if (props.adoptableBreedNames.length > 0) {
            let allValues = [{ value: "", label: "No Filter" }]
            props.adoptableBreedNames.map(catName => {
                allValues = [...allValues, { value: catName, label: catName }]
            })
            setBreedOptions(allValues)
        }
    }

    const handleSelectChange = (event) => {
        switch (event.target.name) {
            case "breedFilter":
                props.set_filter_breed(event.target.value)
                break;
            case "genderFilter":
                props.set_filter_gender(event.target.value)
                break;
            case "ageFilter":
                props.set_filter_age(event.target.value)
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        buildBreedOptions()
    }, [props.adoptableBreedNames])

    return (
        <div className="cat-filter">
            <TextField
                id="outlined-select-radius"
                select
                label="Breed"
                name="breedFilter"
                value={props.filterBreed}
                onChange={handleSelectChange}
                variant="outlined"
                className="input-field" 
            >
                {breedOptions.length > 0 ? (
                    breedOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                ) : null}
            </TextField>
            <TextField
                id="outlined-select-radius"
                select
                label="Gender"
                name="genderFilter"
                value={props.filterGender}
                onChange={handleSelectChange}
                variant="outlined"
                className="input-field" 
            >   {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
            <TextField
                id="outlined-select-radius"
                select
                label="Age"
                name="ageFilter"
                value={props.filterAge}
                onChange={handleSelectChange}
                variant="outlined"
                className="input-field" 
            >   {ageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
        set_filtered_status: (status) => dispatch({ type: 'SET_FILTERED_STATUS', isFiltered: status }),
        set_filtered_cats: (cats) => dispatch({ type: 'SET_FILTERED_CATS', filteredAdoptableCats: cats }),
        set_filter_breed: (breed) => dispatch({ type: 'SET_FILTER_BREED', filterBreed: breed }),
        set_filter_gender: (gender) => dispatch({ type: 'SET_FILTER_GENDER', filterGender: gender }),
        set_filter_age: (age) => dispatch({ type: 'SET_FILTER_AGE', filterAge: age })
    }
}

const mapStateToProps = (state) => {
    return {
        filterBreed: state.catState.filterBreed,
        filterGender: state.catState.filterGender,
        filterAge: state.catState.filterAge,
        adoptableBreedNames: state.catState.adoptableBreedNames
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatFilter);