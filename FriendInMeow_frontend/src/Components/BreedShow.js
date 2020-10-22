import React, { useEffect } from 'react'
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

import BreedChart from '../Components/BreedChart'
import TraitTable from '../Components/TraitTable'
import BreedsBackButton from '../Components/BreedsBackButton';
import BreedsQueryButton from '../Components/BreedsQueryButton';

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

  useEffect(() => {
    if (breed === undefined) {
      props.change_route("/breeds")
    }
  }, [])

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
    <div className="full-breed">
      <div className={classes.root}>
        <Grid className={classes.container} container spacing={3}>
          <div className="breed-name-pic">
            <Typography className={classes.header} gutterBottom variant="h2" component="h2">
              {breed.name}
            </Typography>
            <img className="breed-show-pic" src={props.clickedBreedImg} alt="BreedImg" ></img>
          </div>
          <div className="breed-info">
            <Typography variant="h6" color="textPrimary" component="h6">
              {breed.temperament}
            </Typography>
            <Divider className={classes.dividerFullWidth} variant="fullWidth" />
            <Typography variant="body1" color="textPrimary" component="p">
              {breed.description}
            </Typography>
            <Divider className={classes.dividerFullWidth} variant="fullWidth" />
            {breed.alt_names !== "" ? altNames : null}
            {breed.cfa_url !== undefined ? cfaUrl : null}
            {breed.wikipedia_url !== undefined ? wikipediaUrl : null}
            {breed.vcahospitals_url !== undefined ? vcaUrl : null}
          </div>
        </Grid>
        <TraitTable />
        <BreedChart />
        <div className="breed-show-buttons">
          <BreedsBackButton />
          {props.adoptableBreedNames.includes(props.clickedBreed.name) && props.clickedBreedTotalAdoptable > 0 ?
            <BreedsQueryButton /> : null}
        </div>
      </div>
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
    clickedBreed: state.catState.clickedBreed,
    clickedBreedImg: state.catState.clickedBreedImg,
    clickedBreedTotalAdoptable: state.catState.clickedBreedTotalAdoptable,
    adoptableBreedNames: state.catState.adoptableBreedNames
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedShow);