import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid, Typography, CardMedia, Card, CardContent, CardActions, Divider, Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
import { Face } from '@material-ui/icons';
import Layout, { Loader } from '../../shared/Layout';

const useStyles = makeStyles(theme => ({
  /* root: {
    height: '100vh',
    flexGrow: 1,
  }, */
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    minHeight: '80vh',
    padding: '20px',
    marginBottom: '20px'
  },
  /* form: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  /* submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2, 1, 2),
    fontSize: '1.2em',
    // backgroundColor: '#0c0032;',
    // borderRadius: 0,
    textTransform: 'none',
  },
  /* submitSmall: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(1, 1, 1),
    fontSize: '0.9em',
    textTransform: 'none',
    width: '30px'
  },
  bg: {
    backgroundColor: '#0c0032',
    color: '#ffffff',
  }, */
  title: {
    fontWeight: 'bolder',
    // marginTop: theme.spacing(3),
    // color: '#0c0032',
    flexGrow: 1,
  },
  /* text_white: {
    color: 'white',
    textDecoration: '0',
    textTransform: 'none',
  }, */
  textMuted: {
    color: 'grey',
  },
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));

const Recommedation = () => {
  const classes = useStyles();

  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [users, setUsers] = useState([]);

  const fetchSpecialists = async () => {
    setIsCalling((prevIsCalling) => !prevIsCalling);
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
      const recommendationsEndpoint = `${endPoints.users.uri}${endPoints.users.paths.recommendations}`;
      const { data: { data: users } } = await fetchBot(recommendationsEndpoint, options);
      setUsers(users);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling((prevIsCalling) => !prevIsCalling);
  };

  useEffect(() => {
    //effect
    fetchSpecialists();

    return () => setUsers([]);//cleanup
  }, []);


  return (
    <>
      <Layout>
        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Neighbourhood Specialists</Typography>
          <small className={classes.textMuted}>
            List of Mental-Health Specialists around you
          </small>

          <br />
          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <Divider />

          {isCalling ? <Loader message="nearby mental-health specialists" /> : (
            <>
              <Box className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                  {users && users.map((user) => (
                    <Grid item key={user.id} xs={6} sm={4} md={2}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={user.photo || `https://source.unsplash.com/random?doctor,specialist,psychiatrist,psychologist`}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {user.first_name} <strong>{user.last_name?.toUpperCase()}</strong>
                          </Typography>
                          <small className={classes.textMuted}>MD</small>
                        </CardContent>
                        <CardActions style={{background: "#cccccc", alignItems: 'right'}}>
                          <RouterLink to={`/users/${user.id}`} title="View"><Face color="secondary" /></RouterLink>                                

                          {/* <Button size="small" color="primary">
                            <Chip icon={<Face />} label="View" color="secondary" component={RouterLink} to={`/users/${user.id}`} clickable />
                          </Button> */}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          )}
        </Grid>
      </Layout>
    </>
  );
}

export default Recommedation;
