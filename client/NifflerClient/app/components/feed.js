import React, { Component } from 'react';

import {View, Text, Button} from 'react-native';

import MyStyleSheet from "./css/styles"

class Feed extends Component {
    state = {  }
    render() { 
        return (
            <View style={MyStyleSheet.dafault}>
              <Text>Feed</Text>
            </View>
          );
    }
}
 
export default Feed;