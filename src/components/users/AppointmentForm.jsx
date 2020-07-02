import React, { useState } from "react";
import { Grid, TextField, Typography, CircularProgress, Button, Divider, Hidden } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
import Header from "../Header";
import Footer from "../Footer";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minHeight: '100vh',
    padding: '20px',
    marginBottom: '20px'
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2, 1, 2),
    fontSize: '1.2em',
    textTransform: 'none',
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    display: "block",
    margin: "20px 0px",
    width: 250,
  },
}));

const currentDate = (new Date()).toISOString().substr(0, 16);
const initialState = { purpose: '', starts_at: currentDate, ends_at: currentDate };


const AppointmentForm = (props) => {
  const classes = useStyles();
  const { isChecking, userId = 0, onBooking } = props;

  const [isCalling, setIsCalling] = useState(isChecking);
  const [appointment, setAppointment] = useState(initialState);

  const [successFeedBack, setSuccessFeedBack] = useState('');
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const handleChange = (e) => setAppointment({ ...appointment, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsCalling((prevIsCalling) => !prevIsCalling);
    setSuccessFeedBack('');
    setErrorFeedBack('');

    const options = {
      method: 'POST', mode: 'cors', body: JSON.stringify(appointment),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`
      },
    };

    try {
      const bookAppointmentEndpoint = `${endPoints.users.uri}/${userId}${endPoints.users.paths.appointments}`;
      const { message, data: pendingAppointment } = await fetchBot(bookAppointmentEndpoint, options);
      onBooking(pendingAppointment);

      setSuccessFeedBack(message);
      setAppointment(initialState);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling((prevIsCalling) => !prevIsCalling);
  };


  return (
    <>
      <Grid container className={classes.root}>
        <Hidden mdUp>
          <Header />
        </Hidden>

        <Grid item className={classes.paper} xs={12}>
          <Typography variant="h5">Book Appointment</Typography>

          <br />
          <Divider />

          <br />
          {successFeedBack && <div className='message alert full-length alert-success'>{successFeedBack}</div>}
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <br />

          <form onSubmit={handleSubmit} autoComplete="off">
            <TextField multiline={true} rows={4} fullWidth variant="outlined" label="Purpose"
              required aria-required name="purpose" value={appointment.purpose} onChange={handleChange} />

            <TextField id="datetime-from" label="From:" type="datetime-local" value={appointment.starts_at}
              required aria-required className={classes.textField} name="starts_at" onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />

            <TextField id="datetime-to" label="To:" type="datetime-local" value={appointment.ends_at}
              required aria-required className={classes.textField} name="ends_at" onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />

            <Button className={classes.submit} type="submit" fullWidth variant="contained" color="secondary"
              margin="normal" size="large" disabled={isCalling}>
              {isCalling ? <CircularProgress color="secondary" /> : `Submit`}
            </Button>
          </form>

          <Hidden mdUp><Footer /></Hidden>
        </Grid>
      </Grid>
    </>
  );
};

export default AppointmentForm;
