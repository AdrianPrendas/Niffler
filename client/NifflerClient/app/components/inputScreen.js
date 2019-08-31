import React, {Component} from 'react';

import {View, Text, Button, ScrollView, Alert, Modal} from 'react-native';

import MyTextInput from './myTextInut';

import MyStyleSheet from './css/styles';

class InputScreen extends Component {
  state = {
    registers: [],
    showInputModal: false,
    n:0,
    amount: 0,
    description: '',
    edited: undefined
  };

  createRegister(register) {
    return (
      <View style={MyStyleSheet.row}>
        <View style={[MyStyleSheet.col, MyStyleSheet.col1]}>
          <Text>{register.n}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col2]}>
          <Text>₡{register.amount}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col3]}>
          <Text>{register.description}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col4]}>
          <Text>{register.dateTime.getHours()+":"+register.dateTime.getMinutes()}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col5]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Button title="E" onPress={() => this.edit(register)} />
            </View>
            <View>
              <Button title="D" onPress={() => this.del(register)} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  add() {
    let {registers, n, amount, description} = this.state

    registers.push({n,amount,description,dateTime: new Date(Date.now()) })

    this.setState({registers, showInputModal:false, n:n+1, amount:0, description:""})
  }

  edited(){

    let {registers, amount, description, edited} = this.state

    registers = registers.filter(r => r.n != edited)

    registers.push({n:edited,amount,description,dateTime: new Date(Date.now()) })

    registers = registers.sort((a,b)=>a.n-b.n)

    this.setState({registers, showInputModal:false, amount:0, description:"", edited: undefined})


  }


  edit(register) {

    let {n, amount, description} = register

    this.setState({showInputModal:true, edited:n, amount, description })
  }

  del(register) {
    let {registers} = this.state
    registers = registers.filter(e=>e.n!=register.n)
    this.setState({registers})
  }

  render() {
    return (
      <View style={MyStyleSheet.inputScreen}>
        <View style={[MyStyleSheet.header, MyStyleSheet.shadow]}>
          <Text style={[MyStyleSheet.textHeader, MyStyleSheet.col1]}>N</Text>
          <Text style={[MyStyleSheet.textHeader, MyStyleSheet.col2]}>
            Amount
          </Text>
          <Text style={[MyStyleSheet.textHeader, MyStyleSheet.col3]}>
            Description
          </Text>
          <Text style={[MyStyleSheet.textHeader, MyStyleSheet.col4]}>Time</Text>
          <Text style={[MyStyleSheet.textHeader, MyStyleSheet.col5]}>
            action
          </Text>
        </View>
        <View style={MyStyleSheet.registerContainer}>
          <ScrollView>
            {this.state.registers.map(r => this.createRegister(r))}
          </ScrollView>
        </View>

        <View style={[MyStyleSheet.result, MyStyleSheet.shadow]}>
          <View
            style={{
              flex: 8,
              backgroundColor: 'blue',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={MyStyleSheet.textHeader}>Total</Text>
            <Text style={{color: 'white', fontSize: 30}}>
              ₡{this.state.registers.length!=0&&this.state.registers.map(e => parseInt(e.amount)).reduce((a, b) => a + b)}
            </Text>
          </View>
          <View
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <Button
              title="add"
              onPress={() => this.setState({showInputModal: true})}
            />
            <Modal visible={this.state.showInputModal}>
              <View style={MyStyleSheet.dafault}>
                <Text>New Register</Text>

                <MyTextInput
                  placeholder="Amount"
                  keyboardType="numeric"
                  onChangeText={text => this.setState({amount: text})}
                  value={this.state.amount}
                />

                <MyTextInput
                  placeholder="Description"
                  onChangeText={text => this.setState({description: text})}
                  value={this.state.description}
                />
                <View style={{flexDirection:"row", justifyContent:"space-between", width:100}}>
                  <Button
                    title="Back"
                    onPress={() => this.setState({showInputModal: false})}
                  />
                  <Button 
                  title="add" 
                  onPress={() => !this.state.edited ? this.add(): this.edited()} 
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

export default InputScreen;
