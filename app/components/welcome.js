import React, { Component } from 'react';

import {View, Text, Button, Alert, AsyncStorage, Image} from 'react-native';



class Welcome extends Component {
    state = {  }

    componentDidMount(){
      this._retrieveData()
    }

    _retrieveData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          this.props.navigation.navigate("Profile", {token})
        }
      } catch (error) {
        Alert.alert('Error', `${error}`, [{text: 'Okay'}]);
      }
    };

    render() { 
        return (
            <View style={{
                flex:1,
                alignItems:"center",
                justifyContent: "center",
                backgroundColor:"#F6F6F6"
            }}>
                <View style={{margin:10}}>
                <Button 
                title="Sing In"
                onPress={()=>this.props.navigation.navigate("Login")}
              />
                </View>

                <View>
                <Image
          style={{width:400,height:220}}
          source={require('./../assets/pictures/accounting.jpg')}
        />
                </View>
              
              <View style={{margin:10}}>
              <Button 
                title="Sing Up"
                onPress={()=>this.props.navigation.navigate("Register")}
              />
              </View>
            </View>
          );
    }
}
 
export default Welcome;