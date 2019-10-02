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

import Proxy from "./proxy"



class Activity extends Component {
  state = {
    proxy: new Proxy(),
    registers: [],
    showInputModal: false,
    amount: 0,
    description: undefined,
    _id: undefined,
  };

  componentDidMount() {
    this.loadTransactions();
    
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.loadTransactions();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }
  
  loadTransactions() {
    
    this.state.proxy.loadTransactions((transactions)=>{
      this.setState({registers: transactions});
    })

  }

  createRegister(register) {
    return (<View style={css.row}>

              <View style={css.threeContainer}>
                <Text style={{ padding:5, color:"#757575",  fontWeight: 'bold'}}>{register.description}</Text>
                <Text style={{ padding:5, color:"#757575"}}>Created at {register.createdAt.toLocaleTimeString()}</Text>
                {register.updatedAt && <Text style={{ padding:5, color:"#757575", textAlign:"center"}}>Updated on {register.updatedAt.toString().split("G")[0]}</Text>}
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
            </View>);
  }

  createRegisterDay(day){
      return (<View style={css.day}>
                <View style={css.total}>
                  <Text style={{color:"#757575",  fontSize: 14,fontWeight: 'bold', paddingLeft:20}}>
                    Total on {day[0].createdAt.toDateString()}
                  </Text>
                  <Text style={{fontSize: 20,fontWeight: 'bold', paddingLeft:50}}>
                    {day.length!=0 && day.map(d=>d.amount).reduce((a,b)=>a+b).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </Text>
                </View>
          
                {day.map(r=>this.createRegister(r))}
              </View>
      )

  }


  fillScrollView(registers){
    let jsx = []
    for (const [_, year] of Object.entries(registers)) {
      for (const [__, month] of Object.entries(year)) {
        for (const [___, day] of Object.entries(month)) {
          jsx.push(this.createRegisterDay(day))
        }
      }
    }
    return jsx
  }

  add() {
    let {amount, description, proxy} = this.state;
    let register = {amount, description, createdAt: new Date()};

    proxy.save(register,()=>{
      this.setState({showInputModal: false, description:"", amount:0});
      this.loadTransactions();
    })

    
  }

  edited() {
    let {_id, amount, description, owner, proxy} = this.state;
    let register = {amount, description, owner, updatedAt: new Date};

    proxy.editTransaction(_id, register, ()=>{
      this.setState({showInputModal: false, description:"", amount:0, _id:undefined});
      this.loadTransactions();
    })

  }

  edit(register) {
    this.setState({showInputModal:true, ...register});
  }

  del(register) {
    this.state.proxy.deleteTransactions(register._id,()=>{
      this.loadTransactions();
    })
  }

  render() {
    let {_id, amount, description, registers } = this.state

    let sort = {}

    if(registers.length!=0){
      
      registers.sort((a,b)=>a.createdAt-b.createdAt)

      registers.forEach(r=>{
        let year = r.createdAt.getFullYear()
        let month = r.createdAt.getMonth()
        let day = r.createdAt.getDay()

        if(!sort[`${year}`])
          sort[`${year}`] = {}
        
        if(!sort[`${year}`][`${month}`])
          sort[`${year}`][`${month}`] = {}
          
        if(!sort[`${year}`][`${month}`][`${day}`])
          sort[`${year}`][`${month}`][`${day}`] = [r]
        else
          sort[`${year}`][`${month}`][`${day}`].push(r)
      })
      //Alert.alert("day",`${JSON.stringify(sort,null,2)}`)
    }
    
    return (
      <View style={css.screen}>

        <View style={MyStyleSheet.registerContainer}>
        <ScrollView ref="scrollView"
             onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
              
              {registers.length!=0  && this.fillScrollView(sort)}
            
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
