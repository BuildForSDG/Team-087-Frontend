import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles (theme => ({
  root: {
    height: '100vh',
  },
  bg: {
    backgroundColor: '#0c0032;',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    border: 0,
  },
  title: {
    fontWeight: 'bolder',
    marginTop: theme.spacing (3),
  },
  text_muted: {
    color: 'grey',
  },

  form: {
    padding: theme.spacing (3),
    marginTop: theme.spacing (0),
  },
  submit: {
    margin: theme.spacing (3, 0, 2),
    padding: theme.spacing (2, 1, 3),
    backgroundColor: '#0c0032',
    borderRadius: 0,
    textTransform: 'none',
  },
  squareBtn: {
    color: 'white',
    border: '2px solid white',
    borderRadius: 0,
    margin: theme.spacing (1),
    textTransform: 'none',
  },
  text_white: {
    color: 'white',
    textDecoration: '0',
    textTransform: 'none',
  },
  hiddenBtn: {
    margin: theme.spacing (1),
    color: '#3f51b5',
    border: '2px solid #0c0032',
    padding: theme.spacing (1),
    borderRadius: 0,
    textTransform: 'none',
  },
  pr: {
    paddingRight: theme.spacing (1),
  },
}));

const SpecialistSignupPage = () => {
  const classes = useStyles ();
  const [firstName, setFirstName] = useState ();
  const [lastName, setLastName] = useState ();
  const [email, setEmail] = useState ();
  const [password, setPassword] = useState ();
  const [confirmPassword, setConfirmPassword] = useState ();

  const handleFirstNameUpdate = e => {
    setFirstName (e.target.value);
  };

  const handleLastNameUpdate = e => {
    setLastName (e.target.value);
  };

  const handleEmailUpdate = e => {
    setEmail (e.target.value);
  };

  const handlePasswordUpdate = e => {
    setPassword (e.target.value);
  };

  const handleConfirmPasswordUpdate = e => {
    setConfirmPassword (e.target.value);
  };

  return (
    <div>
      <Grid container componet="main" className={classes.root}>
        <Grid item xs={12} lg={6} className={classes.bg}>
          <Hidden xsDown>
            <Button className={classes.squareBtn}>
              <Link className={classes.text_white} href="/login">Login</Link>
            </Button>
          </Hidden>
        </Grid>
        <Grid item xs={12} lg>
          <Hidden smUp>
            <Button className={classes.hiddenBtn}>
              <Link href="/login">Login</Link>
            </Button>
          </Hidden>
          <Box className={classes.paper}>
            <Typography className={classes.title} component="h1" variant="h5">
              Create A Free Account
            </Typography>
            <samll className={classes.text_muted}>
              You've got patients waiting!
            </samll>
            <form className={classes.form}>
              <div>
                <TextField
                  className={classes.pr}
                  variant="outlined"
                  type="text"
                  label="First name"
                  margin="normal"
                  required
                  name="firstname"
                  value={firstName}
                  onChange={handleFirstNameUpdate}
                />
                <TextField
                  variant="outlined"
                  type="text"
                  label="Last name"
                  margin="normal"
                  required
                  name="lastname"
                  value={lastName}
                  onChange={handleLastNameUpdate}
                />
              </div>
              <TextField
                variant="outlined"
                label="Email address"
                margin="normal"
                required
                fullWidth
                name="email"
                value={email}
                onChange={handleEmailUpdate}
              />
              <p className={classes.text_muted}>
                Who do you want to sign up as ?
              </p>

              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                name="signupAs"
              >
                <MenuItem value="individual">Individual</MenuItem>
                <MenuItem value="specialist">Specialist</MenuItem>
              </Select>
              <p className={classes.text_muted}>
                Create a unique password
              </p>
              <div>
                <TextField
                  className={classes.pr}
                  variant="outlined"
                  label="Password"
                  type="password"
                  margin="normal"
                  required
                  name="password"
                  value={password}
                  onChange={handlePasswordUpdate}
                />
                <TextField
                  variant="outlined"
                  type="password"
                  label="Confirm password "
                  margin="normal"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordUpdate}
                />
              </div>

              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                margin="normal"
                data-submit-btn="true"
              >
                Create Account
              </Button>
              <small className={classes.text_muted}>
                Already have an account? <Link href="/login"> Login </Link>{' '}
              </small>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default SpecialistSignupPage;
