import React, {Component, useState,useEffect} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Proxy from "../components/proxy"



export default Login = (props)=> {

  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let [animating, setAnimating] = useState(false)
  let proxy = new Proxy()

  useEffect(()=>{
   

  },[])


    return (
      <View style={styles.screen}>
      
      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder="username" value={username}
        onChangeText={text => setUsername(text)}
      />

      <TextInput style={styles.input} placeholder="password" secureTextEntry={true} value={password}
        onChangeText={text =>setPassword(text)}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="back" color="red"
            onPress={() => props.navigation.navigate('Main')}
          />
        </View>
        <View style={styles.button}>
          <Button title="Login" color="#DFBD54"
            onPress={() => {
              setAnimating(true)
              proxy.login({username,password},()=>{
                setAnimating(false)
                props.navigation.navigate("MainTabNavigator")
              })
            }
              }
          />
        </View>
      </View>

      <View style={styles.container}>
          <ActivityIndicator
                    animating = {animating}
                    color = '#bc2b78'
                    size = "large"
                    style = {styles.activityIndicator}
                  />
      </View>

    </View>
    );
  
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
    height: 300,
  },
  title: {
    fontSize: 30,
  },
  input: {
    marginTop: 10,
    height: 40,
    width: 250,
    backgroundColor: '#AFAFAF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: 300,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 100,
    justifyContent: 'space-between',
  },
});
