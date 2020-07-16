import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography, CircularProgress, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot, registerAuth, isLoggedIn } from '../../helpers';
import Layout from '../../shared/Layout';

const useStyles = makeStyles(theme => ({
  /* root: {
    height: '100vh',
  }, */
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minHeight: '80vh',
    padding: theme.spacing(3, 4)
  },
  form: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2, 1, 2),
    fontSize: '1.2em',
    textTransform: 'none',
  },
  /* bg: {
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
  }, */
  title: {
    fontWeight: 'bolder',
    marginTop: theme.spacing(3),
    color: '#0c0032'
  },
  callToAction: {
    padding: theme.spacing(10, 5, 3, 3)
  },
  /* textWhite: {
    color: 'white',
    textDecoration: '0',
    textTransform: 'none',
  }, */
  textMuted: {
    color: 'grey',
  },
}));

const Login = ({ location }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsCalling((prevIsCalling) => !prevIsCalling);
    setErrorFeedBack('');

    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { access_token: token, data: user } = await fetchBot(`${endPoints.signIn}`, options);
      const done = registerAuth({ token, firstName: user.first_name, user });
      if (done) window.location = '/dashboard';
    } catch (err) {
      setErrorFeedBack(`${err.message}: ${err.errors && err.errors.join(', ')}`);
    }

    setIsCalling((prevIsCalling) => !prevIsCalling);
  };

  if (isLoggedIn) {
    return <Redirect to={(location.state || {from: {pathname: '/dashboard'}}).from} />;
  }

  return (
    <>
      <Layout>
        <Grid item xs={12} lg={8} /* className={classes.bg} */>
          <Hidden xsDown>
            <Typography component="h2" variant="h3">
              <div className={classes.callToAction}>
                Looking for a neighbourhood mental-health specialist to consult?
          
                <Typography className={classes.title} component="h1" variant="h2">
                  Sign-in to your account
                </Typography>
                <small className={classes.textMuted} style={{display:"flex", fontSize:'16px', marginTop:'16px', alignItems: "center"}}>
                  Your mental health is important!
                </small>
              </div>
            </Typography>
          </Hidden>
        </Grid>

        <Grid item className={classes.paper} xs={12} lg>
          <Hidden smUp>
            {/* <Button className={classes.hiddenBtn} d="hidden-sign-up-btn-2">
              <Link href="/join">Sign Up</Link>
            </Button> */}
            <Typography className={classes.title} component="h3" variant="h4">
              Sign-in to your account
            </Typography>
          </Hidden>

          <br/>
          <br/>
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="E-mail Address or Username"
              margin="normal"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
              data-testid="email"
            />
            <TextField
              variant="outlined"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              label="Password"
              margin="normal"
              required
              fullWidth
            />
            <br/>
            <Button
              className={classes.submit}
              type="submit"
              id="login_btn"
              fullWidth
              variant="contained"
              color="secondary"
              margin="normal"
              data-testid="submit-btn"
              disabled={isCalling}
            >
              {isCalling ? <CircularProgress color="secondary" /> : `Log In`}
            </Button>
            <small><Link>Forgot password?</Link></small><br />
            <small>First-Time User? <Link component={RouterLink} to="/join">Sign Up</Link></small>
          </form>
        </Grid>
      </Layout>
    </>
  );
};

export default Login;
