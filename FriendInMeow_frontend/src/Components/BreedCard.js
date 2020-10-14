import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 225,
    width: 350
  },
  dividerFullWidth: {
    margin: `10px`,
  }
});

const BreedCard = (props) => {
  const classes = useStyles();

  let [totalAdoptable, setTotalAdoptable] = useState(0)
  let [breedImg, setImg] = useState('')

  const getBreedsKey = () => {
    fetch('http://localhost:3000/breeds')
    .then(res => res.json())
    .then(obj => getBreedImage(obj.api_key))
  }

  const getBreedImage = (key) => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=1&breed_id=${props.breed.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key
        }
      })
      .then(res => res.json())
      .then(breed => setImg(breed[0].url))
  }

  const getAdoptableKeys = (breedName) => {
      if (props.adoptableBreedNames.includes(breedName)) {
        fetch('http://localhost:3000/adoptable')
        .then(res => res.json())
        .then(obj => getAdoptableToken(obj.api_key, obj.secret_key, breedName))    
      }
  }

  const getAdoptableToken = (apiKey, secretKey, breedName) => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    })
    .then(res => res.json())
    .then(token => {
        getAdoptableCats(token.access_token, breedName)
    })
  }

  const getAdoptableCats = (accessToken, breedName) => {
        let slug = ''

        if (props.userPostalCode.toString().length === 5) {
            slug = `&location=${props.userPostalCode}&breed=${breedName}`
        } else if (props.userPostalCode.toString().length < 5) {
            slug = `&breed=${breedName}`
        }


    fetch(`https://api.petfinder.com/v2/animals?type=cat${slug}`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(res => res.json())
    .then(res => {
     setTotalAdoptable(res.pagination.total_count)
    })
  }

  useEffect(() => {
    getBreedsKey()
    // getAdoptableKeys(props.breed.name)
  }, [props.breed, props.userPostalCode, props.userRadius])

  let breed = props.breed

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={breedImg}
          title={breed.id}
          onClick={() => getBreedsKey()}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {breed.name}
          </Typography>
          <Typography variant="body1" color="textPrimary" component="h6">
            {breed.temperament}
          </Typography>
          <Divider className={classes.dividerFullWidth} variant="fullWidth" />
          <Typography variant="subtitle2" color="textSecondary" component="p">
            {breed.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {props.userPostalCode.toString().length === 5? (`Locally Adoptable: ${totalAdoptable}`) : (`Total Adoptable: ${totalAdoptable}`)}
        </Button>
        <Button onClick={() => {props.set_clicked_breed(breed); props.change_route('/breedinfo')}} size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
      set_clicked_breed: (breed) => dispatch({ type: 'SET_CLICKED_BREED', clickedBreed: breed })
    }
}
  
const mapStateToProps = (state) => {
    return {
      ...state.catState,
      userPostalCode: state.userState.userPostalCode,
      userRadius: state.userState.userRadius
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BreedCard);