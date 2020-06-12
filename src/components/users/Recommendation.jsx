import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, LinearProgress, CardMedia, Card, CardContent, Container, 
  Button, CardActions, Divider, Chip 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
import Header from '../Header';
import { Face } from '@material-ui/icons';

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
  submitSmall: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(1, 1, 1),
    fontSize: '0.9em',
    textTransform: 'none',
    width: '30px'
  },
  bg: {
    backgroundColor: '#0c0032',
    color: '#ffffff',
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    fontWeight: 'bolder',
    // marginTop: theme.spacing(3),
    // color: '#0c0032',
    flexGrow: 1,
  },
  text_white: {
    color: 'white',
    textDecoration: '0',
    textTransform: 'none',
  },
  text_muted: {
    color: 'grey',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
  },
  table: {
    minWidth: 650,
  }
}));

const Recommedation = () => {
  const classes = useStyles();
  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    //effect
    fetchSpecialists()

    return () => {
      //cleanup
      setUsers([]);
    }
  }, []);

  const fetchSpecialists = async () => {
    setIsCalling(true);

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

    setIsCalling(false);
  };


  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Header />

        <Grid item xs={12} lg>
          <Paper className={classes.paper}>
            <Typography variant="h5">
              Neighbourhood Specialists
            </Typography>
            <small className={classes.text_muted}>
              List of Mental-Health Specialists around you
            </small>

            <br />
            <br />
            {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
            <Divider />

            {isCalling ? (
              <>
                <div className='message alert full-length loading'>Loading nearby mental-health specialists...</div>
                <LinearProgress />
              </>
            ) : (
              <>
                <Container className={classes.cardGrid} maxWidth="md">
                  <Grid container spacing={4}>
                    {users.map((user) => (
                      <Grid item key={user.id} xs={12} sm={4} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardMedia}
                            image={user.photo || `https://source.unsplash.com/random`}
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                              {user.last_name} <strong>{user.first_name}</strong>
                            </Typography>
                            <Typography>
                              MD
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary">
                              <Chip icon={<Face />} label="View" color="secondary" component="a" href={`/users/${user.id}`} clickable />
                            </Button>
                            {/* <Button size="small" color="primary">
                              Edit
                            </Button> */}
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Container>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Recommedation;
