import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Welcome from '../screens/welcome';
import Login from '../screens/login';
import Register from '../screens/register';
import Profile from '../screens/profile';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Welcome,
    Login,
    Register,
    MainTabNavigator,
  })
);
