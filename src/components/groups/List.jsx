import React, { useState, useEffect } from 'react';
import { 
  Grid, Typography, LinearProgress, Divider, Fab, ListItem, List, ListItemIcon, ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GroupAdd, GroupWork } from '@material-ui/icons';
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
    height: '100vh',
    padding: '20px',
    marginBottom: '20px'
  },
  submit: {
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
  }
}));

const GroupsList = () => {
  const classes = useStyles();

  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [groups, setGroups] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    setIsCalling((prevIsCalling) => !prevIsCalling);
    setErrorFeedBack('');

    setTimeout(() => {
      setGroups([]);
      setTotal(0);
    }, 4000);

    setIsCalling((prevIsCalling) => !prevIsCalling);
  }

  useEffect(() => {
    fetchData();// effect

    return () => setIsCalling(false) // cleanup
  }, [])

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Header />

        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h5">Care Groups</Typography>
          <small className={classes.textMuted}>
            List of neighbourhood care-groups
          </small>

          <br />
          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          <Divider />

          {isCalling ? (
            <>
              <div className='message alert full-length loading'>Loading care-groups...</div>
              <LinearProgress color="secondary" />
            </>
          ) : (
            <>
              {total > 0 ? <List>
                {(groups && groups.map((group) => (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon><GroupWork color="secondary" /></ListItemIcon>
                      <ListItemText primary="....." secondary={`${group.name}`} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                )
                ))}
              </List> : <span style={{display:'block', padding:'10px'}}>There are no care-groups yet..</span>}
            </>
          )}

          <Fab color="secondary" className={classes.fab}>
            <GroupAdd titleAccess="Create Group" />
          </Fab>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default GroupsList;