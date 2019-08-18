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
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class Gateway extends Component {
  constructor() {
    super();
    this.state = {
      host: undefined,
      user: {
        _id: undefined,
        name: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
      },
      username: undefined,
      password: undefined,
      debug: undefined,
    };
  }

  login = () => {
    let {username, password} = this.state;

    Alert.alert('message', 'login');

    if (!username || !password) Alert.alert('Error', 'fill the blanks');

    let user = {username, password};

    fetch(`http://${this.state.host}.ngrok.io/api/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(json => {
        Alert.alert(
          'Success',
          `the user: ${json.user.name} is login`,
          [
            {text: 'continue', onPress: () => this.setState({user: json.user})},
           
          ],
          {cancelable: false},
        );
        
      })
      .catch(err => {
        Alert.alert('error', `The user: ${user.name} has not loged`);
      });
      //3424a784
  };

  componentDidUpdate(){
    if(this.state.user)
      this.props.navigation.navigate("menu");


  }

  showRegister = () => {};

  showLogin = () => {};

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.secondContainer}>
          <Text>HostId</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({host: text})}
          />
        </View>

        <View style={styles.secondContainer}>
          <Text>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({username: text})}
          />
        </View>

        <View style={styles.secondContainer}>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({password: text})}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.secondContainer}>
          <Button title="Login" onPress={this.login} />
        </View>

        <View>
          <Text>Data</Text>
          <Text>{this.state.username}</Text>
          <Text>{this.state.password}</Text>
        </View>

        <View>
          <Text>User:</Text>
          <Text>_id: {this.state.user._id}</Text>
          <Text>name: {this.state.user.name}</Text>
          <Text>username: {this.state.user.username}</Text>
          <Text>email: {this.state.user.email}</Text>
          <Text>password: {this.state.user.password}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: '#E6E4ED',
  },
  secondContainer: {
    margin: 20,
  },
  input: {
    backgroundColor: '#FFFF',
  },
});

export default Gateway;
