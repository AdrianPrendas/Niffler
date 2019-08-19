import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: { 
        _id: undefined,
        name: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
        ...props.user
      }
    };
  }

  render() {
    return (
      <View>
        <Text>MENU</Text>
        <View>
          <Text>User:</Text>
          <Text>_id: {this.state.user._id}</Text>
          <Text>name: {this.state.user.name}</Text>
          <Text>username: {this.state.user.username}</Text>
          <Text>email: {this.state.user.email}</Text>
          <Text>password: {this.state.user.password}</Text>
        </View>
        <Button
            title="logout"
            onPress={this.props.logout}
        />
      </View>
    );
  }
}

export default Menu;
