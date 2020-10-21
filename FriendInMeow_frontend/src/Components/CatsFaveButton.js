import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
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
          let modifiedCat = { ...catObj, dbId: res.id }
          let newFaves = [...props.favoriteCats, modifiedCat]
          props.set_favorite_cats(newFaves)
          // props.change_route('/adoptable')
        } else {
          alert(res.message)
        }
      })
  }

  const unfavoriteCat = (catObj) => {

    let unfavedCatId = props.favoriteCats.filter(faveCat => {
      if (faveCat.id === catObj.id) {
        return faveCat
      }
    })[0].dbId

    fetch(`http://localhost:3000/cats/${unfavedCatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          let newFaves = props.favoriteCats.filter(faveCat => {
            if (faveCat.id !== catObj.id) {
              return faveCat
            }
          })
          props.set_favorite_cats(newFaves)
        }
      })
  }

  let faveButton = (
    <div className="cats-back-button">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        endIcon={<FavoriteOutlinedIcon />}
        onClick={() => { favoriteCat(props.clickedCat); }}
      >
        {"Favorite " + props.clickedCat.name}
      </Button>
    </div>
  )

  let unfaveButton = (
    <div className="cats-back-button">
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        endIcon={<FavoriteBorderOutlinedIcon />}
        onClick={() => { unfavoriteCat(props.clickedCat); }}
      >
        {"Unfavorite " + props.clickedCat.name}
      </Button>
    </div>
  )

  return (
    props.favoriteCats.map(catInQuestion => catInQuestion.id).includes(props.clickedCat.id)? unfaveButton : faveButton
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