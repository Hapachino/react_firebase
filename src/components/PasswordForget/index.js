import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { PASSWORD_FORGET } from '../../constants/routes';
import Input from '../Input';
import { withFirebase } from '../Firebase';

const PasswordForgetPage = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    const { props: { firebase }, state: { email } } = this;

    e.preventDefault();

    try {
      await firebase.doPasswordReset(email);

      this.setState({ ...INITIAL_STATE });
    } catch(error) {
      this.setState({ error });
    }
  };

  render() {
    const { onChange, onSubmit, state: { email, error } } = this;
    const isInvalid = !email;

    return (
      <form onSubmit={onSubmit}>
        {Input(onChange, email, 'email', 'Email Address')}

        <button disabled={isInvalid}>
          Reset Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
