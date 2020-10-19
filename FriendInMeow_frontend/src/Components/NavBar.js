import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router"

import { useEffect } from 'react';

const NavBar = (props) => {

    const redirectHelper = (routeName) => {
        props.change_route(routeName)
    }

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
        <div className="nav-bar">
            <div className="nav-item" name="/" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Home</div>
            <div className="nav-item" name="/breeds" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Cat Breeds</div>
            <div className="nav-item" name="/adoptable" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Adoptable Cats</div>
            <div className="nav-item" name="/organizations" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Adoption Organizations</div>
            {props.isLoggedIn === true && props.favoriteCats.length > 0? <div className="nav-item" name="/favorites" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Favorite Cats</div> : null}
            <div className="nav-item" name="/profile" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Profile</div>
            {props.isLoggedIn === true? null : <div className="nav-item" name="/login" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Login</div>}
            {props.isLoggedIn === true? null : <div className="nav-item" name="/signup" onClick={(e) => redirectHelper(e.target.getAttribute('name'))}>Signup</div>}
            {props.isLoggedIn === true? <div className="nav-item" name="/logout" onClick={() => logOut()}>Logout</div> : null}
        </div>
    )
    
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
      set_isloggedin: (status) => dispatch({ type: 'SET_STATUS', isLoggedIn: status }),
      set_favorite_cats: (cats) => dispatch({ type: 'SET_FAVORITES', favoriteCats: cats }),
      set_user_name: (name) => dispatch({ type: 'SET_USER_NAME', userName: name }),
    }
}

const mapStateToProps = (state) => {
    return {
        currentRoute: state.navState.currentRoute,
        isLoggedIn: state.userState.isLoggedIn,
        favoriteCats: state.userState.favoriteCats
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))