import React, {Component} from 'react';

import MyTextInput from './myTextInut';

import img from "./pictures/logo.png"

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
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {placeholder} from '@babel/types';

class Gateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: undefined,
      user: {
        _id: undefined,
        name: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
      },
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
            {
              text: 'continue',
              onPress: () => {
                this.setState({user: json.user});
                this.props.navigation.navigate('menu');
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(err => {
        Alert.alert('Error', `Username/Password mismatch`, [{text: 'Okay'}]);
      });
    //3424a784
  };

  showRegister = () => {};

  showLogin = () => {};

  render() {
    return (
      <View style={styles.firstContainer}>

        <View style={{flex:0.4}}>
          <Image
          style={{
            flex:1,
            height: null,
            resizeMode: 'contain',
            width: null,
          }}
          source={img}
          />
        </View>

        <View style={styles.secondContainer}>
          <View style={styles.inputContainer}>
            <MyTextInput
              placeholder={'HostId'}
              onChangeText={text => this.setState({host: text})}
              value={this.state.host}
            />
          </View>

          <View style={styles.register}>
            <Text style={styles.title}>Register</Text>

            <View style={styles.inputContainer}>
              <MyTextInput
                style={styles.input}
                onChangeText={text => this.setState({user: {name: text}})}
                value={this.state.name}
                placeholder="Name"
              />
            </View>

            <View style={styles.inputContainer}>
              
              <MyTextInput
                style={styles.input}
                onChangeText={text => this.setState({user: {email: text}})}
                value={this.state.email}
                placeholder="Email"
              />
            </View>

            <View style={styles.login}>
              <Text style={styles.title}>Login</Text>

              <View style={styles.inputContainer}>
                <MyTextInput
                  style={styles.input}
                  onChangeText={text => this.setState({user: {username: text}})}
                  value={this.state.username}
                  placeholder="Username"
                />
              </View>

              <View style={styles.inputContainer}>
                <MyTextInput
                  style={styles.input}
                  onChangeText={text => this.setState({user: {password: text}})}
                  value={this.state.password}
                  secureTextEntry={true}
                  placeholder="Password"
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Login" onPress={this.login} />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Register" />
            </View>

            <View style={{display: 'none'}}>
              <Text>User:</Text>
              <Text>_id: {this.state.user._id}</Text>
              <Text>name: {this.state.user.name}</Text>
              <Text>username: {this.state.user.username}</Text>
              <Text>email: {this.state.user.email}</Text>
              <Text>password: {this.state.user.password}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    backgroundColor: '#BDBDBD',
  },
  secondContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  inputContainer: {
    margin: 10,
  },
  buttonContainer: {
    margin: 10,
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#FFFF',
  },
  title: {
    fontFamily: 'verdana',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  register: {
    margin: 10,
    backgroundColor: '#00796B',
  },
  login: {
    margin: 20,
    backgroundColor: '#009688',
  },
  label: {
    color: 'white',
  },
});

export default Gateway;
