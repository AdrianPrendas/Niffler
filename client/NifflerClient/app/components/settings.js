import React, { Component } from 'react';

import {View, Text} from 'react-native';

import MyStyleSheet from "./css/styles"

class Settings extends Component {
    state = {  }
    render() { 
        return (
            <View style={MyStyleSheet.dafault}>
              <Text>Settings screen</Text>
            </View>
          );
    }
}
 
export default Settings;