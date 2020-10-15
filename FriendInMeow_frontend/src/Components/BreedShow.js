import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

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

const BreedShow = (props) => {
  const classes = useStyles();

  let breed = props.clickedBreed

  let altNames = (
      <div>
            <Typography variant="body1" color="textPrimary" component="p">
                {`Alternative Breed Names: ${breed.alt_names}`}
            </Typography>
        <Divider className={classes.dividerFullWidth} variant="fullWidth" />
      </div>
  )

  let cfaUrl = (
    <Typography className={classes.root}>
        <Link href={breed.cfa_url} variant="body2">
            {`${breed.name} at Cat Fanciers' Association`}
        </Link>
    </Typography>
  )

  let wikipediaUrl = (
    <Typography className={classes.root}>
        <Link href={breed.wikipedia_url} variant="body2">
            {`${breed.name} on Wikipedia`}
        </Link>
    </Typography>
  )

  let vcaUrl = (
    <Typography className={classes.root}>
        <Link href={breed.vcahospitals_url} variant="body2">
            {`${breed.name} on vcaHospitals`}
        </Link>
    </Typography>
  )

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>
        <Grid item xs={10}>
        <Typography className={classes.header} gutterBottom variant="h2" component="h2">
            {breed.name}
        </Typography>
        </Grid>
        <Grid item container justify="center" xs={9} >
          <img src={props.clickedBreedImg} height='30%' width='30%'></img>
        </Grid>
        <Grid item xs={9}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BreedShow);