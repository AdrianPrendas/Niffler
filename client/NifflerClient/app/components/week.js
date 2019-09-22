import React, {Component} from 'react';

import {View, Text, StyleSheet, Modal, Alert, TextInput, Button} from 'react-native';


class Week extends Component {
  state = {
    month: "September",
    week:[
        {date:"22-09-19", day:"Sunday", amount:25},
        {date:"23-09-19", day:"Monday", amount:35},
        {date:"24-09-19", day:"Tuesday", amount:15},
        {date:"25-09-19", day:"Wednesday", amount:5},
        {date:"26-09-19", day:"Thuesday", amount:55},
        {date:"27-09-19", day:"Friday", amount:95},
        {date:"28-09-19", day:"Saturday", amount:125}
    ]

  };

  loadTable(register){
    return(<View style={{flex:1,borderBottomColor: 'black',borderBottomWidth: 0.5,}}>
        <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>

            <View style={{flex:1, margin:5, padding:5, alignItems:"center", backgroundColor:"#4CAF50"}}>
                <Text>{register.date}</Text>
            </View>

            <View style={{flex:1, margin:5, padding:5, alignItems:"center", backgroundColor:"#8BC34A"}}>
                <Text>{register.day}</Text>
            </View>

            <View style={{flex:1, margin:5, padding:5, alignItems:"center", backgroundColor:"#F44336"}}>
                <Text>₡{register.amount}</Text>
            </View>
                            
        </View>
    </View>)
  }

  render() {
      let {month,week} = this.state
    return (
      <View style={{flex:1}}>

        <View style={MyStyleSheet.header}>
            <View style={{flex:6,alignItems:"center",  padding:7}}>
                <Text style={{color:"white", fontSize:40, alignContent:"center", fontFamily: 'Shojumaru-Regular'}}>{month}</Text>
            </View>
            
            <View style={{flex:4, flexDirection:"row", justifyContent:"space-around"}}>

                <Text style={MyStyleSheet.textHeader}>Date</Text>
                <Text style={MyStyleSheet.textHeader}>Day</Text>
                <Text style={MyStyleSheet.textHeader}>Spended</Text>
            </View>
        </View>

        <View style={{flex:7}}>

            {week.map(e=>this.loadTable(e))}        

        </View>

        <View style={{flex:1, backgroundColor:"#F44336"}}>

            <View style={{flex:1,margin:15, backgroundColor:"#D32F2F",alignItems:"center"}}>
                <Text style={{color:"white", fontSize:35, alignContent:"center", }}>
                ₡{week.map(e=>e.amount).reduce((a,b)=>a+b)}
                </Text>
            </View>
            
        </View>

       
      </View>
    );
  }
}

const MyStyleSheet = StyleSheet.create({
    header: {      
        flex:2,
        backgroundColor: '#009688',
        justifyContent: "space-around",
    },
    textHeader: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      justifyContent:"space-between",
      backgroundColor:"#00796B",
      paddingLeft:10,
      paddingRight:10
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
      }
    });

export default Week;
