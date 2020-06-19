import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, LinearProgress, Divider, Card, CardMedia, CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
import Header from '../Header';
import Review from './Review';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexGrow: 1,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    height: '100vh',
    padding: '20px',
    marginBottom: '20px'
  },
  bg: {
    backgroundColor: '#0c0032',
    color: '#ffffff',
  },
  title: {
    fontWeight: 'bolder',
    flexGrow: 1,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Profile = ({ match }) => {
  const classes = useStyles();

  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [userId] = useState(match.params.id || 'me');
  const [user, setUser] = useState(undefined);

  const fetchData = async (userId) => {
    setIsCalling(prevIsCalling => !prevIsCalling);
    setErrorFeedBack('');

    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`
      },
    };

    try {
      const { data: user } = await fetchBot(`${endPoints.users.uri}/${userId}`, options);
      setUser(user);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling(prevIsCalling => !prevIsCalling);
  };

  useEffect(() => {
    //effect
    fetchData(userId);

    return () => setUser(undefined); //cleanup
  }, [userId]);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Header />

        <Grid container item className={classes.paper} xs={12} lg>
          <Typography variant="h5">
            Profile
          </Typography>

          <br />
          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <Divider />

          {isCalling ? (
            <>
              <div className='message alert full-length loading'>Loading profile...</div>
              <LinearProgress />
            </>
          ) : (
            <>
              {user && (
                <>
                  <Grid item key={user.id} xs={12} sm={4} md={3}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={user.photo || `https://source.unsplash.com/random?doctor,specialist,psychiatrist,psychologist`}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {user.first_name} <strong>{user.last_name}</strong>
                        </Typography>
                        <Typography>
                          MD
                        </Typography>
                      </CardContent>
                      {/* <CardActions>
                        <Button size="small" color="primary">
                        <Chip icon={<Face />} label="View" color="secondary" component={RouterLink} to={`/users/${user.id}`} clickable />
                        </Button>
                    </CardActions> */}
                    </Card>
                  </Grid>

                  <Review />
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </>
  )
};

export default Profile;
