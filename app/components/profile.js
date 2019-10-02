import React, {Component} from 'react';

import {View, Text, Button} from 'react-native';

import { getUniqueId, getManufacturer } from 'react-native-device-info';

import Proxy from "./proxy"

class Profile extends Component {

  state={
    proxy: new Proxy(),    
    user:undefined,
    token: undefined,
    deviceId: '',
    manufacturerId:"",
  }

  getdeviceId = () => {
    //Getting the Unique Id from here
    getUniqueId().then(id=>{
      this.setState({ deviceId: id});
    })
    
    getManufacturer().then(id=>{
      this.setState({manufacturerId:id})
    })
    
  };

  componentDidMount(){
    let token = this.props.navigation.getParam("token")
    this.state.proxy.storeToken(token)
    this.loadUserData();
    this.getdeviceId()
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
    let {user, token, deviceId, manufacturerId} = this.state
    return (
      <View style={{flex:1}}>

        <View style={{flex:1}}>


          <View style={{flex:1, padding:20}}>
            
              <Text>
                {token && token}
              </Text>
            
            
              <Text>
                {JSON.stringify(user,null,2)}
              </Text>
            
            
              <Text>
                {deviceId}
              </Text>
            
              <Text>
                {manufacturerId}
              </Text>
            
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
