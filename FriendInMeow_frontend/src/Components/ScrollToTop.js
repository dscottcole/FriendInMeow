import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ScrollToTop = () => {
  const classes = useStyles();

  const scrollUp = () => {
    document.documentElement.scrollTop = 0
  }

  return (
    <div className="scroll-button">
      <Fab onClick={() => scrollUp()} color="primary" variant="extended">
        <NavigationIcon className={classes.extendedIcon} />
        Scroll To Top
      </Fab>
    </div>
  );
}

export default ScrollToTop