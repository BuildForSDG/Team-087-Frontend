import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, Divider } from '@material-ui/core';
import { KeyboardReturn } from '@material-ui/icons';
import Layout from '../shared/Layout';

const useStyles = makeStyles(theme => ({
  /* root: {
    height: '100vh',
    flexGrow: 1,
  }, */
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minHeight: '80vh',
    padding: '20px',
    marginBottom: '20px'
  },
  returnBtn: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(1),
    width: '30px'
  },
}));

const NotFound = ({ history }) => {
  const classes = useStyles();

  return (
    <>
      <Layout>
        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Oops!!!</Typography>
          <br />
          <Divider />

          <div style={{margin: "20px 0"}}>This page no longer exists...</div>

          <br />
          <Button className={classes.returnBtn} type="reset" size="large" color="secondary"
            onClick={history.goBack} variant="contained" margin="normal">
            <KeyboardReturn />
          </Button>
        </Grid>
      </Layout>
    </>
  );
}

export default NotFound;
