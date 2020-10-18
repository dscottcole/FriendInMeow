import React, { useEffect } from 'react';
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
import CatsBackButton from './Components/CatsBackButton';
import CatMap from './Components/CatMap'

import Home from './Containers/Home';
import BreedContainer from './Containers/BreedContainer';
import CatContainer from './Containers/CatContainer';
import OrgContainer from './Containers/OrgContainer';
import FaveContainer from './Containers/FaveContainer';
import Profile from './Containers/Profile';


// class App extends React.Component {

//   handleLogin = () => {
//     if (localStorage.getItem('auth_key')) {
//         this.props.set_isloggedin(true)
//     } else {
//         this.props.set_isloggedin(false)
//     }
// }

//   componentDidMount = () => {
//     this.getAdoptableKeys()
//     this.handleLogin()
//   }

//   getAdoptableKeys = () => {
//     fetch('http://localhost:3000/adoptable')
//     .then(res => res.json())
//     .then(obj => this.getAdoptableToken(obj.api_key, obj.secret_key))
//   }

//   getAdoptableToken = (apiKey, secretKey) => {
//     fetch("https://api.petfinder.com/v2/oauth2/token", {
//       method: "POST",
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`
//     })
//     .then(res => res.json())
//     .then(token => this.getAdoptableCatbreeds(token.access_token))
//   }

//   getAdoptableCatbreeds = (accessToken) => {

//     fetch('https://api.petfinder.com/v2/types/cat/breeds', {
//       method: "GET",
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//       }
//     })
//     .then(res => res.json())
//     .then(res => {

//       let adoptableBreedNames = []

//       res.breeds.forEach(cat => adoptableBreedNames = [...adoptableBreedNames, cat.name])

//       this.props.get_adoptable_breed_names(adoptableBreedNames)
//     })

//   }

//   render() {
//     return (
//       <BrowserRouter>
//         <Switch>
          
//           <div className="world">
//             <NavBar />

//           <div className="body-area">
//           <Route exact path="/">
//             <LocationForm />
//             <Home />
//           </Route>

//           <Route path="/breeds">
//             <LocationForm />
//             <BreedContainer />
//             <BreedPagination />
//           </Route>

//           <Route path="/adoptable">
//             <LocationForm />
//             <CatContainer />
//             <CatPagination />
//           </Route>

//           <Route path="/organizations">
//             <OrgContainer />
//           </Route>

//           <Route path="/favorites">
//             <FaveContainer />
//           </Route>

//           <Route path="/profile">
//             <Profile />
//           </Route>

//           <Route path="/login">
//             <Login handleLogin={this.handleLogin}/>
//           </Route>

//           <Route path="/signup">
//             <Signup />
//           </Route>

//           <Route path="/breedinfo">
//             <BreedShow />
//             <TraitTable />
//             <BreedChart />
//             <BreedsBackButton />
//           </Route>

//           <Route path="/catinfo">
//             <CatShow />
//             <CatsBackButton />
//           </Route>


//           <Route>
//               <Redirect to="/" />
//           </Route>

//           </div>
//           </div>

//         </Switch>
//       </BrowserRouter>
//     )
//   }
// }

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

  useEffect(() => {
    getAdoptableKeys()
    handleLogin()
  }
  , []);

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
        </Route>

        <Route path="/catinfo">
          <CatShow />
          <CatsBackButton />
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