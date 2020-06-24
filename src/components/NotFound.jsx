import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    height: '100vh',
    padding: '20px',
    marginBottom: '20px'
  },
  submitSmall: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(1, 1, 1),
    fontSize: '0.9em',
    textTransform: 'none',
    width: '30px'
  },
}));

const NotFound = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Grid item className={classes.paper} xs={12} lg>
        <h3>Oops!!!</h3>
        <div>This page no longer exists...</div>

        <br />
        <Button className={classes.submitSmall} type="reset" size="large" color="secondary"
          onClick={history.goBack} variant="contained" margin="normal">
          Return
        </Button>
      </Grid>

      <Footer />
    </>
  );
}

export default NotFound;
