import React, {Component} from 'react';

import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  Modal,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-ionicons'

import MyTextInput from './myTextInut';

import MyStyleSheet from './css/styles';



class Activity extends Component {
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

  createRegister(register) {
    return (
        <View style={css.row}>


        <View style={css.threeContainer}>
          <Text style={{ padding:5, color:"#757575",  fontWeight: 'bold'}}>{register.description}</Text>
          <Text style={{ padding:5, color:"#757575"}}>{register.createdAt.toLocaleTimeString()}</Text>
        </View>


        <View style={css.threeContainer}>  

        <Text style={{fontWeight: 'bold', fontSize:15}}>{register.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>

          <View style={{justifyContent:"space-between", flexDirection:"row-reverse",width:100}}>

            
            <Icon 
              name="close-circle" 
              style={{color:"#D32F2F", fontSize:20}}  
              onPress={() => this.del(register)} 
            />
            
            <Icon 
              name="create" 
              style={{color:"#FBC02D", fontSize:20}}
              onPress={()=>this.edit(register)}
            />                
            
                      
          </View>

        </View>
        </View>
      
    );
  }

  createRegisterDay(day){

    
      return (
        <View style={css.day}>
          <View style={css.total}>
            <Text style={{color:"#757575",  fontSize: 14,fontWeight: 'bold', paddingLeft:20}}>Total on {day[0].createdAt.toDateString()}</Text>
            <Text style={{fontSize: 20,fontWeight: 'bold', paddingLeft:50}}>
            {day.length!=0 && day.map(d=>d.amount).reduce((a,b)=>a+b).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Text>
          </View>
          
            {day.map(r=>this.createRegister(r))}
          
        </View>
      )

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

    let minDate = 0
    let maxDate = 0
    dayToDay = []
    
    if(registers.length!=0){
      
      register = registers.sort((a,b)=>a.createdAt.getDate()-b.createdAt.getDate())
      minDate = registers[0].createdAt.getDate()
      maxDate = registers[registers.length-1].createdAt.getDate()

      for(let i=minDate;i<=maxDate;i++){
        let day = registers.filter(r=>r.createdAt.getDate()===i)
        dayToDay.push(day)
      }
      //Alert.alert("day",`${JSON.stringify(dayToDay)}`)
    }
    
    return (
      <View style={css.screen}>

        <View style={MyStyleSheet.registerContainer}>
        <ScrollView ref="scrollView"
             onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
              
              {registers && dayToDay.map(d=>this.createRegisterDay(d))}
            
              <View style={css.add}>
                
                <TouchableHighlight onPress={() => this.setState({showInputModal: true,_id:undefined, description:undefined})}>
                  <View style={{alignItems:"center"}}>
                    <Text style={{color:"white",  fontWeight: 'bold',textAlign:"right"}}>ADD NEW REGISTERS</Text>
                    <Icon name="add" 
                          color="white"
                    />
                  </View>
                </TouchableHighlight>
                  
              </View>

          </ScrollView>
        </View>

       
       
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
    );
  }
}

import {StyleSheet} from 'react-native';

const css = StyleSheet.create({
  add:{
    backgroundColor:"#2196F3",
    flexDirection: "row",
    justifyContent:"center",
    alignContent: "center",
    alignItems:"center",
  },
  total:{
    flex:1
  },
  description:{
    flex:1
  },
  screen:{
    flex:1,
    backgroundColor:"#F3F3F3"
  },
  header: {
    flex: 0.3,
    paddingBottom:10,
    paddingTop:10,
    backgroundColor: '#D32F2F',
    flexDirection: 'row',
    justifyContent:"space-around"
  },
  shadow:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  row: {
    backgroundColor:"#FAFAFA",
    
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  threeContainer:{
    flex:1, 
    alignItems:"center",
  },
  day:{
    margin:10,
    backgroundColor:"white",
    
    borderBottomColor: 'gray',
    borderBottomWidth: 0.9,
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff'
  }

})

export default Activity;
