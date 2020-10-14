import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
 

const BreedShow = (props) => {

    const breed = props.clickedBreed

    return (
        <div className="breed-show">
            <h1>{breed.name}</h1>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName })
    }
}
  
const mapStateToProps = (state) => {
    return {
        ...state.catState
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedShow);