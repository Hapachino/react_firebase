import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Input from '../Input';
import { withFirebase } from '../Firebase';
import { HOME, SIGN_UP } from '../../constants/routes';

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
      renderInput,
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
        {Input(username, 'username', 'Full Name')}
        {Input(email, 'email', 'Email Address', 'email')}
        {Input(password, 'password', 'Password', 'password')}
        {Input(passwordConfirm, 'passwordConfirm', 'Confirm Password', 'password')}

        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={SIGN_UP}>Sign UP</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
