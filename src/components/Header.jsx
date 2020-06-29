import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Typography, AppBar, Toolbar, IconButton, Menu, MenuItem, FormGroup, FormControlLabel, Switch
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircleOutlined, Menu as MenuIcon, NotificationsOutlined } from '@material-ui/icons';
import { isLoggedIn, signOut, fetchFirstName } from '../helpers';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    flexGrow: 1,
  },
  bg: {
    backgroundColor: '#ffffff',
    color: '#0c0032',
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

  return (
    <AppBar position="static" className={classes.bg}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon color="secondary" />
        </IconButton>
        <Typography variant="h6" className={classes.title}>Mental<span style={{ fontSize: '28px' }}>.</span>ly</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isLoggedIn} onChange={() => signOut()} aria-label="login / logout switch" />}
            label={isLoggedIn ? 'Logout' : 'Login'} />
        </FormGroup>
        
        {isLoggedIn && (
          <>
            <IconButton aria-label="notifications" aria-controls="menu-appbar" aria-haspopup="false"
              onClick={e => setAnchorE1(null)} color="inherit">
              <NotificationsOutlined color="secondary" titleAccess="Notifications" />
            </IconButton>
 
            <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
              onClick={e => setAnchorE1(e.currentTarget)} color="inherit">
              <AccountCircleOutlined color="secondary" />
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
              open={Boolean(anchorE1)}
              onClose={() => setAnchorE1(null)}
            >
              <MenuItem dense color="secondary">Hi! &nbsp; <strong>{fetchFirstName()}</strong></MenuItem>
              <MenuItem dense component={NavLink} to="/profile">Profile</MenuItem>
              <MenuItem dense component={NavLink} to="/users">Users</MenuItem>
              <MenuItem dense component={NavLink} to="/neighbourhood-experts">Recommendations</MenuItem>
              <MenuItem dense component={NavLink} to="/appointments">Appointments</MenuItem>
              <MenuItem dense component={NavLink} to="/groups">Care Groups</MenuItem>
              <MenuItem dense component={NavLink} to="/audits">Audits</MenuItem>
              <MenuItem dense onClick={() => setAnchorE1(null)}>Settings</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
};

export default Header;
