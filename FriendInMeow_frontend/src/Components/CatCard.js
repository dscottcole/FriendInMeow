import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, pink } from '@material-ui/core/colors';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from "@material-ui/core/Button";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    minWidth: 350,
    minHeight: 600
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatarF: {
    backgroundColor: pink[500],
  },
  avatarM: {
    backgroundColor: blue[500],
  },
}));

const CatCard = (props) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let cat = props.cat

  let femaleAvatar = (
    <Avatar aria-label="gender" className={classes.avatarF}>
      {cat.gender[0]}
    </Avatar>
  )

  let maleAvatar = (
    <Avatar aria-label="gender" className={classes.avatarM}>
      {cat.gender[0]}
    </Avatar>
  )

  const getAdoptableKeys = (catObj, orgUrl) => {
    props.set_clicked_cat(catObj)

    fetch('http://localhost:3000/adoptable')
      .then(res => res.json())
      .then(obj => getAdoptableToken(obj.api_key, obj.secret_key, catObj, orgUrl))
  }

  const getAdoptableToken = (apiKey, secretKey, catObj, orgUrl) => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    })
      .then(res => res.json())
      .then(token => getOrgInfo(token.access_token, catObj, orgUrl))
  }

  const getOrgInfo = (accessToken, catObj, orgUrl) => {
    fetch(`https://api.petfinder.com${orgUrl}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(res => res.json())
      .then(res => {

        getGoogleKey(catObj, res.organization)
        props.set_clicked_cat_org(res.organization)
      })
  }

  const getGoogleKey = (catObj, catOrg) => {
    fetch('http://localhost:3000/googlemaps')
      .then(res => res.json())
      .then(obj => getGoogleAddress(catObj, catOrg, obj.api_key))
  }

  const getGoogleAddress = (catObj, catOrg, googleKey) => {

    if (catObj.contact.address.address1 !== null && catObj.contact.address.city !== null && catObj.contact.address.state !== null) {
      let address = catObj.contact.address.address1.split(' ').join('+')
      let city = catObj.contact.address.city.split(' ').join('+')
      let state = catObj.contact.address.state

      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${address},+${city},+${state}&key=${googleKey}`

      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (res.status !== "ZERO_RESULTS") {
            getCatCoords(res.results)
          } else {
            props.change_route('/catinfo')
          }
        })
    } else if (catOrg.address.address1 !== null && catOrg.address.city !== null && catOrg.address.state !== null) {
      let address = catOrg.address.address1.split(' ').join('+')
      let city = catOrg.address.city.split(' ').join('+')
      let state = catOrg.address.state

      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${address},+${city},+${state}&key=${googleKey}`

      fetch(url)
        .then(res => res.json())
        .then(res => {
          if (res.status !== "ZERO_RESULTS") {
            getCatCoords(res.results)
          } else {
            props.change_route('/catinfo')
          }
        })
    } else {
      props.change_route('/catinfo')
    }

  }

  const getCatCoords = (googleRes) => {
    let location = googleRes[0].geometry.location
    let placeId = googleRes[0].place_id

    props.set_clicked_cat_located(true)
    props.set_clicked_cat_loc(location)
    props.set_clicked_cat_place_id(placeId)

    props.change_route('/catinfo')
  }

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
        setFavorite(true)
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
        setFavorite(false)

        let newFaves = props.favoriteCats.filter(faveCat => {
          if (faveCat.id !== catObj.id) {
            return faveCat
          }
        })
        props.set_favorite_cats(newFaves)
      }
    })
  }

  useEffect(() => {
    if (props.favoriteCats.map(faveCat => faveCat.id).includes(cat.id)) {
      setFavorite(true)
    }
  }, []);

  const notFave = (
    <IconButton onClick={() => favoriteCat(cat)} color="primary" aria-label="add to favorites">
      <FavoriteBorderOutlinedIcon fontSize="large" />
    </IconButton>
  )

  const yesFave = (
    <IconButton onClick={() => unfavoriteCat(cat)} color="secondary" aria-label="add to favorites">
      <FavoriteOutlinedIcon fontSize="large" />
    </IconButton>
  )

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          cat.gender === 'Female' ? femaleAvatar : maleAvatar
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={cat.name}
        subheader={"Age: " + cat.age}
      />
      <CardMedia
        className={classes.media}
        image={cat.primary_photo_cropped !== null ? cat.primary_photo_cropped['small'] : require('../Images/catfallback3.jpg')}
        title={cat.id}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {cat.size !== null ? `Size: ${cat.size}` : null}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          {cat.distance !== null ? `Distance: ${Math.floor(cat.distance)} miles` : null}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {favorite === false ? notFave : yesFave}
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          endIcon={<ArrowForwardIosOutlinedIcon />}
          onClick={() => { getAdoptableKeys(cat, cat._links.organization.href) }}
        >
          More Info
        </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          color="primary"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>

          {cat.breeds !== null ? <Typography variant="h6" component="h6">Breed Info:</Typography> : null}
          {cat.breeds.primary !== null ? <ul>{"Primary Breed: " + cat.breeds.primary}</ul> : null}
          {cat.breeds.secondary !== null ? <ul>{"Secondary Breed: " + cat.breeds.secondary}</ul> : null}
          {cat.breeds.mixed !== null ? <ul>{"Mixed Breed: " + cat.breeds.mixed.toString()}</ul> : null}
          {cat.breeds.unknown !== null ? <ul>{"Unknown Breed: " + cat.breeds.unknown.toString()}</ul> : null}

          {cat.colors.primary !== null ? <Typography variant="h6" component="h6">Colors:</Typography> : null}
          {cat.colors.primary !== null ? <ul>{"Primary Color: " + cat.colors.primary}</ul> : null}
          {cat.colors.secondary !== null ? <ul>{"Secondary Color: " + cat.colors.secondary}</ul> : null}

          {cat.attributes !== null ? <Typography variant="h6" component="h6">Attributes:</Typography> : null}
          {cat.attributes.spayed_neutered !== null ? <ul>{"Spayed/Neutered: " + cat.attributes.spayed_neutered.toString()}</ul> : null}
          {cat.attributes.house_trained !== null ? <ul>{"House Trained: " + cat.attributes.house_trained.toString()}</ul> : null}
          {cat.attributes.declawed !== null ? <ul>{"Declawed: " + cat.attributes.declawed.toString()}</ul> : null}
          {cat.attributes.special_needs !== null ? <ul>{"Special Needs: " + cat.attributes.special_needs.toString()}</ul> : null}
          {cat.attributes.shots_current !== null ? <ul>{"Shots Current: " + cat.attributes.shots_current.toString()}</ul> : null}


        </CardContent>
      </Collapse>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
    set_clicked_cat: (cat) => dispatch({ type: 'SET_CLICKED_CAT', clickedCat: cat }),
    set_clicked_cat_loc: (loc) => dispatch({ type: 'SET_CLICKED_CAT_LOC', clickedCatLoc: loc }),
    set_clicked_cat_place_id: (placeId) => dispatch({ type: 'SET_CLICKED_CAT_PLACE_ID', clickedCatPlaceId: placeId }),
    set_clicked_cat_org: (org) => dispatch({ type: 'SET_CLICKED_CAT_ORG', clickedCatOrg: org }),
    set_clicked_cat_located: (status) => dispatch({ type: 'SET_CLICKED_CAT_LOCATED', clickedCatLocated: status }),
    set_favorite_cats: (cats) => dispatch({ type: 'SET_FAVORITES', favoriteCats: cats })

  }
}

const mapStateToProps = (state) => {
  return {
    ...state.catState,
    favoriteCats: state.userState.favoriteCats
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatCard);