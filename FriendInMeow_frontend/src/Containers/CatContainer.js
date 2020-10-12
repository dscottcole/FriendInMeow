import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import CatCard from '../Components/CatCard'

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
    padding: theme.spacing(20),
  },
}));

const CatContainer = (props) => {
    const spacing = 4
    const classes = useStyles();

    useEffect(() => {
        getAdoptableKeys()
    }, [props.adoptableCatsPage])

    useEffect(() => {
        getAdoptableKeys()
    }, [props.userPostalCode])

    useEffect(() => {
        getAdoptableKeys()
    }, [props.userRadius])



  const getAdoptableKeys = () => {
    fetch('http://localhost:3000/adoptable')
    .then(res => res.json())
    .then(obj => getAdoptableToken(obj.api_key, obj.secret_key))
  }

  const getAdoptableToken = (apiKey, secretKey) => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    })
    .then(res => res.json())
    .then(token => getAdoptableCats(token.access_token))
  }

  const getAdoptableCats = (accessToken) => {
    let catUrl = ''

    if (props.userPostalCode.toString().length < 5) {
        catUrl = `https://api.petfinder.com/v2/animals?type=cat&page=${props.adoptableCatsPage}`
    } else if (props.userPostalCode.toString().length === 5) {
        catUrl = `https://api.petfinder.com/v2/animals?type=cat&location=${props.userPostalCode}&distance=${props.userRadius}&page=${props.adoptableCatsPage}`
    }
    console.log(catUrl)
    fetch( catUrl, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(res => res.json())
    .then(res => {
        props.set_cats(res.animals)
        props.set_cats_total(res.pagination.total_count)
        props.set_cats_pages(res.pagination.total_pages)
    })
  }


  return (
    <Grid container className={classes.root} spacing={12}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
            {props.adoptableCats.map(cat => <Grid item>
                <CatCard
                    key={cat.id} 
                    cat={cat} 
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
        set_cats: (cats) => dispatch({ type: 'SET_CATS', adoptableCats: cats }),
        set_cats_total: (total) => dispatch({ type: 'SET_CATS_TOTAL', adoptableCatsTotal: total }),
        set_cats_pages: (number) => dispatch({ type: 'SET_CATS_PAGES', adoptableCatsPages: number })
    }
}
  
const mapStateToProps = (state) => {
    return {
      ...state.catState,
      userPostalCode: state.userState.userPostalCode,
      userRadius: state.userState.userRadius
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CatContainer);