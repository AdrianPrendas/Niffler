import React, {Component} from 'react';

import {View, Text, TouchableOpacity, Modal, Alert, TextInput, Button} from 'react-native';

import MyTextInput from "./myTextInut"

import MyStyleSheet from './css/styles';

class Currencies extends Component {
  state = {
    
    modal: false,
  };

  add(){

    this.setState({modal: false})
  }

  render() {
    return (
      <View style={MyStyleSheet.dafault}>
        <Text>Currencies screen</Text>
        <Modal visible={this.state.modal}>

          <View style={MyStyleSheet.dafault}>
          
          <Text>New Register</Text>

          <MyTextInput
          placeholder="Amount"
          keyboardType="numeric"
          />

          <MyTextInput
          placeholder="Description"
          />



          <Button 
          title="add"
          onPress={()=>this.add()}
          />
          </View>
        </Modal>
        <TouchableOpacity onPress={()=>this.setState({modal: true})}>
          <Text>Open modal</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

export default Currencies;
