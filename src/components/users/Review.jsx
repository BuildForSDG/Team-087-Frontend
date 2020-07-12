import React, { useState, useEffect } from 'react';
import {
  LinearProgress, Divider, Fab, Grid, List, ListItem, ListItemText, ListItemIcon, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddComment, CommentRounded } from '@material-ui/icons';
import { endPoints, fetchBot, fetchToken } from '../../helpers';

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
    margin: '5px 10px 20px'
  },
  /* form: {
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
  }, */
  bg: {
    backgroundColor: '#0c0032',
    color: '#ffffff',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const Review = ({ userId, reviewsList = [] }) => {
  const classes = useStyles();

  const [isCalling, setIsCalling] = useState(false);
  const [errorFeedBack, setErrorFeedBack] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [reviews, setReviews] = useState(reviewsList);
  const [total, setTotal] = useState(0);

  /* const handleChangePage = (e, newPage) => { setPage(newPage); }
  
    const handleChangeRowsPerPage = (e) => {
      setRowsPerPage(++e.target.value);
      setPage(0);
    }; */

  const fetchReviews = async (userId, page, rowsPerPage) => {
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
      const pathVariable = userId && (userId !== 'me') ? `/${userId}` : '';
      const reviewsEndpoint = `${endPoints.users.uri}${pathVariable}${endPoints.users.paths.reviews}?chunk=${rowsPerPage}&page=${page + 1}`;
      const { data: { data: reviews = [], current_page: pageNo = 1, total } } = await fetchBot(reviewsEndpoint, options);

      setReviews(reviews);
      setPage(pageNo - 1);
      setRowsPerPage(rowsPerPage);// to-be-removed
      setTotal(total);
    } catch (err) {
      setErrorFeedBack(err.message);
    }

    setIsCalling((prevIsCalling) => !prevIsCalling);
  };

  useEffect(() => {
    //effect
    fetchReviews(userId, page, rowsPerPage);

    return () => setReviews([]); //cleanup
  }, [rowsPerPage, page, userId]);


  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item className={classes.paper} xs={12} lg>
          <Typography variant="h6">Review(s)</Typography>
          <Divider />

          <br />
          {errorFeedBack && <div className='message alert full-length alert-error'>{errorFeedBack}</div>}
          {/* <Divider /> */}

          {isCalling ? (
            <>
              <div className='message alert full-length loading'>Loading reviews...</div>
              <LinearProgress color="secondary" />
            </>
          ) : (
            <>
              {total > 0 ? <List>
                {(reviews && reviews.map((review) => (
                  <React.Fragment key={review.id}>
                    <ListItem alignItems="flex-start">
                      {/* <ListItemAvatar>
                        <Avatar alt="---" src="" />
                      </ListItemAvatar> */}
                      <ListItemIcon><CommentRounded color="secondary" /></ListItemIcon>
                      <ListItemText primary="....." secondary={`${review.remark} (${review.rating})`} />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                )
                ))}
              </List> : <span style={{display:'block', padding:'10px'}}>There are no reviews for this profile.</span>}
            </>
          )}

          <Fab color="secondary" className={classes.fab}>
            <AddComment titleAccess="Add Review" />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}

export default Review;
