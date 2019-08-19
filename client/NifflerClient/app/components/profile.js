import React, { Component } from 'react';

import {View, Text} from 'react-native';

import MyStyleSheet from "./css/styles"

class Profile extends Component {
    state = {  }
    render() { 
        return (
            <View style={MyStyleSheet.dafault}>
              <Text>Profile frame</Text>
            </View>
          );
    }
}
 
export default Profile;