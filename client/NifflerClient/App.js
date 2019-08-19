import React, {Component} from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
//import Icon from 'react-native-vector-icons/FontAwesome';

import Gateway from './app/components/gateway';
import Menu from './app/components/menu';
import Main from './app/components/main';
import DashBoard from './app/components/dashboard';
import Welcome from './app/components/welcome';
import Feed from './app/components/feed';
import Profile from './app/components/profile';
import Settings from './app/components/settings';


const DashBoardTabNavigator = createBottomTabNavigator({
  Feed,Profile,Settings
},
{
  navigationOptions:({navigation})=>{
    const {routeName} = navigation.state.routes[navigation.state.index]
    return {headerTitle: routeName}
  },
  tabBarOptions:{
    style:{
      marginBottom:10,
      paddingBottom:10
    }
  }
}
)

const DashBoardStackNavigator = createStackNavigator({
  DashBoardTabNavigator: DashBoardTabNavigator
}
)

/*
,{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:<Icon style={{marginLeft: 10}}
      onPress={navigation.openDrawer}
      name="rocket" size={30} />
    }
  }
}
*/

const AppDrawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen: DashBoardStackNavigator
  }
})


const AppSwitchNavigation = createSwitchNavigator({
  Welcome:{screen:Welcome},
  Dashboard:{screen:AppDrawerNavigator},
  //Gateway: {screen: Gateway},
  //Menu: {screen: Menu},
  //Main:{screen:Main},
});

const AppContainer = createAppContainer(AppSwitchNavigation);

export default AppContainer;
