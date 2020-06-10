import React, { useState, useEffect } from 'react';
import {
  Button, Grid, Paper, Typography, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, FormControlLabel, Switch, LinearProgress, Chip, Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, Add } from '@material-ui/icons';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
import Header from '../Header';

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
  table: {
    minWidth: 650,
  }
}));

const UsersList = () => {
  const classes = useStyles();
  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    //effect
    fetchUsers()

    return () => {
      //cleanup
      setUsers([]);
    }
  }, []);

  const fetchUsers = async () => {
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
      const { data: { data: users } } = await fetchBot(`${endPoints.users.uri}`, options);
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
              Users
            </Typography>
            <small className={classes.text_muted}>
              List of Platform Users
            </small>

            <br />
            <br />
            {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}

            <Button className={classes.submitSmall} type="reset" color="secondary" variant="contained" margin="normal">
              <Add titleAccess="register" />
            </Button>
            <Divider />

            {isCalling ? (
              <>
                <div className='message alert full-length loading'>Loading Users...</div>
                <LinearProgress />
              </>
            ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="users table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Last Name</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell align="center">Category</TableCell>
                      <TableCell colSpan="2">&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id} hover>
                        <TableCell component="th" scope="row">{user.last_name}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={user.is_patient ? 'Patient' : (user.specialist ? 'Specialist' : 'Administrator')}
                            color="secondary" style={{ alignItems: 'center' }} />
                        </TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={<Switch checked={user.is_active} size="small" aria-label={user.is_active ? 'active' : 'inactive'} />}
                            label={user.is_active ? 'active' : 'inactive'} />
                        </TableCell>
                        <TableCell align="center">
                          <Chip icon={<Face />} label="View" component="a" href={`/users/${user.id}`} clickable />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default UsersList;
