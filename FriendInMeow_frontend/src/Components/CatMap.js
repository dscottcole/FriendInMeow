
import React from 'react';
import { connect } from "react-redux";

import GoogleMapReact from 'google-map-react';
  
const CatMap = (props) => {

    // Thanks to Jeff Jason II (http://jeffjason.com/2011/12/google-maps-radius-to-zoom/)
    const radiusToZoom = (radius) => {
        return Math.round(14-Math.log(radius)/Math.LN2);
    }
    
    let userInfo = {
        center: {
        lat: props.userLat,
        lng: props.userLong
        }
    };

    const zoomRatio = radiusToZoom((props.clickedCat.distance + 1))
    const zoomDefault = radiusToZoom(2000)

    const renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
        position: props.clickedCatLoc,
        map,
        title: props.clickedCatOrg.name,
        icon: require("../Images/cat-icon.ico")
        });

        return marker;
    };
    const renderMarkers2 = (map, maps) => {
        if ( props.userLat !== 0 && props.userLong !== 0) {
            let marker = new maps.Marker({
            position: { lat: props.userLat, lng: props.userLong },
            map,
            title: "Your Location"
            });
            return marker;
        }
    };

    let catMap = (
        <div className="cat-map" style={{ height: '600px', width: '600px' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_googleKey }}
            defaultCenter={props.userLat !== 0 && props.userLong !== 0? userInfo.center : props.clickedCatLoc}
            defaultZoom={props.clickedCat.distance !== undefined? zoomRatio : zoomDefault}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({map, maps}) => {
                renderMarkers(map, maps)
                renderMarkers2(map, maps)
            }}
            >
            </GoogleMapReact>
      </div>
    )
 
    return (
        props.clickedCatLocated === true? catMap : null
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
      change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName })
    }
}
  
const mapStateToProps = (state) => {
    return {
        ...state.catState,
        userLat: state.userState.userLat,
        userLong: state.userState.userLong,
        userRadius: state.userState.userRadius,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatMap);