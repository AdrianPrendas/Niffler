import React, {Component} from 'react';

import {View, Text, Button, ScrollView, Alert} from 'react-native';

import MyStyleSheet from './css/styles';

class InputScreen extends Component {
  state = {
    registers: [
      {
        n: 0,
        value: 500,
        description: 'cevezas',
        dateTime: new Date(),
      },
    ],
  };
  
  componentDidMount() {
    let registers = [];
    for (let i = 1; i < 30; i++) {
      registers.push(i);
    }
    registers = registers.map(i => {
      return {
        n: this.state.registers[0].n + i,
        value: this.state.registers[0].value,
        description: this.state.registers[0].description,
        dateTime: this.state.registers[0].dateTime,
      };
    });

    this.setState({registers});
  }

  createRegister(register) {
    return (
      <View style={MyStyleSheet.row}>
        <View style={[MyStyleSheet.col, MyStyleSheet.col1]}>
          <Text>{register.n}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col2]}>
          <Text>₡{register.value}</Text>
        </View>
        <View style={[MyStyleSheet.col,MyStyleSheet.col3]}>
          <Text>{register.description}</Text>
        </View>
        <View style={[MyStyleSheet.col,MyStyleSheet.col4]}>
          <Text>{register.dateTime.toLocaleTimeString()}</Text>
        </View>
        <View style={[MyStyleSheet.col,MyStyleSheet.col5]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Button title="E" onPress={this.edit.bind(register)}/>
            </View>
            <View>
              <Button title="D" onPress={this.del.bind(register)}/>
            </View>
          </View>
        </View>
      </View>
    );
  }

  add() {
    Alert.alert('message', 'adding new register');
  }

  edit(register){
    Alert.alert('message', `editing register number: ${this.n}`);
  }

  del(register){
    Alert.alert('message', `deleting register number: ${this.n}`);
  }

  render() {
    return (
      <View style={MyStyleSheet.inputScreen}>
        <View style={[MyStyleSheet.header, MyStyleSheet.shadow]}>
          <Text style={[MyStyleSheet.textHeader,MyStyleSheet.col1]}>N</Text>
          <Text style={[MyStyleSheet.textHeader,MyStyleSheet.col2]}>Amount</Text>
          <Text style={[MyStyleSheet.textHeader,MyStyleSheet.col3]}>Description</Text>
          <Text style={[MyStyleSheet.textHeader,MyStyleSheet.col4]}>Time</Text>
          <Text style={[MyStyleSheet.textHeader,MyStyleSheet.col5]}>action</Text>
        </View>
        <View style={MyStyleSheet.registerContainer}>
          <ScrollView>
            {this.state.registers.map(r => this.createRegister(r))}
          </ScrollView>
        </View>

        <View style={[MyStyleSheet.result, MyStyleSheet.shadow]}>
            <View style={{flex: 8, backgroundColor: 'blue', justifyContent:"space-around", alignItems:"center"}}>
              <Text style={MyStyleSheet.textHeader}>Total</Text>
              <Text style={{color:"white", fontSize:30}}>
                ₡
                {this.state.registers.map(e => e.value).reduce((a, b) => a + b)}
              </Text>
            </View>
            <View style={{flex: 2, justifyContent:"center", alignItems:"center" }}>
              <Button title="add" onPress={this.add} />
            </View>
          </View>
      </View>
    );
  }
}

export default InputScreen;
