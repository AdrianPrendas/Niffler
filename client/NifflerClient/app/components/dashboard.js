import React, { Component } from 'react';

import {
    View,
    Text,
  } from 'react-native';

  import MyStyleSheet from "./css/styles"

class DashBoard extends Component {
    state = {  }
    render() { 
        return (
            <View style={MyStyleSheet.dafault}>
              <Text>DashBoard</Text>
              <Button
                title="logout"
                onPress={()=>this.props.navigation.navigate("Gateway")}
              />
            </View>
          );
    }
}
 
export default DashBoard;