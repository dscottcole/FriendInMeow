import React from 'react';
import { connect } from 'react-redux';

import MyLocationIcon from '@material-ui/icons/MyLocation';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(2),
    verticalAlign: 'middle',
  },
}));

const radii = [
    {
      value: '100',
      label: '100mi',
    },
    {
      value: '200',
      label: '200mi',
    },
    {
      value: '300',
      label: '300mi',
    },
    {
      value: '400',
      label: '400mi',
    },
    {
        value: '500',
        label: '500mi',
      },
  ];

const LocationForm = (props) => {
  const classes = useStyles();

  const handleSelectChange = (event) => {
    props.set_radius(event.target.value);
  };

  const handleTextChange = (event) => {
      console.log(event.target.name)
      switch (event.target.name) {
        case 'userCity':
            props.set_city(event.target.value)
            break;
        case 'userState':
            props.set_state(event.target.value)
            break;
        case 'userPostalCode':
            props.set_postal_code(event.target.value)
            break;
        default:
            break;
      }
  }

  const getPosition = () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      alert("Sorry, Geolocation is not supported by this browser.");
    }
  }

  const posError = () => {

    navigator.permissions.query({name: 'geolocation'}).then( res => {
      if (res.state === 'denied') {
        alert('Enable location permissions for this website in your browser settings.')
      } else {
        alert('Unable to access your location. You can continue by typing location manually.')
      }
    })
  }

  const showPosition = (position) => {

    let lat = position.coords.latitude
    let long = position.coords.longitude

    convertToZip(lat,long)
  }

  const convertToZip = (lat, long) => {
    fetch('http://localhost:3000/googlemaps')
    .then(res => res.json())
    .then(obj => getZip(lat, long, obj.api_key))
  }

  const getZip = (lat, long, googleKey) => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${googleKey}`)
    .then(res => res.json())
    .then(address => setZip(address))
  }

  const setZip = (address) => {
    let city = address.results[5].address_components[2].short_name
    let state = address.results[5].address_components[4].short_name
    let postal = address.results[5].address_components[0].short_name
    let radius = props.userRadius

    // localStorage.setItem('userState', state)
    // localStorage.setItem('userCity', city)
    // localStorage.setItem('userPostalCode', postal)

    props.set_city(city)
    props.set_state(state)
    props.set_postal_code(postal)
    props.set_radius(radius)
  }

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<MyLocationIcon />}
        onClick={() => getPosition()}
      >Location</Button>
        
        <TextField id="outlined-basic" label="City" variant="outlined" onChange={handleTextChange} value={props.userCity} name="userCity"/>
        <TextField id="outlined-basic" label="State Abbreviation" variant="outlined" onChange={handleTextChange} value={props.userState} name="userState" />
        <TextField id="outlined-basic" label="Postal Code" variant="outlined" onChange={handleTextChange} value={props.userPostalCode} name="userPostalCode"/>
        
        <TextField
          id="outlined-select-radius"
          select
          label="Select"
          value={props.userRadius}
          onChange={handleSelectChange}
          helperText="Please select your search radius"
          variant="outlined"
        >
          {radii.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      set_city: (city) => dispatch({ type: 'SET_USER_CITY', userCity: city }),
      set_state: (state) => dispatch({ type: 'SET_USER_STATE', userState: state }),
      set_postal_code: (postalCode) => dispatch({ type: 'SET_USER_CODE', userPostalCode: postalCode }),
      set_radius: (radius) => dispatch({ type: 'SET_USER_RADIUS', userRadius: radius })
    }
}
  
const mapStateToProps = (state) => {
    return {
      ...state.userState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationForm)
