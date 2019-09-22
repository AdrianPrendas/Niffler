import React, {Component} from 'react';

import {View, Text, AsyncStorage, Alert, Button} from 'react-native';

import MyStyleSheet from './css/styles';

class Profile extends Component {

  state={
    toke:"",
    host: "niffler-rest-api.herokuapp.com",
    user:undefined
  }

  componentDidMount(){
    let token = this.props.navigation.getParam("token")
    this.storeToken(token)
    this.setState({token})
    this.loadUserData(token);
  }

  loadUserData(token){
    let {host} = this.state
    fetch(`http://${host}/api/who-i-am`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      method: 'GET',
    })
      .then(res =>res.json())
      .then(json => {
        let {user} = json;
       this.setState({user})
      })
      .catch(err => {
        Alert.alert('Error', `Username/Password mismatch: ${err}`, [{text: 'Okay'}]);
      });

  }

  storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      Alert.alert('Error', `Cannot storage token in AsyncStorage`, [{text: 'Okay'}]);
    }
  };

  logout = async()=>{
    try {
      await AsyncStorage.removeItem('token',(err)=>{
        if(err)
          Alert.alert('Error', `Can not remove token from AsyncStorage: ${err}`, [{text: 'Okay'}]);
        else{
          this.setState({token:undefined})
          this.props.navigation.navigate("Welcome")
        }
      });
    } catch (error) {
      Alert.alert('Error', `Can not remove Token from AsyncStorage: ${error}`, [{text: 'Okay'}]);
    }
  }

  render() {
    let {user, token} = this.state
    return (
      <View style={{flex:1}}>

        <View style={{flex:1}}>
          <View style={{flex:1, flexDirection:"row", padding:20}}>
          <View style={{flex:1}}>
              <Text>{token && token}</Text>
            </View>
            <View style={{flex:1}}>
              <Text>{user && "Name: " + user.name}</Text>
              <Text>{user && "Username: " + user.username}</Text>
              <Text>{user && "Email: " + user.email}</Text>
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
