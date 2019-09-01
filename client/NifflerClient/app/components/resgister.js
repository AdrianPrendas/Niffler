import React, { Component } from 'react';


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

class Register extends Component {
    state = {  }
    render() { 
        return (<View style={styles.screen}>
            <Text style={styles.title}>Niffer</Text>
            <Image style={styles.img}
                source={require("./../assets/pictures/niffler_logo.jpg")}
            />
            <TextInput
                placeholder="username"
                
            />
        </View>  );
    }
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:"#0F7B47",
        justifyContent:"center",
        alignItems:"center"
    },
    img:{
        width:200,
        height:200
    },
    title:{
        fontSize:30,
        fontFamily:"Great Vibes"
        
    }
})
 
export default Register;