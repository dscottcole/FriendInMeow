import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import BreedCard from '../Components/BreedCard'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(12),
  },
}));

const BreedContainer = (props) => {
    const spacing = 4
    const classes = useStyles();
    const breedLimit = 20

    const getBreedsKey = () => {
        fetch('http://localhost:3000/breeds')
        .then(res => res.json())
        .then(obj => {
            getBreeds(obj.api_key)
            getBreedsPaginated(obj.api_key)
        })
    }
    
    const getBreeds = (key) => {
        fetch('https://api.thecatapi.com/v1/breeds', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': key
        }
        })
        .then(res => res.json())
        .then(breeds => {

            props.set_breeds_pages(Math.ceil(breeds.length/breedLimit))

    
            let breedNames = []
            breeds.forEach(cat => breedNames = [...breedNames, cat.name])
            
            props.get_breed_names(breedNames)
        })
    }
    
    const getBreedsPaginated = (key) => {

        console.log('damn')

        fetch(`https://api.thecatapi.com/v1/breeds?limit=${breedLimit}&page=${props.breedsPage}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': key
          }
        })
        .then(res => res.json())
        .then(breeds => {
    
          let breedNames = []
          breeds.forEach(cat => breedNames = [...breedNames, cat.name])
    
          props.set_breeds(breeds)
        })
    }

    const clearClickedBreed = () => {
      if (props.clickedBreed !== undefined) {
        props.set_clicked_breed({}, "", 0)
      }
    }
  
    useEffect(() => {
        getBreedsKey()
        clearClickedBreed()
        props.change_route('/breeds')
    }, [ , props.breedsPage])

    return (
        <Grid container className={classes.root} spacing={10}>
        <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
                {props.breeds.map(breed => <Grid item>
                    <BreedCard 
                        key={breed.id} 
                        breed={breed} 
                        className={classes.paper}
                    />
                </Grid>)}
            </Grid>
        </Grid>
        </Grid>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_breeds: (breeds) => dispatch({ type: 'GET_BREEDS', breeds: breeds }),
        get_breed_names: (breedNames) => dispatch({ type: 'GET_BREED_NAMES', breedNames: breedNames }),
        set_breeds_pages: (number) => dispatch({ type: 'SET_BREEDS_PAGES', breedsPages: number }),
        set_clicked_breed: (breed, imgUrl, total) => dispatch({ type: 'SET_CLICKED_BREED', clickedBreed: breed, clickedBreedImg: imgUrl , clickedBreedTotalAdoptable: total}),
        change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
    }
}
  
  const mapStateToProps = (state) => {
    return {
      ...state.catState
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BreedContainer);