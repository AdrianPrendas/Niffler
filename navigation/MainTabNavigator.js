import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import Activity from '../screens/activity';
import Chart from '../screens/chart';
import Currencies from '../screens/currencies';
import Profile from '../screens/profile';


import Check from "../screens/check"





const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

const ActivityStack = createStackNavigator(
  {
    Activity,
  },
  config
);

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'calculator-variant'
      }
    />
  ),
};

ActivityStack.path = '';

//////////////////////////////////////////////////////////////////////////////////////////////////////

const ChartStack = createStackNavigator(
  {
    Chart,
  },
  config
);

ChartStack.navigationOptions = {
  tabBarLabel: 'Chart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'chart-bar'} />
  ),
};

ChartStack.path = '';

//////////////////////////////////////////////////////////////////////////////////////////////////////

const CurrenciesStack = createStackNavigator(
  {
    Currencies,
  },
  config
);

CurrenciesStack.navigationOptions = {
  tabBarLabel: 'Currencies',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon size={26} focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'finance'} />
  ),
};

CurrenciesStack.path = '';

//////////////////////////////////////////////////////////////////////////////////////////////////////

const ProfileStack = createStackNavigator(
  {
    Profile,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'minecraft'} />
  ),
};

ProfileStack.path = '';

//////////////////////////////////////////////////////////////////////////////////////////////////////

const CheckStack = createStackNavigator(
  {
    Check,
  },
  config
);

CheckStack.navigationOptions = {
  tabBarLabel: 'Check',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'basket'} />
  ),
};

ProfileStack.path = '';

//////////////////////////////////////////////////////////////////////////////////////////////////////

const tabNavigator = createBottomTabNavigator({
  ActivityStack,
  CheckStack,
  ChartStack,
  CurrenciesStack,
  ProfileStack,
},
{
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: routeName,
      headerTitleContainerStyle:{justifyContent:"flex-end"},
      headerLeftContainerStyle:{marginLeft:20}
    }
  }
})

tabNavigator.path = '';

export default tabNavigator;
