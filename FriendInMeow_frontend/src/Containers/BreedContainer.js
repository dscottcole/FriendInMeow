import React from 'react';
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

    }
}
  
  const mapStateToProps = (state) => {
    return {
      ...state.catState
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BreedContainer);