import React, { Component } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Alert
} from "react-native";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";





class Gateway extends Component {

  constructor(){
    super()
    this.state = {
     username: undefined,
     password: undefined,
     debug:undefined
    };

  }

  login=()=>{
    let {username, password} = this.state

    if(!username || !password )
      Alert.alert("Error","fill the blanks")

   
  }

  showRegister = () => {};

  showLogin = () => {
    
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <Text>Username</Text>
          <TextInput style={styles.input}
            onChangeText={text=>this.setState({username:text})}
           />
        </View>

        <View style={styles.secondContainer}>
          <Text>Password</Text>
          <TextInput style={styles.input} 
          onChangeText={text=>this.setState({password:text})}
          secureTextEntry={true} />
        </View>

        <View style={styles.secondContainer}>
          <Button title="Login"
            onPress={this.login}
           />
        </View>

        <Text>Data</Text>
        <Text>{this.state.username}</Text>
        <Text>{this.state.password}</Text>

        <Text>Debug</Text>
        <Text>{this.state.debug}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    padding: 20,
    backgroundColor: "#E6E4ED"
  },
  secondContainer: {
    margin: 20
  },
  input: {
    backgroundColor: "#FFFF"
  }
});

export default Gateway;
