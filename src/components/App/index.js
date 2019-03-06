import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import AccountPage from '../Account';
import AdminPage from '../Admin';
import HomePage from '../Home';
import LandingPage from '../Landing';
import Navigation from '../Navigation';
import PasswordForgetPage from '../PasswordForget';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';

import { ADMIN, ACCOUNT, HOME, LANDING, PASSWORD_FORGET, SIGN_IN, SIGN_UP } from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser } = this.state;

    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
          <div>
            <Navigation />

            <hr />

            <Route exact path={LANDING} component={LandingPage} />
            <Route path={ACCOUNT} component={AccountPage} />
            <Route path={ADMIN} component={AdminPage} />
            <Route path={HOME} component={HomePage} />
            <Route path={PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={SIGN_IN} component={SignInPage} />
            <Route path={SIGN_UP} component={SignUpPage} />
          </div>
        </Router>
      </AuthUserContext.Provider>
    );
  }
}

export default withFirebase(App);
