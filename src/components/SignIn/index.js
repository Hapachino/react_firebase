import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { HOME } from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  )
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async e => {
    const { props: { firebase, history }, state: { email, password } } = this;

    e.preventDefault();

    try {
      await firebase.doSignInWithEmailAndPassword(email, password);

      this.setState({ ...INITIAL_STATE });

      history.push(HOME);
    } catch(error) {
      this.setState({ error });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}

export default SignInPage;
