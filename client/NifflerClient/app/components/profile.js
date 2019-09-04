import React, {Component} from 'react';

import {View, Text, AsyncStorage, Alert, Button} from 'react-native';

import MyStyleSheet from './css/styles';

class Profile extends Component {

  state={
    toke:""
  }

  componentDidMount(){
    let token = this.props.navigation.getParam("token")
    this._storeData(token)
    this.setState({token})
  }

  _storeData = async (token) => {
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
    return (
      <View style={MyStyleSheet.dafault}>
        <Text>Profile screen</Text>

        <View>
          <Text>{this.state.token}</Text>
          <Button
              title="logout"
              onPress={()=>this.logout()}
            />
        </View>
      </View>
    );
  }
}

export default Profile;
