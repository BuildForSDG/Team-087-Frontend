import React from 'react';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

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

const DashBoard = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Header />

        <Grid item xs={12} lg>
          <Paper className={classes.paper}>
            <Typography variant="h5">
              DashBoard
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default DashBoard;
