import React, { useState } from 'react';
import {
  Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, FormGroup, FormControlLabel, Switch
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';
import { isLoggedIn, signOut } from '../helpers';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexGrow: 1,
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
}));


const Header = () => {
  const classes = useStyles();
  const [anchorE1, setAnchorE1] = useState(null);
  const open = Boolean(anchorE1);

  return (
    <AppBar position="static" className={classes.bg}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>Mental<span style={{ fontSize: '28px' }}>.</span>ly</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isLoggedIn} onChange={() => signOut()} aria-label="login / logout switch" />}
            label={isLoggedIn ? 'Logout' : 'Login'} />
        </FormGroup>
        {isLoggedIn && (
          <>
            <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
              onClick={e => setAnchorE1(e.currentTarget)} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorE1}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={() => setAnchorE1(null)}
            >
              <MenuItem onClick={() => setAnchorE1(null)}>Profile</MenuItem>
              <MenuItem component="a" href="/users">Users</MenuItem>
              <MenuItem onClick={() => setAnchorE1(null)}>Settings</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
};

export default Header;
