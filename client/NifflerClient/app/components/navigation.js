import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';

import Gateway from './app/components/gateway';
import Menu from './app/components/menu';
import Main from './app/components/main';

const navigation = createStackNavigator(
  {
    gateway: Gateway,
    menu: Menu,
    main:Main
  },
  {
    initialRouteName: 'Menu',
  },
);

export default createAppContainer(navigation);
