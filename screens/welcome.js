import React, { Component } from 'react';

import {View, Button} from 'react-native';

import Proxy from "../components/proxy"

export default class Welcome extends Component {
    state = { proxy: new Proxy() }

    componentDidMount(){
      this.state.proxy.retrieveToken()
      .then((token)=>{
        this.props.navigation.navigate("Profile")
      }).catch(err=>0)//catch to avoid warnings
    }


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
 