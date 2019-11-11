import React, { Component } from "react";

import { StyleSheet, View, Text, Button, Modal, ScrollView, FlatList } from "react-native";
import MyTextInput from "../components/myTextInut";

import {ListItem2, Separator} from "../components/listItem"

import { CheckBox } from "react-native-elements";



class Check extends Component {
  state = {
    lista : [],
    showInputModal: false,
    update: false,
    description: "",
    id : 0
  };
  
  add(){
      let {lista, id, description, update} = this.state

        if(!update)
            lista.push({id: id++, description, checked:false, check:this.check.bind(this)})
        else
            lista = lista.map(e=>{
              if(e.id == id){
                e.description = description
              }
              return e
            })
        
        lista.sort((a,b)=> a.id - b.id)
        id = lista[lista.length-1].id + 1

      this.setState({lista, description:"", showInputModal: false, id, update:false})
  }

  check(description){
      let {lista} = this.state
    lista = lista.map(e=>{
        if (e.description == description){
            e.checked = !e.checked
        }
        return e
    })
    this.setState({lista})
  }

  update(item){
      this.setState({update:true, id:item.id, description:item.description, showInputModal:true})
  }

  delete(item){
    let {lista} = this.state
    this.setState({lista: lista.filter(e=>e.description!=item.description)})
  }

  render() {
      let {description, update} = this.state
    return (
      <ScrollView style={{flex:1}}>
       
       <FlatList
            data={this.state.lista}
            keyExtractor={item => item.description}
            renderItem={({ item }) => (
              <ListItem2
                register={item}
                onSwipeFromLeft={() => this.update(item)}
                onRightPress={() => this.delete(item)}
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
          />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginRight: 10,
            flexDirection: "row",
            margin: 20
          }}
        >
          <View style={{ width: 200 }}>
            <Button title={"NEW ITEM"}
            onPress={()=>this.setState({showInputModal:!this.state.showInputModal})}
            />
          </View>
        </View>

        

        <Modal visible={this.state.showInputModal} >
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text>{update?"EDIT ITEM":"NEW ITEM"}</Text>


            <MyTextInput
              placeholder="Description"
              onChangeText={text => this.setState({ description: text })}
              value={description}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 100
              }}
            >
              <Button
                title="Back"
                onPress={() => this.setState({ showInputModal: false })}
              />
              <Button
              title={update?"edit":"add"}
                onPress={() => this.add()}
              />
            </View>
          </View>
        </Modal>


        
      </ScrollView>
    );
  }
}

const css = StyleSheet.create({
  header: {
    flex: 2,
    backgroundColor: "#009688",
    justifyContent: "space-around"
  }
});

export default Check;

/*

    
*/
