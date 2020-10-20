import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors'

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
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
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
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
    },
}));

const NavBar = (props) => {
    const classes = useStyles();
    // const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        props.change_value(newValue);
    };

    const redirect = () => {
        props.history.push(`${props.currentRoute}`)
        document.documentElement.scrollTop = 0
    }

    useEffect(redirect, [props.currentRoute])

    const logOut = () => {
        localStorage.removeItem('auth_key')
        props.set_isloggedin(false)
        props.set_favorite_cats([])
        props.set_user_name('')
        props.change_route("/")
    }

    return (
        <div className={classes.root}>
            <div className={classes.demo2}>
                <StyledTabs centered value={props.navValue} onChange={handleChange} aria-label="styled tabs example">
                    <StyledTab onClick={() => props.change_route("/")} label="Home" />
                    <StyledTab onClick={() => props.change_route("/breeds")} label="Cat Breeds" />
                    <StyledTab onClick={() => props.change_route("/adoptable")} label="Adoptable Cats" />
                    {props.isLoggedIn === true ? <StyledTab label="Favorites" onClick={() => props.change_route("/favorites")} /> : null}
                    {props.isLoggedIn === true ? <StyledTab onClick={() => props.change_route("/profile")} label="Profile" /> : null}
                    {props.isLoggedIn === true ? null : <StyledTab onClick={() => props.change_route("/login")} label="Login" />}
                    {props.isLoggedIn === true ? null : <StyledTab onClick={() => props.change_route("/signup")} label="Signup" />}
                    {props.isLoggedIn === true ? <StyledTab onClick={() => logOut()} label="Logout" /> : null}
                </StyledTabs>
                <Typography className={classes.padding} />
            </div>
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
        favoriteCats: state.userState.favoriteCats
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))