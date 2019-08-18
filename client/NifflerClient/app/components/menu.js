import React, { Component } from 'react';


import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button
  } from "react-native";

class Menu extends Component {
    state = {  }
    render() { 
        return (<View>
            <Text>MENU</Text>
            <Button
            title="reset"
            onPress={this.props.reset}
            />
            </View>  );
    }
}
 
export default Menu;