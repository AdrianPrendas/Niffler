import React, {Component} from 'react';

import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  Modal,
  AsyncStorage,
} from 'react-native';

import MyTextInput from './myTextInut';

import MyStyleSheet from './css/styles';

class Today extends Component {
  state = {
    host: "niffler-rest-api.herokuapp.com",
    registers: [],
    showInputModal: false,
    amount: 0,
    description: undefined,
    _id: undefined,
  };

  componentDidMount() {
    this.loadTable()

  }

  retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        return token;
      }
    } catch (error) {
      Alert.alert('Error', `${error}`, [{text: 'Okay'}]);
    }
  };

  loadTable() {
    this.retrieveToken()
      .then(token => {
        fetch(`http://${this.state.host}/api/find-all-transactions`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          method: 'GET',
        })
          .then(res => res.json())
          .then(json => {
            let {transactions} = json;
            transactions = transactions.map(t => {
              t.createdAt = new Date(t.createdAt);
              return t;
            });
            this.setState({registers: transactions});
          })
          .catch(err => {
            Alert.alert('Error', `${err}`, [{text: 'Okay'}]);
          });
      })
      .catch(err => Alert.alert('Error', `${err}`, [{text: 'Okay'}]));
  }

  createRegister(n, register) {
    return (
      <View style={MyStyleSheet.row}>
        <View style={[MyStyleSheet.col, MyStyleSheet.col1]}>
          <Text>{n}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col2]}>
          <Text>₡{register.amount}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col3]}>
          <Text>{register.description}</Text>
        </View>
        <View style={[MyStyleSheet.col, MyStyleSheet.col4]}>
          <Text>
            {register.createdAt.getHours() +
              ':' +
              register.createdAt.getMinutes()}
          </Text>
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
    let {amount, description} = this.state;
    let register = {amount, description};
    let {host} = this.state

    this.retrieveToken().then(token => {
      fetch(`http://${host}/api/save-transaction`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: 'POST',
        body: JSON.stringify(register),
      })
        .then(res => res.json())
        .then(json => {
          let {transaction, message} = json
          if(message)
            throw message
          this.setState({showInputModal: false, description:"", amount:0});
          this.loadTable();
        })
        .catch(err => {
          Alert.alert('Error', `${err}`, [{text: 'Okay'}]);
        });
    });
  }

  edited() {
    let {_id, amount, description, owner, createdAT, updatedAt, host} = this.state;
    let register = {amount, description, owner};

    this.retrieveToken().then(token => {
      fetch(`http://${host}/api/update-transaction/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: 'PUT',
        body: JSON.stringify(register),
      })
        .then(res => res.json())
        .then(json => {
          this.setState({showInputModal: false, description:"", amount:0, _id:undefined});
          this.loadTable();
        })
        .catch(err => {
          Alert.alert('edited err', `${err}`, [{text: 'Okay'}]);
        });
    });
  }

  edit(register) {
    this.setState({showInputModal:true, ...register});
  }

  del(register) {
    let {_id} = register;
    let {host} = this.state
    this.retrieveToken().then(token => {
      fetch(`http://${host}/api/delete-transaction/${_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(json => {
          this.setState({showInputModal: false, description:"", amount:0, _id:undefined});
          this.loadTable();
        })
        .catch(err => {
          Alert.alert('edited err', `${err}`, [{text: 'Okay'}]);
        });
    });
  }

  render() {
    let {_id, amount, description, registers } = this.state
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
            {registers.length !=0 && registers.map((r, i) => this.createRegister(i+1, r))}
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
              ₡
              {registers.length != 0 && registers.map(e => parseInt(e.amount)).reduce((a, b) => a + b)}
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
                <Text>{this.state._id?"Edit Register":"New Register"}</Text>

                <MyTextInput
                  placeholder="Amount"
                  keyboardType="numeric"
                  onChangeText={text => this.setState({amount: text})}
                  value={amount}
                />

                <MyTextInput
                  placeholder="Description"
                  onChangeText={text => this.setState({description: text})}
                  value={description}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 100,
                  }}>
                  <Button
                    title="Back"
                    onPress={() => this.setState({showInputModal: false})}
                  />
                  <Button
                    title={this.state._id?"edit":"add"}
                    onPress={() =>
                      _id ?this.edited(): this.add()
                    }
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

export default Today;
