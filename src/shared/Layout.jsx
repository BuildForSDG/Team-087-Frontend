import React from 'react';
import { Grid, Hidden, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(_theme => ({
  root: {
    height: '100vh',
    flexGrow: 1,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const { children, mdUp = false } = props;

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Hidden mdUp={mdUp}><Header /></Hidden>

        <>{children}</>

        <Hidden mdUp={mdUp}><Footer /></Hidden>
      </Grid>
    </>
  );
};

export default Layout;

export const Loader = (props) => {
  const { message } = props;
  
  return (
    <>
      <div className='message alert full-length loading'>Loading {message}...</div>
      <LinearProgress color="secondary" />
    </>
  );
};
