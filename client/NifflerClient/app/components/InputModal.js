import React, {Component} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity, 
    Modal, 
    Alert, 
    TextInput, 
    Button
} from 'react-native';

import MyTextInput from "./myTextInut"

import MyStyleSheet from './css/styles';

class InputModal extends Component {
  state = {
    amount:0,
    Description:"",
    show: this.props.show,
  };

  add(){

    this.setState({show: false})
  }

  render() {
    return (
      <View style={MyStyleSheet.dafault}>
        <Text>InputModal screen</Text>
        <Modal visible={this.state.show}>

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
        <TouchableOpacity onPress={()=>this.setState({show: true})}>
          <Text>Open modal</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

export default InputModal;
