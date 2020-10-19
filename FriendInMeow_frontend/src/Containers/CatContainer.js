import React, { useEffect } from 'react';
import { connect } from "react-redux";
import CatCard from '../Components/CatCard'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CatFilter from '../Components/CatFilter';
import Typography from '@material-ui/core/Typography';

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

  const clearClickedCat = () => {
    if (props.clickedCat.name !== undefined) {
      props.set_clicked_cat({})
      props.set_clicked_cat_loc({})
      props.set_clicked_cat_located(false)
      props.set_clicked_cat_org({})
      props.set_clicked_cat_place_id('')
    }
  }

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
      catUrl = `https://api.petfinder.com/v2/animals?type=cat&page=${props.adoptableCatsPage}&breed=${props.filterBreed}&gender=${props.filterGender}&age=${props.filterAge}`
    } else if (props.userPostalCode.toString().length === 5) {
      catUrl = `https://api.petfinder.com/v2/animals?type=cat&sort=distance&location=${props.userPostalCode}&distance=${props.userRadius}&breed=${props.filterBreed}&gender=${props.filterGender}&age=${props.filterAge}&page=${props.adoptableCatsPage}`
    }
    console.log(catUrl)
    fetch(catUrl, {
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

  useEffect(() => {
    clearClickedCat()
    props.change_route("/adoptable")
  }, [])

  useEffect(() => {
    getAdoptableKeys()
  }, [props.adoptableCatsPage, props.userPostalCode, props.userRadius, props.filterBreed, props.filterGender, props.filterAge])

  const catCards = (
    props.adoptableCats.map(cat => <Grid item>
      <CatCard
        key={cat.id}
        cat={cat}
        className={classes.paper}
      />
    </Grid>)
  )

  const noCats = (
    <Typography className="no-cats" variant="body2" color="textPrimary" component="p">
      Please widen your search criteria.
    </Typography>
  )

  return (
    <div className="filter-adoptable">
      <CatFilter />
      <Grid container className={classes.root} spacing={12}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {props.adoptableCats.length > 0? catCards : noCats}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return {
    set_cats: (cats) => dispatch({ type: 'SET_CATS', adoptableCats: cats }),
    set_cats_total: (total) => dispatch({ type: 'SET_CATS_TOTAL', adoptableCatsTotal: total }),
    set_cats_pages: (number) => dispatch({ type: 'SET_CATS_PAGES', adoptableCatsPages: number }),
    set_clicked_cat: (cat) => dispatch({ type: 'SET_CLICKED_CAT', clickedCat: cat }),
    set_clicked_cat_loc: (loc) => dispatch({ type: 'SET_CLICKED_CAT_LOC', clickedCatLoc: loc }),
    set_clicked_cat_place_id: (placeId) => dispatch({ type: 'SET_CLICKED_CAT_PLACE_ID', clickedCatPlaceId: placeId }),
    set_clicked_cat_org: (org) => dispatch({ type: 'SET_CLICKED_CAT_ORG', clickedCatOrg: org }),
    set_clicked_cat_located: (status) => dispatch({ type: 'SET_CLICKED_CAT_LOCATED', clickedCatLocated: status }),
    change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName })
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