import React, { useEffect } from 'react'
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import OrganizationSection from './OrganizationSection';
import CatMap from './CatMap'

import CatsBackButton from '../Components/CatsBackButton';
import CatsFaveButton from '../Components/CatsFaveButton';

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

  useEffect(() => {
    if (cat === undefined) {
      props.change_route("/adoptable")
    }
  }, [])

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container spacing={3}>
        <div className="full-cat">
          <div className="cat-name">
            <Typography className={classes.header} gutterBottom variant="h2" component="h2">
              {cat.name}
            </Typography>
          </div>
          <div className="pic-facts">
            <div className="pic-area">
              {cat.primary_photo_cropped !== null && cat.name !== undefined ? <img className="cat-show-pic" src={cat.primary_photo_cropped.large} alt="AdoptablecatPic" ></img> : <img className="cat-show-pic" src={require('../Images/catfallback3.jpg')} alt="FallBackImg" ></img>}
            </div>
            <div className="cat-facts">
              <div>
                {cat.breeds !== undefined && cat.breeds !== null ? <Typography variant="h6" component="h6">Breed & Appearance:</Typography> : null}
                {cat.breeds !== undefined && cat.breeds.primary !== null ? <ul>{"Primary Breed: " + cat.breeds.primary}</ul> : null}
                {cat.breeds !== undefined && cat.breeds.secondary !== null ? <ul>{"Secondary Breed: " + cat.breeds.secondary}</ul> : null}
                {cat.breeds !== undefined && cat.breeds.mixed !== null ? <ul>{"Mixed Breed: " + cat.breeds.mixed.toString()}</ul> : null}
                {cat.breeds !== undefined && cat.breeds.unknown !== null ? <ul>{"Unknown Breed: " + cat.breeds.unknown.toString()}</ul> : null}
                {cat.colors !== undefined && cat.colors.primary !== null ? <ul>{"Primary Color: " + cat.colors.primary}</ul> : null}
                {cat.colors !== undefined && cat.colors.secondary !== null ? <ul>{"Secondary Color: " + cat.colors.secondary}</ul> : null}
                {cat.coat !== null && cat.coat !== undefined ? <ul>{"Coat Type: " + cat.coat}</ul> : null}
              </div>
              <div>
                {cat.attributes !== undefined && cat.attributes !== null ? <Typography variant="h6" component="h6">Attributes:</Typography> : null}
                {cat.attributes !== undefined && cat.attributes.spayed_neutered !== null ? <ul>{"Spayed/Neutered: " + cat.attributes.spayed_neutered.toString()}</ul> : null}
                {cat.attributes !== undefined && cat.attributes.house_trained !== null ? <ul>{"House Trained: " + cat.attributes.house_trained.toString()}</ul> : null}
                {cat.attributes !== undefined && cat.attributes.declawed !== null ? <ul>{"Declawed: " + cat.attributes.declawed.toString()}</ul> : null}
                {cat.attributes !== undefined && cat.attributes.special_needs !== null ? <ul>{"Special Needs: " + cat.attributes.special_needs.toString()}</ul> : null}
                {cat.attributes !== undefined && cat.attributes.shots_current !== null ? <ul>{"Shots Current: " + cat.attributes.shots_current.toString()}</ul> : null}
              </div>
            </div>
          </div>

          <div className="map-org">
            <div>
              <CatMap />
            </div>
            <div>
              <OrganizationSection />
            </div>
          </div>
          <div className="cat-show-buttons">
          <CatsBackButton />
          <CatsFaveButton />
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
    clickedCat: state.catState.clickedCat
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatShow);