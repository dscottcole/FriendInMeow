import React from 'react'
import { connect } from "react-redux";
 
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import OrganizationSection from './OrganizationSection';
import CatMap from './CatMap'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
    justify: 'center',
    alignItems: 'center',
    padding: theme.spacing[2]
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    textAlign: "center"
  }
}));

const CatShow = (props) => {
  const classes = useStyles();

  let cat = props.clickedCat

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>
        <Grid item xs={10}>
        <Typography className={classes.header} gutterBottom variant="h2" component="h2">
            {cat.name}
        </Typography>
        </Grid>
        <Grid item container justify="center" xs={9} >
          {cat.primary_photo_cropped !== null && cat.name !== undefined? <img src={cat.primary_photo_cropped.large} height='30%' width='30%'></img> : <img src={require('../Images/catfallback3.jpg')} height='30%' width='30%'></img>}
        </Grid>
        <div className="full-cat">
        <div className="cat-facts">
        <Grid item xs={4}>
            {cat.breeds !== null? <Typography variant="h6" component="h6">Breed Info:</Typography> : null}
            {cat.breeds.primary !== null? <ul>{"Primary Breed: " + cat.breeds.primary}</ul> : null}
            {cat.breeds.secondary !== null? <ul>{"Secondary Breed: " + cat.breeds.secondary}</ul> : null}
            {cat.breeds.mixed !== null? <ul>{"Mixed Breed: " + cat.breeds.mixed.toString()}</ul> : null}
            {cat.breeds.unknown !== null? <ul>{"Unknown Breed: " + cat.breeds.unknown.toString()}</ul> : null}
        </Grid>

        <Grid item xs={4}>
            {cat.colors.primary !== null? <Typography variant="h6" component="h6">Colors:</Typography> : null}
            {cat.colors.primary !== null? <ul>{"Primary Color: " + cat.colors.primary}</ul> : null}
            {cat.colors.secondary !== null? <ul>{"Secondary Color: " + cat.colors.secondary}</ul> : null}
        </Grid>

        <Grid item xs={4}>
            {cat.attributes !== null? <Typography variant="h6" component="h6">Attributes:</Typography> : null}
            {cat.attributes.spayed_neutered !== null? <ul>{"Spayed/Neutered: " + cat.attributes.spayed_neutered.toString()}</ul> : null}
            {cat.attributes.house_trained !== null? <ul>{"House Trained: " + cat.attributes.house_trained.toString()}</ul> : null}
            {cat.attributes.declawed !== null? <ul>{"Declawed: " + cat.attributes.declawed.toString()}</ul> : null}
            {cat.attributes.special_needs !== null? <ul>{"Special Needs: " + cat.attributes.special_needs.toString()}</ul> : null}
            {cat.attributes.shots_current !== null? <ul>{"Shots Current: " + cat.attributes.shots_current.toString()}</ul> : null}
        </Grid>
        </div>

        <div className="map-org">
            <div>
            <Grid item xs={12}>
                <CatMap />
            </Grid> 
            </div>
            <div>
            <Grid item xs={12}>
                <OrganizationSection />
            </Grid>
            </div>
        </div>
        </div>
      </Grid>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName })
    }
}
  
const mapStateToProps = (state) => {
    return {
        ...state.catState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatShow);