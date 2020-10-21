import React, { useState } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault()

        let user = {
            "username": username,
            "password": password
        }

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
                    clearState()
                    localStorage.setItem('auth_key', token['auth_key'])
                    setOpen(true)
                    props.set_user_name(token.name)
                    props.handleLogin()
                    setTimeout(() => {
                        props.change_value(0)
                        props.change_route("/")
                    }, 1000);
                } else {
                    setUsernameE(token.message)
                    setPasswordE(token.message)
                }
            })
    }

    const usernameField = (
        <TextField
            label="Username"
            defaultValue={username}
            variant="outlined"
            name="username"
        />
    )

    const usernameFieldE = (
        <TextField
            error
            label="Username"
            defaultValue={username}
            variant="outlined"
            name="username"
        />
    )

    const passwordField = (
        <TextField
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
            label="Password"
            defaultValue={password}
            helperText={passwordE}
            variant="outlined"
            name="password"
            type="password"
        />
    )

    return (
        <div className="login-form">
            <form onChange={handleFormChange} onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="on">
                <div>
                    {usernameE === '' ? usernameField : usernameFieldE}
                </div>
                <div>
                    {passwordE === '' ? passwordField : passwordFieldE}
                </div>
                <div className={classes.button}>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Welcome to FriendInMeow!
                    </Alert>
            </Snackbar>
        </div>

    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_isloggedin: (status) => dispatch({ type: 'SET_STATUS', isLoggedIn: status }),
        set_user_name: (name) => dispatch({ type: 'SET_USER_NAME', userName: name }),
        change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
        change_value: (value) => dispatch({ type: 'CHANGE_VALUE', navValue: value }),
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.userState.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)