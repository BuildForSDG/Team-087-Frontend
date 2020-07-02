import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, LinearProgress, Divider, ListItemIcon, ListItem, 
  ListItemText, List, TextField, CircularProgress, Button, Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CommentRounded, KeyboardReturn } from '@material-ui/icons';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
import Header from '../Header';
import Footer from '../Footer';

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
    flexGrow: 1,
    marginBottom: '20px'
  },
  paperChat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    // height: '100vh',
    minHeight: '30vh',
    flexGrow: 1,
    padding: theme.spacing(2, 0, 4),
    marginBottom: theme.spacing(2, 0, 4)
  },
  submitPost: {
    margin: theme.spacing(0, 0, 0, 1),
    padding: theme.spacing(3, 0),
    textTransform: 'none',
  },
  returnBtn: {
    margin: theme.spacing(3, 0),
    padding: theme.spacing(1),
    width: '30px'
  },
  textMuted: {
    color: 'grey',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const AppointmentInfo = (props) => {// style={{marginTop: "0"}}
  const classes = useStyles();
  const { match: { params: { id = 0 } }, history } = props;

  const [isCalling, setIsCalling] = useState(false);
  const [isCallingX, setIsCallingX] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [appointment, setAppointment] = useState({});
  const [chatPost, setChatPost] = useState('');


  const fetchAppointment = async (id) => {
    setIsCalling((prevIsCalling) => !prevIsCalling);
    setErrorFeedBack('');

    const options = {
      method: 'GET', mode: 'cors', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`
      },
    };

    try {
      const appointmentsEndpoint = `${endPoints.users.uri}${endPoints.users.paths.appointments}/${id}`;
      const { data } = await fetchBot(appointmentsEndpoint, options);

      setAppointment(data);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling((prevIsCalling) => !prevIsCalling);
  };

  useEffect(() => {
    fetchAppointment(id);

    return () => setAppointment({});
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsCallingX((prevIsCallingX) => !prevIsCallingX);
    setErrorFeedBack('');

    const options = {
      method: 'POST', mode: 'cors', body: JSON.stringify({ message: chatPost }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`
      },
    };

    try {
      const appointmentsEndpoint = `${endPoints.users.uri}${endPoints.users.paths.appointments}/${id}`;
      const { data } = await fetchBot(appointmentsEndpoint, options);

      appointment.chats.push(data);
      setAppointment(appointment);
      setChatPost('');
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCallingX((prevIsCallingX) => !prevIsCallingX);
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Hidden mdUp>&nbsp;</Hidden>
        <Header />

        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Appointment In-Details</Typography>
          <small className={classes.textMuted}>Details of appointment with conversation(s)</small>

          <br />
          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <Divider />

          {isCalling ? (
            <>
              <div className='message alert full-length loading'>Loading appointment details...</div>
              <LinearProgress color="secondary" />
            </>
          ) : (
            <>
              <Grid container spacing={1}>
                {appointment && (
                  <>
                    <Grid item className={classes.paperChat} xs={12} md={8} lg={8}>
                      <Typography variant="h6">Purpose</Typography>
                      <Divider />

                      <p>{appointment.purpose}</p>

                      <Button className={classes.returnBtn} type="reset" size="large" color="secondary"
                        onClick={history.goBack} variant="contained" margin="normal">
                        <KeyboardReturn />
                      </Button>
                    </Grid>

                    <Grid item className={classes.paperChat} xs={12} md={4} lg>
                      <Hidden mdUp><Divider /></Hidden>

                      <Typography variant="h6">Conversation(s)</Typography>
                      <Divider />

                      {appointment.chats && appointment.chats.length > 0 ? <List>
                        {(appointment.chats.map((chat) => (
                          <React.Fragment key={chat.id}>
                            <ListItem alignItems="flex-start">
                              <ListItemIcon><CommentRounded color="secondary" /></ListItemIcon>
                              <ListItemText primary={`${chat.user.first_name}....`} secondary={`${chat.message}`} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </React.Fragment>
                        )
                        ))}
                      </List> : <span style={{ display: 'block', padding: '20px 10px 30px' }}>There are no conversations for this appointment.</span>}

                      <form onSubmit={handleSubmit} autoComplete="off">
                        <Grid container>
                          <Grid item xs={10}>
                            <TextField multiline={true} rows={2} fullWidth variant="outlined" placeholder="Your Message" disabled={isCallingX}
                              required aria-required name="message" value={chatPost} onChange={(e) => setChatPost(e.target.value)} />
                          </Grid>
                          <Grid item xs={2}>
                            <Button className={classes.submitPost} type="submit" fullWidth variant="contained" color="secondary"
                              margin="normal" size="large" disabled={isCallingX}>
                              {isCallingX ? <CircularProgress color="secondary" /> : 'Post'}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </Grid>
                  </>)}
              </Grid>
            </>
          )}
        </Grid>

        {/* <Hidden mdUp></Hidden> */}
        <Footer />
      </Grid>
    </>
  );
};

export default AppointmentInfo;
