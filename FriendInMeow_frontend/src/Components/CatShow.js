import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import OrganizationSection from './OrganizationSection';
import CatMap from './CatMap'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'left',
    justify: 'center',
    alignItems: 'center'
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
          {cat.primary_photo_cropped !== null? <img src={cat.primary_photo_cropped.large} height='30%' width='30%'></img> : <img src={require('../Images/catfallback3.jpg')} height='30%' width='30%'></img>}
        </Grid>
        {/* <Grid item xs={9}>
        <Typography variant="h6" color="textPrimary" component="h6">
            {breed.temperament}
        </Typography>
        <Divider className={classes.dividerFullWidth} variant="fullWidth" />
        <Typography variant="body1" color="textPrimary" component="p">
            {breed.description}
        </Typography>
        <Divider className={classes.dividerFullWidth} variant="fullWidth" />
            {breed.alt_names !== "" ? altNames : null}
            {breed.cfa_url !== undefined? cfaUrl : null}
            {breed.wikipedia_url !== undefined? wikipediaUrl : null}
            {breed.vcahospitals_url !== undefined? vcaUrl : null}
        </Grid> */}
        <Grid className="cat-map" item xs={6}>
            <CatMap />
        </Grid>   
        <Grid item xs={6}>
            <OrganizationSection />
        </Grid>
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