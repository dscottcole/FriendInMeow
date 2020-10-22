import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  }
}));

const BreedsBackButton = (props) => {
  const classes = useStyles();

  return (
    <div className="breeds-back-button">
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<ArrowBackIosOutlinedIcon />}
        onClick={() => {props.set_clicked_breed({},''); props.change_route('/breeds')}}
      >
        Return To Breeds
      </Button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
      set_clicked_breed: (breed, imgUrl) => dispatch({ type: 'SET_CLICKED_BREED', clickedBreed: breed, clickedBreedImg: imgUrl })
    }
}
  
const mapStateToProps = (state) => {
    return {
        // ...state.catState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedsBackButton);