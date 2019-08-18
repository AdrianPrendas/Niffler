import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Gateway from './app/components/gateway';
import Menu from './app/components/menu';

const navigation = createStackNavigator(
  {
    gateway: Gateway,
    menu: Menu,
  },
  {
    initialRouteName: 'gateway',
  },
);

export default createAppContainer(navigation);
