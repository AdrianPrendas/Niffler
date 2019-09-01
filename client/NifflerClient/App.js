import React, {Component} from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import {Button} from 'react-native';

import Gateway from './app/components/gateway';
import Menu from './app/components/menu';
import Main from './app/components/main';
import DashBoard from './app/components/dashboard';
import Welcome from './app/components/welcome';
import InputScreen from './app/components/inputScreen';
import Profile from './app/components/profile';
import Settings from './app/components/settings';





const DashBoardTabNavigator = createBottomTabNavigator({
  InputScreen,Profile,Settings
},
{
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return {
      headerTitle: routeName,
      headerTitleContainerStyle:{justifyContent:"flex-end"},
      headerLeftContainerStyle:{marginLeft:20}
    }
  },
  
}
)

const DashBoardStackNavigator = createStackNavigator({
  DashBoardTabNavigator: DashBoardTabNavigator
}
,{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:<Button 
      onPress={navigation.openDrawer}
      title="DashBoard" size={30} />
    }
  }
}
)

const AppDrawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen: DashBoardStackNavigator
  },
  InputScreen,Profile,Settings, Main
})


const AppSwitchNavigation = createSwitchNavigator({
  Welcome:{screen:Welcome},
  Dashboard:{screen:AppDrawerNavigator},
  Gateway: {screen: Gateway},
  //Menu: {screen: Menu},
  //Main:{screen:Main},
});

const AppContainer = createAppContainer(AppSwitchNavigation);

export default AppContainer;
