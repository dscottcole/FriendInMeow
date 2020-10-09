import React from 'react';
import './App.css';
import { connect } from "react-redux";


class App extends React.Component {

  componentDidMount = () => {
    this.getBreedsKey()
    this.getAdoptableKeys()
  }

  componentDidUpdate = (previousProps) => {
    if (previousProps !== this.props) {
    }
  }

  getBreedsKey = () => {
    fetch('http://localhost:3000/breeds')
    .then(res => res.json())
    .then(obj => this.getBreeds(obj.api_key))
  }

  getBreeds = (key) => {
    fetch('https://api.thecatapi.com/v1/breeds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key
      }
    })
    .then(res => res.json())
    .then(breeds => {

      let breedNames = []
      breeds.forEach(cat => breedNames = [...breedNames, cat.name])

      this.props.dispatch({ type: 'GET_BREEDS', breeds: breeds })
      this.props.dispatch({ type: 'GET_BREED_NAMES', breedNames: breedNames })
    })
  }

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

      this.props.dispatch({ type: 'GET_ADOPTABLE_BREED_NAMES', adoptableBreedNames: adoptableBreedNames })

    })

  }

  getGoogleKey = () => {
    fetch('http://localhost:3000/googlemaps')
    .then(res => res.json())
    .then(console.log)
  }

  getPosition = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.posError);
    } else {
      alert("Sorry, but Geolocation is not supported by this browser.");
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
      <div>
        <button onClick={() => this.getPosition()} > Get Location </button>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(App);