import React, { useState } from 'react';
import {
  Box, Button, FormControlLabel, FormLabel, Grid,
  Link, RadioGroup, Radio, TextField, Typography, CircularProgress
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot } from '../../helpers';
import Header from '../Header';

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(3),
  },
  text_muted: {
    color: 'grey',
  },

  form: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2, 1, 2),
    fontSize: '1.2em',
    // backgroundColor: '#0c0032',
    // borderRadius: 0,
    textTransform: 'none',
  },
  squareBtn: {
    color: 'white',
    border: '2px solid white',
    borderRadius: 0,
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  text_white: {
    color: 'white',
    textDecoration: '0',
    textTransform: 'none',
  },
  hiddenBtn: {
    margin: theme.spacing(1),
    color: '#3f51b5',
    border: '2px solid #0c0032',
    padding: theme.spacing(1),
    borderRadius: 0,
    textTransform: 'none',
  },
  pr: {
    paddingRight: theme.spacing(1),
  },
  pb: {
    paddingBottom: theme.spacing(2),
  },
}));

const SignupPage = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('female');
  const [subscriberType, setSubscriberType] = useState('patient');

  const [isSaving, setIsSaving] = useState(false);
  const [successFeedBack, setSuccessFeedBack] = useState('');
  const [errorFeedBack, setErrorFeedBack] = useState('');
  //   const [errorBag, setErrorBag] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSaving(true);

    const userProfile = {
      "last_name": lastName,
      "first_name": firstName,
      "email": email,
      "gender": gender,
      "password": password,
      "password_confirmation": confirmPassword,
      "is_patient": (subscriberType === 'patient')
    };

    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(userProfile),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { message } = await fetchBot(`${endPoints.signUp}`, options);
      setSuccessFeedBack(message);

      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (err) {
      setErrorFeedBack(err.message);
      // setErrorBag(err.errors);
      // console.log(err.errors);
    }

    setPassword('');
    setConfirmPassword('');
    setIsSaving(false);
  }

  return (
    <div>
      <Grid container componet="main" className={classes.root}>
        <Header />

        <Grid item xs={12} lg={7} className={classes.bg}>
          {/* <Hidden xsDown>
            <Button className={classes.squareBtn}>
              <Link className={classes.text_white} href="/login">Login</Link>
            </Button>
          </Hidden> */}
        </Grid>
        <Grid item xs={12} lg>
          {/* <Hidden smUp>
            <Button className={classes.hiddenBtn}>
              <Link href="/login">Login</Link>
            </Button>
          </Hidden> */}
          <Box className={classes.paper}>
            <Typography className={classes.title} component="h1" variant="h5">
              Create A Free Account
            </Typography>
            <small className={classes.text_muted} style={{display:"flex",alignItems: "center"}}>
              You've got patients | specialists waiting! <br />
              Sign-up &amp; Get Recommendations
            </small><br />

            {successFeedBack && <div className='message alert full-length alert-success'>{successFeedBack}</div>}
            {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}

            <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
              <div className={classes.pb}>
                <TextField
                  className={classes.pr}
                  variant="outlined"
                  type="text"
                  label="First Name"
                  margin="normal"
                  required
                  name="first_name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  //   helperText="Enter Your Firstname"
                  disabled={isSaving}
                />
                <TextField
                  variant="outlined"
                  type="text"
                  label="Last Name"
                  margin="normal"
                  required
                  name="last_name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  //   helperText="Enter Your Lastname"
                  disabled={isSaving}
                />
              </div>

              <div className={classes.pb}>
                <FormLabel component="legend">Gender:</FormLabel>
                <RadioGroup aria-label="gender" name="gender" value={gender} onChange={e => setGender(e.target.value)}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </div>

              <div>
                <FormLabel component="legend">Subscriber Type:</FormLabel>
                <RadioGroup aria-label="subscriber_type" name="subscriber_type" value={subscriberType} onChange={e => setSubscriberType(e.target.value)}>
                  <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                  <FormControlLabel value="specialist" control={<Radio />} label="Mental-Health Specialist" />
                </RadioGroup>
              </div>

              <TextField
                variant="outlined"
                label="Email Address"
                margin="normal"
                required
                fullWidth
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isSaving}
              />
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
                  onChange={e => setPassword(e.target.value)}
                  disabled={isSaving}
                />
                <TextField
                  variant="outlined"
                  type="password"
                  label="Confirm Password"
                  margin="normal"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  disabled={isSaving}
                />
              </div>

              <Button
                className={classes.submit}
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                color="secondary"
                margin="normal"
                data-submit-btn="true"
                disabled={isSaving}
              >
                {isSaving ? <CircularProgress color="secondary" /> : `Submit`}
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

export default SignupPage;
