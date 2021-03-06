import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 50,
            width: '100%',
            backgroundColor: '#b71c1c',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(18),
        marginRight: theme.spacing(2),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(),
    },
    demo2: {
        backgroundColor: '#093170',
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 45,
      top: 15,
    },
  }))(Badge);

const NavBar = (props) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        props.change_value(newValue);
    };

    const redirect = () => {
        props.history.push(`${props.currentRoute}`)
        document.documentElement.scrollTop = 0
    }

    useEffect(redirect, [props.currentRoute])

    const logOut = () => {
        setOpen(true)
        localStorage.removeItem('auth_key')
        localStorage.removeItem('name')
        props.set_isloggedin(false)
        props.set_favorite_cats([])
        props.set_user_name('')
        props.change_value(0)
        props.change_route("/")
    }

    let favoriteBadge = (
        <StyledBadge badgeContent={props.favoriteCats.length} color="secondary">
            <StyledTab label="Favorites" onClick={() => props.change_route("/favorites")} /> 
        </StyledBadge>
    )

    return (
        <div className={classes.root}>
            <div className={classes.demo2}>
                <StyledTabs centered value={props.navValue} onChange={handleChange} aria-label="styled tabs example">
                    <StyledTab onClick={() => props.change_route("/")} label="Home" />
                    <StyledTab onClick={() => props.change_route("/breeds")} label="Breeds" />
                    <StyledTab onClick={() => props.change_route("/adoptable")} label="Adoptable Cats" />
                    {props.isLoggedIn === true ? favoriteBadge : null}
                    {props.isLoggedIn === true ? null : <StyledTab onClick={() => props.change_route("/login")} label="Login" />}
                    {props.isLoggedIn === true ? null : <StyledTab onClick={() => props.change_route("/signup")} label="Signup" />}
                    {props.isLoggedIn === true ? <StyledTab onClick={() => logOut()} label="Logout" /> : null}
                    {<br></br>}
                    {props.isLoggedIn === true ? <StyledTab onClick={() => props.change_route("/profile")} label={localStorage.name} /> : null}
                </StyledTabs>
                <Typography className={classes.padding} />
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Successfully logged out!
                    </Alert>
            </Snackbar>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
        change_value: (value) => dispatch({ type: 'CHANGE_VALUE', navValue: value }),
        set_isloggedin: (status) => dispatch({ type: 'SET_STATUS', isLoggedIn: status }),
        set_favorite_cats: (cats) => dispatch({ type: 'SET_FAVORITES', favoriteCats: cats }),
        set_user_name: (name) => dispatch({ type: 'SET_USER_NAME', userName: name })
    }
}

const mapStateToProps = (state) => {
    return {
        currentRoute: state.navState.currentRoute,
        navValue: state.navState.navValue,
        isLoggedIn: state.userState.isLoggedIn,
        favoriteCats: state.userState.favoriteCats,
        userName: state.userState.userName
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))