import React, { useState, useEffect } from 'react';
import {
  Grid, Paper, Typography, LinearProgress, Divider, TableContainer, Table,
  TableRow, TableHead, TableCell, TableBody, TablePagination, Chip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Bookmark } from '@material-ui/icons';
// import { endPoints, fetchBot, fetchToken } from '../../helpers';
import Layout from '../shared/Layout';

const useStyles = makeStyles(theme => ({
  /* root: {
    height: '100vh',
    flexGrow: 1,
  }, */
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    height: '80vh',
    padding: '20px',
    marginBottom: '20px'
  },
  /* submit: {
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2, 1, 2),
    fontSize: '1.2em',
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    fontWeight: 'bolder',
    flexGrow: 1,
  }, */
  textMuted: {
    color: 'grey',
  },
  table: {
    minWidth: 650,
  }
}));

const Audits = () => {
  const classes = useStyles();

  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [audits, setAudits] = useState([]);
  const [total, setTotal] = useState(0);

  const handleChangePage = (e, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(++e.target.value);
    setPage(0);
  };

  const fetchData = () => {
    setIsCalling((prevIsCalling) => !prevIsCalling);
    setErrorFeedBack('');
    setAudits([]);
    setTotal(0);
  
    setIsCalling((prevIsCalling) => !prevIsCalling);
  }
  
  useEffect(() => {
    fetchData();// effect
  
    return () => setIsCalling(false) // cleanup
  }, []);

  return (
    <>
      <Layout>
        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Audit Logs</Typography>
          <small className={classes.textMuted}>
            List of audit-event records
          </small>

          <br />
          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <Divider />

          {isCalling ? (
            <>
              <div className='message alert full-length loading'>Loading audit-logs...</div>
              <LinearProgress color="secondary" />
            </>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} size="small" aria-label="users table">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Narration</strong></TableCell>
                      <TableCell colSpan="3">&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {audits && audits.map(audit => (
                      <TableRow key={audit.id} hover>
                        <TableCell component="th" scope="row">
                          {audit.narration}<br />
                          <strong>action:</strong>{audit.action}
                          <br /><br />
                          <Chip icon={<Bookmark color="secondary" />} label={audit.status} color="secondary" size="small" />
                        </TableCell>
                        <TableCell align="center">&nbsp;</TableCell>
                        <TableCell align="left">&nbsp;</TableCell>
                        <TableCell align="right">&nbsp;</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {total ? <TablePagination rowsPerPage={rowsPerPage} component="div" count={total} page={page}
                onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} /> : ''}
            </>
          )}
        </Grid>
      </Layout>
    </>
  );
};

export default Audits;
