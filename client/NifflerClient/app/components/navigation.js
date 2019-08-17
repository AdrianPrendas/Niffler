import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'

import Gateway from './app/components/gateway';
import Menu from './app/components/menu';

export default createStackNavigator({
    gateway: Gateway,
    menu: Menu
});