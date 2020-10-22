import React, { useEffect } from 'react';
import { connect } from "react-redux";
import FaveCatCard from '../Components/FaveCatCard'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(20),
    },
}));

const FaveContainer = (props) => {
    const spacing = 4
    const classes = useStyles();

    const clearClickedCat = () => {
        if (props.clickedCat.name !== undefined) {
            props.set_clicked_cat({})
            props.set_clicked_cat_loc({})
            props.set_clicked_cat_located(false)
            props.set_clicked_cat_org({})
        }
    }

    useEffect(() => {
        clearClickedCat()
        props.change_value(3)
        props.change_route("/favorites")
    }, [])

    const catCards = (
        props.favoriteCats.map(cat => <Grid item>
            <FaveCatCard
                key={cat.id}
                cat={cat}
                className={classes.paper}
            />
        </Grid>)
    )

    const noCats = (
        <Typography className="no-cats" variant="body2" color="textPrimary" width="100%" component="p">
            You have no favorite cats or all your favorites have been adopted.
        </Typography>
    )

    return (
        <div className="filter-adoptable">
            <Grid container className={classes.root} spacing={12}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {props.favoriteCats.length > 0 ? catCards : noCats}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_clicked_cat: (cat) => dispatch({ type: 'SET_CLICKED_CAT', clickedCat: cat }),
        set_clicked_cat_loc: (loc) => dispatch({ type: 'SET_CLICKED_CAT_LOC', clickedCatLoc: loc }),
        set_clicked_cat_org: (org) => dispatch({ type: 'SET_CLICKED_CAT_ORG', clickedCatOrg: org }),
        set_clicked_cat_located: (status) => dispatch({ type: 'SET_CLICKED_CAT_LOCATED', clickedCatLocated: status }),
        change_route: (routeName) => dispatch({ type: 'CHANGE_ROUTE', newRoute: routeName }),
        change_value: (value) => dispatch({ type: 'CHANGE_VALUE', navValue: value }),
    }
}

const mapStateToProps = (state) => {
    return {
        clickedCat: state.catState.clickedCat,
        favoriteCats: state.userState.favoriteCats
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaveContainer);