import React from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const BreedPagination = (props) => {
  const classes = useStyles();
  const handleChange = (event, value) => {
    props.set_breeds_page(value - 1)
    document.documentElement.scrollTop = 0
  };

  return (
    <div className="pagination">
        <div className={classes.root}>
        <Pagination count={props.breedsPages} page={props.breedsPage + 1} onChange={handleChange} />
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_breeds_page: (number) => dispatch({ type: 'SET_BREEDS_PAGE', breedsPage: number })
    }
}
  
  const mapStateToProps = (state) => {
    return {
      ...state.catState
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BreedPagination);