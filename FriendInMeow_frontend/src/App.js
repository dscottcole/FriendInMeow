import React from 'react';
import './App.css';
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import NavBar from './Components/NavBar';
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

import Home from './Containers/Home';
import BreedContainer from './Containers/BreedContainer';
import CatContainer from './Containers/CatContainer';
import OrgContainer from './Containers/OrgContainer';
import FaveContainer from './Containers/FaveContainer';
import Profile from './Containers/Profile';


class App extends React.Component {

  handleLogin = () => {
    if (localStorage.getItem('auth_key')) {
        this.props.set_isloggedin(true)
    } else {
        this.props.set_isloggedin(false)
    }
}

  componentDidMount = () => {
    this.getAdoptableKeys()
    this.handleLogin()
  }

  // componentDidUpdate = () => {
  //   this.handleLogin()
  // }

  // getBreedsKey = () => {
  //   fetch('http://localhost:3000/breeds')
  //   .then(res => res.json())
  //   .then(obj => this.getBreeds(obj.api_key))
  // }

  // getBreeds = (key) => {
  //   fetch('https://api.thecatapi.com/v1/breeds', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'x-api-key': key
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(breeds => {

  //     let breedNames = []
  //     breeds.forEach(cat => breedNames = [...breedNames, cat.name])

  //     this.props.get_breeds(breeds)
  //     this.props.get_breed_names(breedNames)
  //   })
  // }

  getAdoptableKeys = () => {
    fetch('http://localhost:3000/adoptable')
    .then(res => res.json())
    .then(obj => this.getAdoptableToken(obj.api_key, obj.secret_key))
  }

  getAdoptableToken = (apiKey, secretKey) => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
    })
    .then(res => res.json())
    .then(token => this.getAdoptableCatbreeds(token.access_token))
    // .then(token => this.getAdoptableCats(token.access_token))
  }

  // getAdoptableCats = (accessToken) => {
  //   fetch('https://api.petfinder.com/v2/animals?type=cat', {
  //     method: "GET",
  //     headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accessToken}`
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(console.log)
  // }

  getAdoptableCatbreeds = (accessToken) => {
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

      this.props.get_adoptable_breed_names(adoptableBreedNames)
    })

  }

  // getGoogleKey = () => {
  //   fetch('http://localhost:3000/googlemaps')
  //   .then(res => res.json())
  //   .then(console.log)
  // }

  getPosition = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.posError);
    } else {
      alert("Sorry, Geolocation is not supported by this browser.");
    }
  }

  posError = () => {

    navigator.permissions.query({name: 'geolocation'}).then( res => {
      if (res.state === 'denied') {
        alert('Enable location permissions for this website in your browser settings.')
      } else {
        alert('Unable to access your location. You can continue by typing location manually.')
      }
    })
  }

  showPosition = (position) => {

    let lat = position.coords.latitude
    let long = position.coords.longitude

    this.convertToZip(lat,long)
  }

  convertToZip = (lat, long) => {
    fetch('http://localhost:3000/googlemaps')
    .then(res => res.json())
    .then(obj => this.getZip(lat, long, obj.api_key))
  }

  getZip = (lat, long, googleKey) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`)
    .then(res => res.json())
    .then(address => this.setZip(address))
  }

  setZip = (address) => {
    let state = address.results[5].address_components[4].short_name
    let city = address.results[5].address_components[2].short_name
    let postal = address.results[5].address_components[0].short_name

    localStorage.setItem('userState', state)
    localStorage.setItem('userCity', city)
    localStorage.setItem('userPostalCode', postal)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          
          <div className="world">
            <NavBar />

          <div className="body-area">
          <Route exact path="/">
            <LocationForm />
            <Home />
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

          <Route path="/organizations">
            <OrgContainer />
          </Route>

          <Route path="/favorites">
            <FaveContainer />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/login">
            <Login handleLogin={this.handleLogin}/>
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/breedinfo">
            <BreedShow />
            <TraitTable />
            <BreedChart />
            <BreedsBackButton />
          </Route>

          <Route path="/catinfo">
            <CatShow />
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    set_isloggedin: (status) => dispatch({ type: 'SET_STATUS', isLoggedIn: status }),
    get_adoptable_breed_names: (adoptableBreedNames) => dispatch({ type: 'GET_ADOPTABLE_BREED_NAMES', adoptableBreedNames: adoptableBreedNames })
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.catState,
    ...state.userState
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);