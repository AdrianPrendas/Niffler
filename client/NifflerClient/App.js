import React, {Component} from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import {Button} from 'react-native';


import DashBoard from './app/components/dashboard';
import Welcome from './app/components/welcome';
import Today from './app/components/today';
import Profile from './app/components/profile';
import Settings from './app/components/settings';
import Week from './app/components/week';

import Register from "./app/components/resgister"
import Login from "./app/components/Login"





const DashBoardTabNavigator = createBottomTabNavigator({
  Today,Week,Profile,Settings
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
  tabBarOptions:{
    activeBackgroundColor:"#BDBDBD",
    activeTintColor :"white",
    tabStyle :{paddingBottom:15}

  }
  
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
  Today,Week,Profile,Settings
})

const AppSwitchNavigation = createSwitchNavigator({
  Welcome:{screen:Welcome},
  Dashboard:{screen:AppDrawerNavigator},
  Register,
  Login

});

const AppContainer = createAppContainer(AppSwitchNavigation);

export default AppContainer;
