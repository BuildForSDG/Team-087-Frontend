import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, FormControlLabel, Switch, Divider, TablePagination, Fab
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face, PersonAdd } from '@material-ui/icons';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
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
  submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2, 1, 2),
    fontSize: '1.2em',
    // backgroundColor: '#0c0032;',
    // borderRadius: 0,
    textTransform: 'none',
  },
  /* form: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(3),
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
      }, */
  fab: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(2),
  },
  textMuted: {
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
      const usersEndpoint = `${endPoints.users.uri}?chunk=${rowsPerPage}&page=${page + 1}`;
      const { data: { data: users, current_page: pageNo, total } } = await fetchBot(usersEndpoint, options);

      setUsers(users);
      setPage(pageNo - 1);
      setTotal(total);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling((prevIsCalling) => !prevIsCalling);
  };

  useEffect(() => {
    //effect
    fetchUsers(page, rowsPerPage);

    return () => setUsers([]); //cleanup
  }, [rowsPerPage, page]);

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(++e.target.value);
    setPage(0);
  };


  return (
    <>
      <Layout>
        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Users</Typography>
          <small className={classes.textMuted}>
            List of Platform Users
          </small>

          <br />
          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <Divider />

          {isCalling ? <Loader message="users" /> : (
            <>
              <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} size="small" aria-label="users table">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Full Name</strong></TableCell>
                      <TableCell colSpan="2">&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id} hover>
                        <TableCell component="th" scope="row">
                          {user.first_name}{' '}<strong>{user.last_name?.toUpperCase()}</strong>
                          <Typography color="secondary" style={{ fontWeight: "bold" }}>
                            <small>
                              {user.is_patient ? 'Patient' : (!user.is_admin ? 'Specialist' : 'Administrator')}
                            </small>
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <FormControlLabel
                            control={<Switch checked={user.is_active} size="small"
                              aria-label={user.is_active ? 'active' : 'inactive'} />}
                            label={user.is_active ? 'active' : 'inactive'} labelPlacement="start" />
                        </TableCell>
                        <TableCell align="right">
                          <RouterLink to={`/users/${user.id}`}><Face color="secondary" /></RouterLink>
                          {/* <Chip icon={<Face />} label="View" component={RouterLink} 
                            to={`/users/${user.id}`} clickable /> */}
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

          <Fab color="secondary" disabled={isCalling} className={classes.fab}>
            <PersonAdd titleAccess="Add User" />
          </Fab>
        </Grid>
      </Layout>
    </>
  );
}

export default UsersList;
