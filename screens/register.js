import React, {Component} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
} from 'react-native';


class Register extends Component {
  state = {
    user:{
      name:undefined,
      username:undefined,
      email:undefined,
      password:undefined
    },
    host: "niffler-rest-api.herokuapp.com",
    emailErr:undefined
  };

  register = () => {
    let {user, host} = this.state;

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
      this.setState({emailErr:true})
      return false
    }
    
    //return

    fetch(`http://${host}/api/register`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(json => {
        if(json.message){
          throw json.message 
        }
        let {user} = json
        Alert.alert('Success', `${user.username} registered`,[{text:"okay", onPress:()=>this.props.navigation.navigate("Login")}]);
      })
      .catch(err => {

        Alert.alert('Error', `cant not registered: ${err}`, [{text: 'Okay'}]);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        
       
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="name"
          placeholderTextColor="white"
          onChangeText={text =>
            this.setState({user: {...this.state.user, name: text}})
          }
          value={this.state.user.name}
        />
        <TextInput
          style={[styles.input, {color:this.state.emailErr?"red":"white"}]}
          placeholder="email"
          placeholderTextColor="white"
          keyboardType="email-address"
          onChangeText={text =>
            this.setState({user: {...this.state.user, email: text}})
          }
          value={this.state.user.email}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          placeholderTextColor="white"
          onChangeText={text =>this.setState({user: {...this.state.user, username: text}})}
          value={this.state.user.username}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={text =>this.setState({user: {...this.state.user, password: text}})}
          value={this.state.user.password}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button 
            title="back" 
            color="red"
            onPress={()=>this.props.navigation.navigate("Welcome")}
            />
          </View>
          <View style={styles.button}>
            <Button 
            title="register"
            color="#DFBD54"
            onPress={()=>this.register()}
             />
          </View>
        </View>
      </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 400,
    height: 220,
  },
  title: {
    fontSize: 30,
  },
  input: {
    marginTop: 10,
    height: 40,
    width: 250,
    color:"white",
    backgroundColor: '#AFAFAF',
    paddingHorizontal:10
  },
  buttonContainer: {
    width:300,
    margin: 10,
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  button:{
      width:100,
      justifyContent:"space-between"
  }
});

export default Register;
