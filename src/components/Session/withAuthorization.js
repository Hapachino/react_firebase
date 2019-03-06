import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SIGN_IN } from '../../constants/routes'
import { withFirebase } from '../Firebase';

const withAuthorization = condition => WrappedComponent => {
  class WithAuthorization extends Component {
    componentDidMount() {
      const { firebase, history } = this.props;

      this.listener = firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            history.push(SIGN_IN);
          }
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    } 

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return compose(
    withFirebase,
    withRouter
  )(WithAuthorization);
}

export default withAuthorization;
