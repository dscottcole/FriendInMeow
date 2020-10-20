import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2)
  }
}));

const CatsFaveButton = (props) => {
  const classes = useStyles();

  const favoriteCat = (catObj) => {

    let faveCat = {
      "cat": {
        "name": catObj.name,
        "petfinder_id": catObj.id
      }
    }

    fetch('http://localhost:3000/cats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      },
      body: JSON.stringify(faveCat)
    })
    .then(res => res.json())
    .then(res => {
      if (res.id) {
        let modifiedCat = {...catObj, dbId: res.id}
        let newFaves = [...props.favoriteCats, modifiedCat]
        props.set_favorite_cats(newFaves)
        props.change_route('/adoptable')
      } else {
        alert(res.message)
      }
    })
  }

  return (
    <div className="cats-back-button">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        endIcon={<FavoriteOutlinedIcon />}
        onClick={() => {favoriteCat(props.clickedCat);}}
      >
        { "Favorite " + props.clickedCat.name }
      </Button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
      set_favorite_cats: (cats) => dispatch({ type: 'SET_FAVORITES', favoriteCats: cats })
    }
}
  
const mapStateToProps = (state) => {
    return {
        ...state.catState,
        favoriteCats: state.userState.favoriteCats
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatsFaveButton);