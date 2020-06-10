import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';

import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NotFound from './components/NotFound';
import DashBoard from './components/DashBoard';


const THEME = createMuiTheme ({
  typography: {
    fontFamily: "'Raleway', sans-serif",
  },
});

function App () {
  return (
    <MuiThemeProvider theme={THEME}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={Signup} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
