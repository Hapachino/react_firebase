import React, { Component } from 'react';

const withAuthentication = WrappedComponent => {
  class WithAuthentication extends Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null })
        }
      );
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuthentication;
}

export default withAuthentication;