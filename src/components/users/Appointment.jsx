import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid, Paper, Typography, Divider, TableContainer, Table, TableRow, TableHead,
  TableCell, TableBody, TablePagination, Chip, Link, Fab, Drawer
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BookOutlined, Info, Bookmark } from '@material-ui/icons';
import { endPoints, fetchBot, fetchToken } from '../../helpers';
import AppointmentForm from './AppointmentForm';
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
                          }, */
  submit: {
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
    }, */
  bg: {
    backgroundColor: '#0c0032',
    color: '#ffffff',
  },
  /* menuButton: {
      marginRight: theme.spacing(2)
    }, */
  fab: {
    position: 'fixed',
    bottom: theme.spacing(9),
    right: theme.spacing(2),
  },
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
  table: {
    minWidth: 650,
  },
  /* textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    }, */
}));

const Appointment = ({ match }) => {
  const classes = useStyles();
  const { id: userId } = match.params;

  const [isOpen, setIsOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [appointments, setAppointments] = useState([]);
  const [total, setTotal] = useState(0);

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(++e.target.value);
    setPage(0);
  };

  const handleBooking = (appointment) => {
    setTimeout(() => setIsOpen((prevIsOpen) => !prevIsOpen), 3000);
    setAppointments([...appointments, appointment]);
  };

  const fetchAppointments = async (userId, page, rowsPerPage) => {
    setIsCalling((prevIsCalling) => !prevIsCalling);
    setErrorFeedBack('');

    const options = {
      method: 'GET', mode: 'cors', headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`
      },
    };

    try {
      const pathVariable = userId ? `/${userId}` : '';
      const appointmentsEndpoint = `${endPoints.users.uri}${pathVariable}${endPoints.users.paths.appointments}?chunk=${rowsPerPage}&page=${page + 1}`;
      const { data: { data: appointments, current_page: pageNo, total } } = await fetchBot(appointmentsEndpoint, options);

      setAppointments(appointments);
      setPage(pageNo - 1);
      setTotal(total);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling((prevIsCalling) => !prevIsCalling);
  };

  useEffect(() => {
    //effect
    fetchAppointments(userId, page, rowsPerPage);

    return () => setAppointments([]);//cleanup
  }, [rowsPerPage, page, userId]);

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsOpen(isOpen);
  };

  return (
    <>
      <Layout>
        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Appointments</Typography>
          <small className={classes.textMuted}>List of scheduled/booked appointments</small>

          <br />
          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <Divider />

          {isCalling ? <Loader message="appointments" /> : (
            <>
              <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} size="small" aria-label="users table">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Purpose</strong></TableCell>
                      <TableCell colSpan="3">&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments && appointments.map(appointment => (
                      <TableRow key={appointment.id} hover>
                        <TableCell component="th" scope="row">
                          {appointment.purpose}
                          <br /><br />
                          <Chip icon={<Bookmark color="secondary" />} label={appointment.status || 'pending'}
                            color="secondary" size="small" />
                        </TableCell>
                        <TableCell align="center">&nbsp;</TableCell>
                        <TableCell align="left">&nbsp;</TableCell>
                        <TableCell align="right">
                          <Link component={RouterLink} to={`/appointments/${appointment.id}`}>
                            <Info color="secondary" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {total ? <TablePagination rowsPerPage={rowsPerPage} component="div" count={total} page={page}
                onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} /> : ''}
            </>
          )}

          <Fab color="secondary" className={classes.fab} disabled={isCalling} onClick={toggleDrawer(!isOpen)}>
            <BookOutlined titleAccess="Book Appointment" />
          </Fab>

          {/* // check for existence of appointment-id */}
          <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
            <AppointmentForm onBooking={handleBooking} userId={userId} isChecking={isCalling} />
          </Drawer>
        </Grid>
      </Layout>
    </>
  );
};

export default Appointment;
