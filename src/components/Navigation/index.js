import React from 'react';
import { Link } from 'react-router-dom';

import { ADMIN, ACCOUNT, HOME, LANDING, SIGN_IN } from '../../constants/routes';

const links = [
  {
    route: ADMIN,
    text: 'Admin',
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
    route: LANDING,
    text: 'Landing',
  },
  {
    route: SIGN_IN,
    text: 'Sign In',
  },
];

const renderLink = ({ route, text }) => {
  return (
    <li key={route}>
      <Link to={route}>{text}</Link>
    </li>
  );
};

const Navigation = () => {
  return (
    <ul>
      {links.map(renderLink)}
    </ul>
  );
};

export default Navigation;
