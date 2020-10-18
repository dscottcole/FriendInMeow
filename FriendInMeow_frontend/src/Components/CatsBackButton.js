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

const CatsBackButton = (props) => {
  const classes = useStyles();

  return (
    <div className="cats-back-button">
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<ArrowBackIosOutlinedIcon />}
        onClick={() => {props.change_route('/adoptable')}}
      >
        View Adoptable Cats
      </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CatsBackButton);