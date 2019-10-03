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
import Activity from './app/components/activity';
import Profile from './app/components/profile';
import Settings from './app/components/settings';
import Currencies from './app/components/currencies';
import Week from './app/components/week';

import Register from "./app/components/resgister"
import Login from "./app/components/Login"

import Icon from 'react-native-ionicons'
import {TouchableHighlight} from 'react-native';


const DashBoardTabNavigator = createBottomTabNavigator({
  Activity:{
    screen:Activity,
    navigationOptions:{
      tabBarIcon:({tintColor})=><Icon name={tintColor=="#757575"?"add-circle-outline":"add"} color={tintColor}/>
    }
  }
  ,Week:{
    screen:Week,
    navigationOptions:{
      tabBarIcon:({tintColor})=><Icon name={tintColor=="#757575"?"podium":"stats"} color={tintColor}/>
    }
  },
  Currencies:{
    screen:Currencies,
    navigationOptions:{
      tabBarIcon:({tintColor})=><Icon name={tintColor=="#757575"?"analytics":"pulse"} color={tintColor}/>
    }
  },Profile:{
    screen:Profile,
    navigationOptions:{
      tabBarIcon:({tintColor})=><Icon name={tintColor=="#757575"?"person":"body"} color={tintColor}/>
    }
  },Settings:{
    screen:Settings,
    navigationOptions:{
      tabBarIcon:({tintColor})=><Icon name={tintColor=="#757575"?"settings":"build"} color={tintColor}/>
    }
  }
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
    inactiveTintColor :"#757575",
    activeBackgroundColor:"#757575",
    activeTintColor :"white",
    showLabel: false,
    tabBarIcon:{tintColor:"white"}
  },
  resetOnBlur :true
})


const DashBoardStackNavigator = createStackNavigator({
  DashBoardTabNavigator: DashBoardTabNavigator
}
,{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft: <TouchableHighlight onPress={()=>{}}>
                    <Icon name="menu" onPress={navigation.openDrawer}/>                
                  </TouchableHighlight>
    }
  },
 
}
)

/*
 headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
*/

const AppDrawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen: DashBoardStackNavigator
  },
  Activity,Week,Currencies,Profile,Settings
})

const AppSwitchNavigation = createSwitchNavigator({
  Welcome:{screen:Welcome},
  Dashboard:{screen:AppDrawerNavigator},
  Register,
  Login

});

const AppContainer = createAppContainer(AppSwitchNavigation);

export default AppContainer;
