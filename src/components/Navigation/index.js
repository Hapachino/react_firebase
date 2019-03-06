import React from 'react';
import { Link } from 'react-router-dom';

import { ACCOUNT, HOME, LANDING, SIGN_IN } from '../../constants/routes';
import SignOutButton from '../SignOut';

const authLinks = [
  {
    route: LANDING,
    text: 'Landing',
  },
  {
    route: ACCOUNT,
    text: 'Account',
  },
  {
    route: HOME,
    text: 'Home',
  },
  {
    component: <SignOutButton />,
  },
];

const nonAuthLinks = [
  {
    route: LANDING,
    text: 'Landing',
  },
  {
    route: SIGN_IN,
    text: 'Sign In',
  },
];

const renderLink = ({ route, text, component }) => {
  if (component) {
    return (
      <li key={Math.random()}>
        {component}
      </li>
    );
  }

  return (
    <li key={route}>
      <Link to={route}>{text}</Link>
    </li>
  );
};

const Navigation = ({ authUser }) => {
  return (
    <ul>
      {authUser 
        ? authLinks.map(renderLink)
        : nonAuthLinks.map(renderLink)}
    </ul>
  );
};

export default Navigation;
