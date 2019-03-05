import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { SIGN_UP } from '../../constants/routes';

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  )
}

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = e => {

  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderInput = (name, placeholder, type) => {
    const { onChange } = this;

    return (
      <input 
        type={type || 'text'} 
        name={Object.keys({ name })[0]}
        value={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }

  render() {
    const { onChange, onSubmit, renderInput } = this;
    const {
      username,
      email,
      password,
      passwordConfirm,
      error,
    } = this.state;

    return(
      <form onSubmit={onSubmit}>
        {renderInput(username, 'Full Name')}
        {renderInput(email, 'Email Address', 'email')}
        {renderInput(password, 'Password', 'password')}
        {renderInput(passwordConfirm, 'Password Confirm', 'password')}
        <button type="submit">Sign Up</button>

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

export default SignUpPage;
export { SignUpForm, SignUpLink };
