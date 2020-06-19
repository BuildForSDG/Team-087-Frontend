import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NotFound from './components/NotFound';
import UsersList from './components/users/List';
import DashBoard from './components/DashBoard';
import Recommedation from './components/users/Recommendation';
import { isLoggedIn } from './helpers';
import Verify from './components/auth/Verify';
import Appointment from './components/users/Appointment';
import Profile from './components/users/Profile';

/**
 *
 * @see https://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example
 * @see https://medium.com/the-andela-way/understanding-the-fundamentals-of-routing-in-react-b29f806b157e
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    props => (isLoggedIn ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)
  }
  />
);

const THEME = createMuiTheme({
  typography: {
    fontFamily: "'Raleway', sans-serif",
  },
});

const App = () => {
  return (
    <MuiThemeProvider theme={THEME}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/dashboard" component={DashBoard} />
          <PrivateRoute exact path="/neighbourhood-experts" component={Recommedation} />
          <PrivateRoute exact path="/appointments" component={Appointment} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={Signup} />
          <Route exact path="/verify" component={Verify} />
          <PrivateRoute exact path="/users" component={UsersList} />
          <PrivateRoute exact path="/users/:id" component={Profile} />
          <PrivateRoute exact path="/profile/:id?" component={Profile} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
