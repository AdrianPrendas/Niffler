import React, {Component} from 'react';

import {View, StyleSheet, Modal, Alert, TextInput, Button} from 'react-native';

import { BarChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import { Text } from 'react-native-svg'


class Week extends Component {
  state = {
  
  

  };

 
  render() {
 
    const data = [
      {
          value: 10,
          label: 'S',
      },
      {
          value: 1,
          label: 'M',
      },
      {
          value: 30,
          label: 'T',
      },
      {
          value: 40,
          label: 'W',
      },
      {
          value: 50,
          label: 'T',
      },
      {
        value: 60,
        label: 'F',
    },
    {
      value: 100,
      label: 'S',
  },
  ]
 const CUT_OFF = 20
  const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => (
        <Text
            key={ index }
            x={ x(index) + (bandwidth / 2) }
            y={ value.value < CUT_OFF ? y(value.value) - 10 : y(value.value) + 15 }
            fontSize={ 14 }
            fill={ value.value >= CUT_OFF ? 'white' : 'black' }
            alignmentBaseline={ 'middle' }
            textAnchor={ 'middle' }
        >
            {value.value}
        </Text>
    ))
)


    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>

          

        </View>
        <View style={{flex:1}}>
        <BarChart
            style={{ height: 200}}
            data={ data }
            svg={{ fill:'#009688' }}
            contentInset={{ bottom: 40, }}
            
            yAccessor={ ({ item }) => item.value }
        >
            <Grid/>
            <Labels/>
             <XAxis          
                    svg={{ fontSize: 10, fontWeight: 'bold' , fill: '#00796B' }}          
                    style={{ marginTop: 170}}
                    data={ data }
                    scale={scale.ScaleBand}
                    formatLabel={ (value, index) => data[index].label }
                    labelStyle={ { color: 'black' } }
                    contentInset={{ left: 20, right: 35 }}
                />
        </BarChart>
        </View>

        
      </View>
        
    )
}
}

const MyStyleSheet = StyleSheet.create({
    header: {      
        flex:2,
        backgroundColor: "#009688",
        justifyContent: "space-around",
    }
    });

export default Week;
