import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import LockOpenIcon from '@material-ui/icons/LockOpen';

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

const Profile = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    let [user_id, setUserId] = useState(0)
    let [username, setUsername] = useState('');
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [password_confirmation, setPasswordConfirmation] = useState('');

    let [isChangingPassword, setIsChangingPassword] = useState(false)

    let [usernameE, setUsernameE] = useState('');
    let [nameE, setNameE] = useState('');
    let [emailE, setEmailE] = useState('');
    let [passwordE, setPasswordE] = useState('');
    let [password_confirmationE, setPasswordConfirmationE] = useState('');

    const getUserId = () => {
        fetch('http://localhost:3000/getid', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            }
        })
            .then(res => res.json())
            .then(res => {
                setUserId(res.user_id)
                getUserInfo(res.user_id)
            })
    }

    const getUserInfo = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            }
        })
            .then(res => res.json())
            .then(res => {
                setUsername(res.username)
                setName(res.name)
                setEmail(res.email)
            })
    }

    useEffect(() => {
        getUserId()
    }, []);

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

    const clearEState = () => {
        setUsernameE('')
        setNameE('');
        setEmailE('');
        setPasswordE('');
        setPasswordConfirmationE('');
        setIsChangingPassword(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let updatedUser = {}

        if (password === "" && password_confirmation === "") {
            updatedUser = {
                "user": {
                    "username": username,
                    "name": name,
                    "email": email
                }
            }
        } else {
            updatedUser = {
                "user": {
                    "username": username,
                    "name": name,
                    "email": email,
                    "password": password,
                    "password_confirmation": password_confirmation
                }
            }
        }

        // clearState()
        editUser(updatedUser)
    }

    const editUser = (updatedUser) => {
        fetch(`http://localhost:3000/users/${user_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
            },
            body: JSON.stringify(updatedUser)
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
                    setOpen(true);
                    clearEState()
                }
            })
    }

    const usernameField = (
        <TextField
            label="Username"
            value={username}
            variant="outlined"
            name="username"
            className="input-field"
        />
    )

    const usernameFieldE = (
        <TextField
            error
            label="Username"
            value={username}
            helperText={usernameE}
            variant="outlined"
            name="username"
            className="input-field"
        />
    )

    const nameField = (
        <TextField
            label="Full Name"
            value={name}
            variant="outlined"
            name="name"
            className="input-field"
        />
    )

    const nameFieldE = (
        <TextField
            error
            label="Full Name"
            value={name}
            helperText={nameE}
            variant="outlined"
            name="name"
            className="input-field"
        />
    )

    const emailField = (
        <TextField
            label="Email"
            value={email}
            variant="outlined"
            name="email"
            className="input-field"
        />
    )

    const emailFieldE = (
        <TextField
            error
            label="Email"
            value={email}
            helperText={emailE}
            variant="outlined"
            name="email"
            className="input-field"
        />
    )

    const passwordField = (
        <TextField
            label="Password"
            value={password}
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
            value={password}
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
            value={password_confirmation}
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
            value={password_confirmation}
            helperText={password_confirmationE}
            variant="outlined"
            name="password_confirmation"
            type="password"
            className="input-field"
        />
    )

    const passwordSection = (
        <div>
            {passwordE === '' ? passwordField : passwordFieldE}
            {password_confirmationE === '' ? password_confirmationField : password_confirmationFieldE}
        </div>
    )

    const changePasswordButton = (
        <div className="pw-change-button">
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                endIcon={<LockOpenIcon />}
                onClick={() => setIsChangingPassword(true)}
            >
                Change Password?
        </Button>
        </div>
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
                {isChangingPassword === false ? changePasswordButton : passwordSection}
                <div className={classes.button}>
                    <Button type="submit" variant="contained" color="primary">
                        Update Info
                    </Button>
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Successfully updated profile!
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
