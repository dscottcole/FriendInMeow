import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { blue, grey} from '@material-ui/core/colors';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: blue[500],
    color: theme.palette.common.black,
    fontWeight: 'bold',
    fontSize: '16px'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 1400,
  },
});

const TraitTable = (props) => {
  const classes = useStyles();

  let breed = props.clickedBreed

  const [traitArray, setTraitArray] = useState([])

  const createTraitArray = () => {
      let preTrait = [breed.experimental, breed.natural, breed.rare, breed.hairless, breed.rex, breed.suppressed_tail, breed.short_legs, breed.hypoallergenic]
      console.log(preTrait)
      setTraitArray(preTrait)
  }

  function createData(exp, natural, rare, hairless, rex, suppressed, shortlegs, hypo) {
    return { exp, natural, rare, hairless, rex, suppressed, shortlegs, hypo };
  }

  const rows = [
    createData(traitArray[0], traitArray[1], traitArray[2], traitArray[3], traitArray[4], traitArray[5], traitArray[6], traitArray[7]),
  ];
  
  useEffect(() => {
      createTraitArray()
  }, [props.clickedBreed])

  let traitTable = (
    <TableContainer className="trait-table" component={Paper}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Experimental Breed</StyledTableCell>
          <StyledTableCell align="center">Natural Breed</StyledTableCell>
          <StyledTableCell align="center">Rare</StyledTableCell>
          <StyledTableCell align="center">Hairless</StyledTableCell>
          <StyledTableCell align="center">Rex Hair</StyledTableCell>
          <StyledTableCell align="center">Suppressed Tail</StyledTableCell>
          <StyledTableCell align="center">Short Legs</StyledTableCell>
          <StyledTableCell align="center">Hypoallergenic</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow>
            <StyledTableCell align="center">{row.exp > 0? 'Yes' : 'No'}</StyledTableCell>
            <StyledTableCell align="center">{row.natural > 0? 'Yes' : 'No'}</StyledTableCell>
            <StyledTableCell align="center">{row.rare > 0? 'Yes' : 'No'}</StyledTableCell>
            <StyledTableCell align="center">{row.hairless > 0? 'Yes' : 'No'}</StyledTableCell>
            <StyledTableCell align="center">{row.rex > 0? 'Yes' : 'No'}</StyledTableCell>
            <StyledTableCell align="center">{row.suppressed > 0? 'Yes' : 'No'}</StyledTableCell>
            <StyledTableCell align="center">{row.shortlegs > 0? 'Yes' : 'No'}</StyledTableCell>
            <StyledTableCell align="center">{row.hypo > 0? 'Yes' : 'No'}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )

  return (
    traitArray.length > 0? traitTable : null
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(TraitTable);