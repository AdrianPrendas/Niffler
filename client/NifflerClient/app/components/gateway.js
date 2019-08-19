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
      host: props.host,
      user: {
        _id: undefined,
        name: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
      },
    };
    this.props.navigation.setParams({hideHeader:true})
  }

  login=()=>{
    this.props.navigation.push("Menu", {user, host})
    let { username, password } = this.state.user;
    let { host } = this.state;
    
    if(!this.state.host){
      return Alert.alert('Error', 'the host is needed');
    }

    if (!username && !password){
      return Alert.alert('Error', 'fill the blanks');
    }

    let user = { username, password };
  
    fetch(`http://${host}.ngrok.io/api/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(json => {
        let {user} = json
        Alert.alert(
          'Success',
          `the user: ${user.name} is loged`)
          this.setState({user})
          this.props.navigation.setParams({user, host})
          this.props.navigation.push("Menu", {user, host})
      })
      .catch(err => {
        Alert.alert('Error', `Username/Password mismatch`, [{text: 'Okay'}]);
      });
  };

  register =()=>{

    let {user, host} = this.state

    fetch(`http://${host}.ngrok.io/api/register`, {
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
          `the user: ${json.username} registered`)
      })
      .catch(err => {
        Alert.alert('Error', `cant not registered`, [{text: 'Okay'}]);
      });

  }

  render() {
    return (
      <View style={styles.firstContainer}>

       
          <Image
          style={{
            flex:0.68,
            height: null,
            resizeMode: 'contain',
            width: null,
          }}
          source={img}
          />
       

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
                onChangeText={text => this.setState({user: {...this.state.user,name: text}})}
                value={this.state.user.name}
                placeholder="Name"
              />
            </View>

            <View style={styles.inputContainer}>
              
              <MyTextInput
                style={styles.input}
                onChangeText={text => this.setState({user: {...this.state.user,email: text}})}
                value={this.state.user.email}
                placeholder="Email"
              />
            </View>

            <View style={styles.login}>
              <Text style={styles.title}>Login</Text>

              <View style={styles.inputContainer}>
                <MyTextInput
                  style={styles.input}
                  onChangeText={text => this.setState({user: {...this.state.user,username: text}})}
                  value={this.state.user.username}
                  placeholder="Username"
                />
              </View>

              <View style={styles.inputContainer}>
                <MyTextInput
                  style={styles.input}
                  onChangeText={text => this.setState({user: {...this.state.user,password: text}})}
                  value={this.state.user.password}
                  secureTextEntry={true}
                  placeholder="Password"
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Login" onPress={this.login} />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Register" onPress={this.register} />
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
    margin: 5,
  },
  inputContainer: {
    margin: 5,
  },
  buttonContainer: {
    margin: 5,
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
    margin: 30,
    backgroundColor: '#009688',
  },
  label: {
    color: 'white',
  },
});

export default Gateway;
