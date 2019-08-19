import React, { Component } from 'react';

import {View, Text,Button, Alert} from 'react-native';

class Welcome extends Component {
    state = {  }
    render() { 
        return (
            <View style={{
                flex:1,
                alignItems:"center",
                justifyContent: "center"
            }}>
                <View style={{margin:10}}>
                <Button 
                title="Login"
                onPress={()=>this.props.navigation.navigate("Dashboard")}
              />
                </View>
              
              <View style={{margin:10}}>
              <Button 
                title="Sing Up"
                onPress={()=>Alert.alert("Sing Up")}
              />
              </View>
            </View>
          );
    }
}
 
export default Welcome;