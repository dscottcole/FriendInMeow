import React from 'react'
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';


const OrganizationSection = (props) => {

    let org = props.clickedCatOrg

    return (
        <div className="org-section">
            {/* {props.clickedCatOrg.photos.length > 0 && props.clickedCatOrg.photos[0].small !== undefined? <img src={props.clickedCatOrg.photos[0].small} ></img> : null} */}
            <br></br>
            {org.name !== null? <Typography variant="h5" component="h5">{org.name}</Typography> : null}
            <br></br>
            <Typography variant="h6" component="h6"> Email: </Typography>
            {org.email !== null? <Typography variant="body1" component="body1">{org.email}</Typography> : null}
            <Typography variant="h6" component="h6"> Phone Number: </Typography>
            {org.phone !== null? <Typography variant="body1" component="body1">{org.phone}</Typography> : null}
            {org.website !== undefined? <Typography variant="h6" component="h6"> Website: </Typography> :null}
            {org.website !== undefined? <Link href={org.website} variant="body2">{org.website}</Link> : null}
            <Typography variant="h6" component="h6"> Address: </Typography>
            {org.addres !== undefined && org.address.address1 !== null? <ul>{org.address.address1}</ul> : null}
            {org.addres !== undefined && org.address.address2 !== null? <ul>{org.address.address2}</ul> : null}
            {org.addres !== undefined && org.address.city !== null && org.address.state !== null && org.address.postcode !== null? <ul>{org.address.city + ", " + org.address.state + " " + org.address.postcode}</ul> : null}
            {props.userPostalCode !== ""? <Typography variant="h6" component="h6"> Distance: </Typography> : null}
            {props.clickedCat.distance !== null? <Typography variant="body1" component="body1">{Math.floor(props.clickedCat.distance) + " miles"}</Typography> : null}

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
        ...state.catState,
        userPostalCode: state.userState.userPostalCode
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationSection);