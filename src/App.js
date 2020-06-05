<<<<<<< HEAD
import React from 'react';
import './App.css';

function App () {
  return <div />;
}

export default App;
=======
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/join" component={Signup} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
>>>>>>> 98685b7d357394006f6ac85e7decb3c88c91087f
