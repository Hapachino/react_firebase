import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { HOME, SIGN_UP } from '../../constants/routes';
import Input from '../Input';
import { withFirebase } from '../Firebase';

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  );
}

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async e => {
    e.preventDefault();

    const {
      props: {
        firebase,
        history,
      },
      state: {
        username,
        email,
        password,
      }, 
    } = this;
    
    try {
      const authUser = await firebase.doCreateUserWithEmailAndPassword(email, password);

      this.setState({ ...INITIAL_STATE });
      
      history.push(HOME);
    } catch(error) {
      this.setState({ error });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const {
      onChange, 
      onSubmit, 
      state: {
        username,
        email,
        password,
        passwordConfirm,
        error,
      },
    } = this;

    const isInvalid = 
      password !== passwordConfirm ||
      !password ||
      !email ||
      !username;

    return(
      <form onSubmit={onSubmit}>
        {Input(onChange, username, 'username', 'Full Name')}
        {Input(onChange, email, 'email', 'Email Address', 'email')}
        {Input(onChange, password, 'password', 'Password', 'password')}
        {Input(onChange, passwordConfirm, 'passwordConfirm', 'Confirm Password', 'password')}

        <button disabled={isInvalid}>
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
