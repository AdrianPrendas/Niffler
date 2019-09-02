import React, {Component} from 'react';

import {View, Text, AsyncStorage, Alert, Button} from 'react-native';

import MyStyleSheet from './css/styles';

class Profile extends Component {

    state = {
      user: {}
    }
  

  componentDidMount(){
    let user = this.props.navigation.getParam("user")
    this.setState({user})
    this._storeData(user)
  }

  _storeData = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      Alert.alert('Error', `Cannot storage user in AsyncStorage`, [{text: 'Okay'}]);
    }
  };

  logout = async()=>{
    try {
      await AsyncStorage.removeItem('user',(err)=>{
        if(err)
          Alert.alert('Error', `Cannot storage user in AsyncStorage: ${err}`, [{text: 'Okay'}]);
        else
          this.setState({user:undefined})
          this.props.navigation.navigate("Welcome")
      });
    } catch (error) {
      Alert.alert('Error', `Cannot storage user in AsyncStorage: ${error}`, [{text: 'Okay'}]);
    }
  }

  render() {
    return (
      <View style={MyStyleSheet.dafault}>
        <Text>Profile screen</Text>

        <View>
          
          <View>
            <Text>{JSON.stringify(this.state.user,undefined,2)}</Text>
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
