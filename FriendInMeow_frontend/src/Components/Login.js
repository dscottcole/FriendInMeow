import React, { useState } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 300
        }
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const Login = (props) => {
    const classes = useStyles();

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    let [usernameE, setUsernameE] = useState('');
    let [passwordE, setPasswordE] = useState('');

    const handleFormChange = (e) => {

        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
        
            default:
                break;
        }
    }

    const clearState = () => {
        setUsername('')
        setPassword('')
    }

    const handleSubmit = () => {

        let user = {
            "username": username,
            "password": password
        }

        clearState()
        logIn(user)
    }

    const logIn = (user) => {
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(token => {
            if (token['auth_key']) {
                localStorage.setItem('auth_key', token['auth_key'])
                props.handleLogin()
                props.change_route("/")
            } else {
                setUsernameE(token.message)
                setPasswordE(token.message)
            }
        })
    }

    const usernameField = (
        <TextField
            // id="outlined-error-helper-text"
            label="Username"
            defaultValue={username}

            variant="outlined"
            name="username"
        />
    )

    const usernameFieldE = (
        <TextField
            error
            // id="outlined-error-helper-text"
            label="Username"
            defaultValue={username}
            // helperText={usernameE}
            variant="outlined"
            name="username"
        />
    )

    const passwordField = (
        <TextField
            // id="outlined-error-helper-text"
            label="Password"
            defaultValue={password}
            variant="outlined"
            name="password"
            type="password"
        />
    )

    const passwordFieldE = (
        <TextField
            error
            // id="outlined-error-helper-text"
            label="Password"
            defaultValue={password}
            helperText={passwordE}
            variant="outlined"
            name="password"
            type="password"
        />
    )

  return (
    <form onChange={handleFormChange} className={classes.root} noValidate autoComplete="on">
        <div>
                {usernameE === ''? usernameField : usernameFieldE}
        </div>
        <div>
                {passwordE === ''? passwordField : passwordFieldE}
        </div>
        <div className={classes.button}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Login
            </Button>
        </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      set_isloggedin: (status) => dispatch({ type: 'SET_STATUS', isLoggedIn: status }),
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName })
    }
}
  
  const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.userState.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)