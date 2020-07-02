import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import qs from 'querystring';
import { Button, Grid, Typography, CircularProgress, Divider, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot, isLoggedIn } from '../../helpers';
import Header from '../Header';
import { useEffect } from 'react';
import { VerifiedUser } from '@material-ui/icons';
import Footer from '../Footer';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    // flexGrow: 1
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minHeight: '100vh',
    padding: '20px',
    marginBottom: '20px'
  },
  form: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2, 1, 2),
    fontSize: '1.2em',
    // backgroundColor: '#0c0032;',
    // borderRadius: 0,
    textTransform: 'none',
  },
  bg: {
    backgroundColor: '#0c0032;',
  },
  squareBtn: {
    color: 'white',
    border: '2px solid white',
    borderRadius: 0,
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  hiddenBtn: {
    margin: theme.spacing(1),
    color: '#3f51b5',
    border: '2px solid #0c0032;',
    padding: theme.spacing(1),
    borderRadius: 0,
    textTransform: 'none',
  },

  title: {
    fontWeight: 'bolder',
    marginTop: theme.spacing(3),
    color: '#0c0032'
  },
  text_white: {
    color: 'white',
    textDecoration: '0',
    textTransform: 'none',
  },
  text_muted: {
    color: 'grey',
  },
}));

const Verify = ({ location }) => {
  const classes = useStyles();
  const { email = '', code = '' } = qs.parse(location.search.replace('?', ''));

  const [isCalling, setIsCalling] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    verify(email, code);
  };

  const verify = async (email, code) => {
    setIsCalling(true);
    setErrorFeedBack('');

    if (email && code) {
      const options = {
        method: 'GET', mode: 'cors', headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const { status } = await fetchBot(`${endPoints.verify}?email=${email}&code=${code}`, options);
        setIsVerified(status);
      } catch (err) {
        setErrorFeedBack(`${err.message}: Pls try again later`);
      }
    } else {
      setErrorFeedBack('Verification details are missing');
    }

    setIsCalling(false);
  };

  useEffect(() => {
    //effect
    verify(email, code);

    return () => setIsVerified(false);//cleanup
  }, [code, email])

  if (isLoggedIn) {
    return <Redirect to={(location.state || { from: { pathname: '/dashboard' } }).from} />;
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Header />

        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Profile Verification</Typography>

          <br />
          <br />
          <Divider />
          <Grid item md={3} sm={9}>
            {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}

            <form onSubmit={handleSubmit}>
              <Button
                className={classes.submit}
                type="submit"
                id="login_btn"
                fullWidth
                variant="contained"
                color="secondary"
                margin="normal"
                data-testid="submit-btn"
                disabled={isCalling || isVerified}
              >
                {isCalling ? <CircularProgress color="secondary" aria-label="Verifying..." />
                  : (isVerified ? <VerifiedUser color="secondary" /> : "Verify")}
              </Button>
            </form>
            {isCalling ? <></> : <small className={classes.text_muted}>
              Already verified? Kindly <Link component={RouterLink} to="/login">Proceed</Link> to sign-in to your account.
            </small>}
          </Grid>
        </Grid>

        <Footer />
      </Grid>
    </>
  );
};

export default Verify;
