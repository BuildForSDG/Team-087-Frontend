import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import {
  Button, FormControlLabel, FormLabel, Grid,
  Link, RadioGroup, Radio, TextField, Typography, CircularProgress
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot, isLoggedIn } from '../../helpers';
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
    // border: 0,
  },
  title: {
    fontWeight: 'bolder',
    marginTop: theme.spacing(3),
  },
  textMuted: {
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
  textWhite: {
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

const SignupPage = ({ location }) => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('female');
  const [subscriberType, setSubscriberType] = useState('patient');

  const [isCalling, setIsCalling] = useState(false);
  const [successFeedBack, setSuccessFeedBack] = useState('');
  const [errorFeedBack, setErrorFeedBack] = useState('');
  //   const [errorBag, setErrorBag] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    setIsCalling((prevIsCalling) => !prevIsCalling);
    setSuccessFeedBack('');
    setErrorFeedBack('');

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
    setIsCalling((prevIsCalling) => !prevIsCalling);
  }

  if (isLoggedIn) {
    return <Redirect to={(location.state || {from: {pathname: '/dashboard'}}).from} />
  }

  return (
    <div>
      <Grid container componet="main" className={classes.root}>
        <Header />

        <Grid item xs={12} lg={7} /* className={classes.bg} */>
          {/* <Hidden xsDown>
            <Button className={classes.squareBtn}>
              <Link className={classes.textWhite} href="/login">Login</Link>
            </Button>
          </Hidden> */}
          <Typography component="h2" variant="h3">
            <div style={{padding:'50px 20px'}}>
              Looking for a neighbourhood mental-health specialist to consult? <br />
              <Typography className={classes.title} component="h1" variant="h2">
                Sign-up for a FREE account
              </Typography>
              <small className={classes.textMuted} style={{display:"flex", fontSize:'16px', marginTop:'16px', alignItems: "center"}}>
                You've got patients | specialist-recommendations waiting! <br />
              </small>
            </div>
          </Typography>
        </Grid>

        <Grid item className={classes.paper} xs={12} lg>
          <br />

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
                disabled={isCalling}
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
                disabled={isCalling}
              />
            </div>

            <div className={classes.pb}>
              <FormLabel component="legend">Gender:</FormLabel>
              <RadioGroup aria-label="gender" name="gender" value={gender} row onChange={e => setGender(e.target.value)}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </div>

            <div>
              <FormLabel component="legend">Subscriber Type:</FormLabel>
              <RadioGroup aria-label="subscriber_type" row value={subscriberType} onChange={e => setSubscriberType(e.target.value)}>
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
              disabled={isCalling}
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
                disabled={isCalling}
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
                disabled={isCalling}
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
              disabled={isCalling}
            >
              {isCalling ? <CircularProgress color="secondary" /> : `Submit`}
            </Button>
            <small className={classes.textMuted}>
              Already have an account? <Link component={RouterLink} to="/login"> Login </Link>{' '}
            </small>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignupPage;
