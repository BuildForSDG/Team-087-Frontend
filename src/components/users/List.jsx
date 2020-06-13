import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button, Grid, Paper, Typography, TableContainer, Table, TableHead,
  TableRow, TableCell, TableBody, FormControlLabel, Switch, LinearProgress, Chip, Divider, TablePagination
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchUsers = async (page, rowsPerPage) => {
    setIsCalling(true);
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
      const { data: { data: users, current_page, total } } = await fetchBot(`${endPoints.users.uri}?chunk=${rowsPerPage}&page=${page + 1}`, options);

      setUsers(users);
      setPage(current_page - 1);
      setTotal(total);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling(false);
  };

  useEffect(() => {
    //effect
    fetchUsers(page, rowsPerPage)

    return () => {
      //cleanup
      setUsers([]);
    }
  }, [rowsPerPage, page]);

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(++e.target.value);
    setPage(0);
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
            <Button className={classes.submitSmall} type="reset" color="secondary" variant="contained" margin="normal">
              <Add titleAccess="register" />
            </Button>

            {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
            <Divider />

            {isCalling ? (
              <>
                <div className='message alert full-length loading'>Loading Users...</div>
                <LinearProgress />
              </>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table stickyHeader className={classes.table} aria-label="users table">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Last Name</strong></TableCell>
                        <TableCell><strong>First Name</strong></TableCell>
                        <TableCell><strong>Gender</strong></TableCell>
                        <TableCell align="center"><strong>Category</strong></TableCell>
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
                          <TableCell align="left">
                            <FormControlLabel
                              control={<Switch checked={user.is_active} size="small" aria-label={user.is_active ? 'active' : 'inactive'} />}
                              label={user.is_active ? 'active' : 'inactive'} />
                          </TableCell>
                          <TableCell align="center">
                            <Chip icon={<Face />} label="View" component={RouterLink} to={`/users/${user.id}`} clickable />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination rowsPerPage={rowsPerPage} component="div" count={total} page={page}
                  onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default UsersList;
