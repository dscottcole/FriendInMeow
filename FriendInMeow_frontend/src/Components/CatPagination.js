import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CatPagination = (props) => {
  const classes = useStyles();
  const handleChange = (event, value) => {
    props.set_cats_page(value)
    document.documentElement.scrollTop = 0
  };

  return (
    <div className="pagination">
        <div className={classes.root}>
        {/* <Typography>Page: {props.adoptableCatsPage}</Typography> */}
        <Pagination count={props.adoptableCatsPages} page={props.adoptableCatsPage} onChange={handleChange} />
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_cats_page: (number) => dispatch({ type: 'SET_CATS_PAGE', adoptableCatsPage: number })
    }
}
  
  const mapStateToProps = (state) => {
    return {
      ...state.catState
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CatPagination);