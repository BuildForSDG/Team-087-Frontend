import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, makeStyles, Grid } from '@material-ui/core';


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="left" gutterBottom>
      &copy;{' '}
      <Link color="inherit" to="/" style={{ textDecoration: "none", fontWeight: "bold", color: "#0c0032" }}>
        Mental.ly
      </Link>{' '}
      {new Date().getFullYear()}
      {'. '}
      All Rights Reserved.
      {'.'}
    </Typography>
  );
};


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3, 3),
    marginTop: theme.spacing(4),
    borderTop: 'thin solid #dddddd',
    fontSize: '16px'
  },
}));


const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <footer className={classes.footer}>
            {/* <Typography variant="h6" align="center" gutterBottom>
                Mental.ly
                </Typography>
                
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
            </Typography> */}
            <Copyright />
          </footer>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
