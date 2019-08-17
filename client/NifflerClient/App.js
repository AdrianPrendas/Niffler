/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';

import Gateway from './app/components/gateway';
import Menu from './app/components/menu';



import {
  View,
  StyleSheet
} from "react-native";

const App = () => {
  state={
    user:undefined
  }
  return (
    <View style={styles.container}>
      <Gateway/>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10
  }
 
});



export default App;
