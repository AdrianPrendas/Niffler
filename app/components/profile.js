import React, {Component} from 'react';

import {View, Text, AsyncStorage, Alert, Button} from 'react-native';

import Proxy from "./proxy"

class Profile extends Component {

  state={
    proxy: new Proxy(),    
    user:undefined,
    token: undefined
  }

  componentDidMount(){
    let token = this.props.navigation.getParam("token")
    this.state.proxy.storeToken(token)
    this.loadUserData();
    this.setState({token})
  }

  loadUserData(){
    this.state.proxy.loadUser((user)=>{
      this.setState({user})
    })

  }

  logout(){
    this.state.proxy.logout(()=>{
      this.props.navigation.navigate("Welcome")
    })
  }

  render() {
    let {user, token} = this.state
    return (
      <View style={{flex:1}}>

        <View style={{flex:1}}>
          <View style={{flex:1, padding:20}}>
          <View style={{flex:1}}>
              <Text>{token && token}</Text>
            </View>
            <View style={{flex:1}}>
              <Text>{JSON.stringify(user,null,2)}</Text>
            </View>
          </View>
        </View>

        <View style={{flex:1}}>

          <View style={{padding:20}}>
            <Button
                title="logout"
                onPress={()=>this.logout()}
              />
          </View>

        </View>

        
      </View>
    );
  }
}

export default Profile;
