import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles (theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    padding: theme.spacing (3),
    marginTop: theme.spacing (3),
  },
  submit: {
    margin: theme.spacing (3, 0, 2),
    padding: theme.spacing (2, 1, 3),
    backgroundColor: '#0c0032;',
    borderRadius: 0,
    textTransform: 'none',
  },
  bg: {
    backgroundColor: '#0c0032;',
  },
  squareBtn: {
    color: 'white',
    border: '2px solid white',
    borderRadius: 0,
    margin: theme.spacing (1),
    textTransform: 'none',
  },
  hiddenBtn: {
    margin: theme.spacing (1),
    color: '#3f51b5',
    border: '2px solid #0c0032;',
    padding: theme.spacing (1),
    borderRadius: 0,
    textTransform: 'none',
  },

  title: {
    fontWeight: 'bolder',
    marginTop: theme.spacing (3),
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

const Login = () => {
  const classes = useStyles ();
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  const handleEmailUpdate = e => {
    setEmail (e.target.value);
  };

  const handlePasswordUpdate = e => {
    setPassword (e.target.value);
  };

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        {/* <Hidden xsDown>
          <Grid item xs={12} lg={8} className={`${classes.bg}`}>
            <Button className={classes.squareBtn} id="hidden-sign-up-btn-1">
              <Link className={classes.text_white} href="/join">Sign Up</Link>
            </Button>
          </Grid>
        </Hidden> */}

        <Grid item xs={12} lg>
          <Hidden smUp>
            <Button className={classes.hiddenBtn} d="hidden-sign-up-btn-2">
              <Link href="/join">Sign Up</Link>
            </Button>
          </Hidden>

          <Paper className={classes.paper}>
            <Typography className={classes.title} component="h1" variant="h5">
              Log Into Your Account
            </Typography>
            <small className={classes.text_muted}>
              Yes, Your Mental Health Is Important
            </small>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                label="Email or username"
                margin="normal"
                name="email"
                value={email}
                onChange={handleEmailUpdate}
                required
                fullWidth
                data-testid="email"
              />
              <TextField
                variant="outlined"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordUpdate}
                label="Password"
                margin="normal"
                required
                fullWidth
              />
              <Button
                className={classes.submit}
                type="submit"
                id="login_btn"
                fullWidth
                variant="contained"
                color="primary"
                margin="normal"
                data-testid="submit-btn"
              >
                Log in
              </Button>
              <small><Link>Forgot password?</Link></small><br/>
              <small>First-Time User? <Link href="/join">Sign Up</Link></small>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
