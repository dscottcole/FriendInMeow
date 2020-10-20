import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  }
}));

const BreedsQueryButton = (props) => {
  const classes = useStyles();

  return (
    <div className="breeds-back-button">
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        endIcon={<ArrowForwardIosOutlinedIcon />}
        onClick={() => {props.set_filter_breed(props.clickedBreed.name); props.change_value(2); props.change_route('/adoptable')}}
      >
        {"Adoptable " + props.clickedBreed.name + "S"} 
      </Button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
      set_clicked_breed: (breed, imgUrl) => dispatch({ type: 'SET_CLICKED_BREED', clickedBreed: breed, clickedBreedImg: imgUrl }),
      change_value: (value) => dispatch({ type: 'CHANGE_VALUE', navValue: value }),
      set_filter_breed: (breed) => dispatch({ type: 'SET_FILTER_BREED', filterBreed: breed })
    }
}
  
const mapStateToProps = (state) => {
    return {
        ...state.catState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedsQueryButton);