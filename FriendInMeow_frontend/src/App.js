import React, { useEffect } from 'react';
import './App.css';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import NavBar2 from './Components/NavBar2';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CatPagination from './Components/CatPagination';
import BreedPagination from './Components/BreedPagination';
import LocationForm from './Components/LocationForm';
import BreedShow from './Components/BreedShow'
import CatShow from './Components/CatShow'
import BreedChart from './Components/BreedChart'
import TraitTable from './Components/TraitTable'
import BreedsBackButton from './Components/BreedsBackButton';
import CatsBackButton from './Components/CatsBackButton';
import FaveCatsBackButton from './Components/FaveCatsBackButton';
import CatsFaveButton from './Components/CatsFaveButton';
import ScrollToTop from './Components/ScrollToTop'

import Home from './Containers/Home';
import BreedContainer from './Containers/BreedContainer';
import CatContainer from './Containers/CatContainer';
import FaveContainer from './Containers/FaveContainer';
import Profile2 from './Containers/Profile2';
import BreedsQueryButton from './Components/BreedsQueryButton';

const App = (props) => {

  const handleLogin = () => {
    if (localStorage.getItem('auth_key')) {
        props.set_isloggedin(true)
    } else {
        props.set_isloggedin(false)
    }
  }

  const getAdoptableKeys = () => {
    fetch('http://localhost:3000/adoptable')
    .then(res => res.json())
    .then(obj => getAdoptableToken(obj.api_key, obj.secret_key))
  }

  const getAdoptableToken = (apiKey, secretKey) => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    })
    .then(res => res.json())
    .then(token => getAdoptableCatbreeds(token.access_token))
  }

  const getAdoptableCatbreeds = (accessToken) => {
    fetch('https://api.petfinder.com/v2/types/cat/breeds', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(res => res.json())
    .then(res => {
      let adoptableBreedNames = []
      res.breeds.forEach(cat => adoptableBreedNames = [...adoptableBreedNames, cat.name])
      props.get_adoptable_breed_names(adoptableBreedNames)
    })
  }

  const getFavoriteCats = () => {

    fetch('http://localhost:3000/cats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Key': localStorage.getItem('auth_key')
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.message === undefined && res.length > 0) {
        getAdoptableKeys2(res)
      }
    })
  }

  const getAdoptableKeys2 = (faveCatArray) => {
    fetch('http://localhost:3000/adoptable')
    .then(res => res.json())
    .then(obj => getAdoptableToken2(obj.api_key, obj.secret_key, faveCatArray))
  }

  const getAdoptableToken2 = (apiKey, secretKey, faveCatArray) => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    })
    .then(res => res.json())
    .then(token => setFavoriteCats(token.access_token, faveCatArray))
  }

  const setFavoriteCats = (accessToken, faveCatArray) => {

    let faves = []

    faveCatArray.map(cat => {
      fetch(`https://api.petfinder.com/v2/animals/${cat.petfinder_id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.animal.status !== "adopted") {
          let modifiedCat = {...res.animal, dbId: cat.id}
          faves = [...faves, modifiedCat]
          props.set_favorite_cats(faves)
        } else if (res.animal.status === "adopted") {
          alert(`${cat.name}, ${cat.petfinder_id} has been adopted`)

          fetch(`http://localhost:3000/cats/${cat.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Auth-Key': localStorage.getItem('auth_key')
            }
          })
          .then(res => res.json())
          .then(console.log)
        }
      })
    })
  }

  useEffect(() => {
    getAdoptableKeys()
    handleLogin()
  }
  , []);

  useEffect(() => {
    if (props.isLoggedIn === true) {
      getFavoriteCats()
    }
  }, [props.isLoggedIn]);

  return (
    <BrowserRouter>
      <Switch>
        
        <div className="world">
          <NavBar2 />

        <div className="body-area">
        <Route exact path="/">
          <Home />
          <ScrollToTop />
        </Route>

        <Route path="/breeds">
          <LocationForm />
          <BreedContainer />
          <BreedPagination />
        </Route>

        <Route path="/adoptable">
          <LocationForm />
          <CatContainer />
          <CatPagination />
        </Route>

        <Route path="/favorites">
          <FaveContainer />
        </Route>

        <Route path="/profile">
          <Profile2 />
        </Route>

        <Route path="/login">
          <Login handleLogin={handleLogin}/>
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/breedinfo">
          <BreedShow />
          <TraitTable />
          <BreedChart />
          <BreedsBackButton />
          {props.adoptableBreedNames.includes(props.clickedBreed.name) && props.clickedBreedTotalAdoptable > 0? 
            <BreedsQueryButton /> : null}
        </Route>

        <Route path="/catinfo">
          <CatShow />
          <CatsBackButton />
          <CatsFaveButton />
        </Route>

        <Route path="/faveinfo">
          <CatShow />
          <FaveCatsBackButton />
          <CatsFaveButton />
        </Route>

        <Route>
            <Redirect to="/" />
        </Route>

        </div>
        </div>

      </Switch>
    </BrowserRouter>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    set_isloggedin: (status) => dispatch({ type: 'SET_STATUS', isLoggedIn: status }),
    get_adoptable_breed_names: (adoptableBreedNames) => dispatch({ type: 'GET_ADOPTABLE_BREED_NAMES', adoptableBreedNames: adoptableBreedNames }),
    set_favorite_cats: (cats) => dispatch({ type: 'SET_FAVORITES', favoriteCats: cats })
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.catState,
    ...state.userState,
    isLoggedIn: state.userState.isLoggedIn
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);