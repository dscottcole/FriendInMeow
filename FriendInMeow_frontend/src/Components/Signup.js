import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

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

const Signup = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    let [username, setUsername] = useState('');
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [password_confirmation, setPasswordConfirmation] = useState('');

    let [usernameE, setUsernameE] = useState('');
    let [nameE, setNameE] = useState('');
    let [emailE, setEmailE] = useState('');
    let [passwordE, setPasswordE] = useState('');
    let [password_confirmationE, setPasswordConfirmationE] = useState('');

    const handleFormChange = (e) => {

        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'name':
                setName(e.target.value)
                break;
            case 'email':
                setEmail(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            case 'password_confirmation':
                setPasswordConfirmation(e.target.value)
                break;

            default:
                break;
        }
    }

    const clearState = () => {
        setUsername('')
        setName('');
        setEmail('');
        setPassword('');
        setPasswordConfirmation('');
        setUsernameE('')
        setNameE('');
        setEmailE('');
        setPasswordE('');
        setPasswordConfirmationE('');
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let newUser = {
            "user": {
                "username": username,
                "name": name,
                "email": email,
                "password": password,
                "password_confirmation": password_confirmation
            }
        }

        signUp(newUser)
    }

    const signUp = (newUser) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(res => {
                if (res['message']) {
                    let username_e = ''
                    let name_e = ''
                    let email_e = ''
                    let password_e = ''
                    let password_confirmation_e = ''

                    res.message.forEach(error => {
                        switch (error[0]) {
                            case "username":
                                username_e = error[0] + " " + error[1]
                                break;
                            case "name":
                                name_e = error[0] + " " + error[1]
                                break;
                            case "email":
                                email_e = error[0] + " " + error[1]
                                break;
                            case "password":
                                if (error[1].length === 2) {
                                    password_e = error[0] + " " + error[1].join(" & ")
                                } else {
                                    password_e = error[0] + " " + error[1]
                                }
                                break;
                            case "password_confirmation":
                                password_confirmation_e = error[0] + " " + error[1]
                                break;
                            default:
                                break;
                        }
                    })

                    setUsernameE(username_e);
                    setNameE(name_e);
                    setEmailE(email_e);
                    setPasswordE(password_e);
                    setPasswordConfirmationE(password_confirmation_e);


                } else {
                    clearState()
                    setOpen(true)
                    setTimeout(() => {
                        props.change_value(3)
                        props.change_route("/login")
                    }, 1000);
                }
            })
    }

    const usernameField = (
        <TextField
            label="Username"
            defaultValue={username}
            variant="outlined"
            name="username"
            className="input-field"
        />
    )

    const usernameFieldE = (
        <TextField
            error
            label="Username"
            defaultValue={username}
            helperText={usernameE}
            variant="outlined"
            name="username"
            className="input-field"
        />
    )

    const nameField = (
        <TextField
            label="Full Name"
            defaultValue={name}
            variant="outlined"
            name="name"
            className="input-field"
        />
    )

    const nameFieldE = (
        <TextField
            error
            label="Full Name"
            defaultValue={name}
            helperText={nameE}
            variant="outlined"
            name="name"
            className="input-field"
        />
    )

    const emailField = (
        <TextField
            label="Email"
            defaultValue={email}
            variant="outlined"
            name="email"
            className="input-field"
        />
    )

    const emailFieldE = (
        <TextField
            error
            label="Email"
            defaultValue={email}
            helperText={emailE}
            variant="outlined"
            name="email"
            className="input-field"
        />
    )

    const passwordField = (
        <TextField
            label="Password"
            defaultValue={password}
            variant="outlined"
            name="password"
            type="password"
            className="input-field"
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
            className="input-field"
        />
    )

    const password_confirmationField = (
        <TextField
            label="Password Confirmation"
            defaultValue={password_confirmation}
            variant="outlined"
            name="password_confirmation"
            type="password"
            className="input-field"
        />
    )

    const password_confirmationFieldE = (
        <TextField
            error
            label="Password Confirmation"
            defaultValue={password_confirmation}
            helperText={password_confirmationE}
            variant="outlined"
            name="password_confirmation"
            type="password"
            className="input-field"
        />
    )


    return (
        <div className="signup-form">
            <form onChange={handleFormChange} onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="on">
                <div>
                    {usernameE === '' ? usernameField : usernameFieldE}
                </div>
                <div>
                    {nameE === '' ? nameField : nameFieldE}
                    {emailE === '' ? emailField : emailFieldE}
                </div>
                <div>
                    {passwordE === '' ? passwordField : passwordFieldE}
                    {password_confirmationE === '' ? password_confirmationField : password_confirmationFieldE}
                </div>
                <div className={classes.button}>
                    <Button type="submit" variant="contained" color="primary">
                        Sign Up
                    </Button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Account successfully created!
                    </Alert>
            </Snackbar>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        set_isloggedin: (status) => dispatch({ type: 'SET_STATUS', isLoggedIn: status }),
        change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
        change_value: (value) => dispatch({ type: 'CHANGE_VALUE', navValue: value }),
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.userState.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
