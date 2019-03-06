import React, { Component } from 'react';

import Input from '../Input';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  password: '',
  passwordConfirm: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    const { props: { firebase }, state: { password } } = this;

    e.preventDefault();

    try {
      await firebase.doPasswordUpdate(password);

      this.setState({ ...INITIAL_STATE });
    } catch(error) {
      this.setState({ error });
    }
  };

  render() {
    const { onChange, onSubmit, state: { password, passwordConfirm, error } } = this;
    const isInvalid = !password || password !== passwordConfirm;

    return (
      <form onSubmit={onSubmit}>
        {Input(onChange, password, 'password', 'New Password', 'password')}
        {Input(onChange, passwordConfirm, 'password', 'Confirm New Password', 'password')}

        <button disabled={isInvalid}>
          Reset Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
