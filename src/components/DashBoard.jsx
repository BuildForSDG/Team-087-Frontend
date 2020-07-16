import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Layout from '../shared/Layout';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minHeight: '80vh',
    padding: '20px',
    marginBottom: '20px'
  },
  /* submitSmall: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(1, 1, 1),
    fontSize: '0.9em',
    textTransform: 'none',
    width: '30px'
  }, */
}));

const DashBoard = () => {
  const classes = useStyles();

  return (
    <>
      <Layout>
        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">DashBoard</Typography>
        </Grid>
      </Layout>
    </>
  );
};

export default DashBoard;
