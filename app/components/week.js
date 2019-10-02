import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Modal,
  Alert,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView
} from 'react-native';

import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import {Text} from 'react-native-svg';

import Proxy from "./proxy"

class Week extends Component {
  state = {
    proxy: new Proxy(),
    transactions: [],
  };

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.loadTransactions();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  loadTransactions(){
    this.state.proxy.loadTransactions((transactions)=>{
      this.setState({transactions})
    })
  }


  fillScrollView(registers){
    let jsx = []
    for (const [_, day] of Object.entries(registers)) {
      jsx.push(this.createRegisterDay(day))
    }
    return jsx
  }


  render() {
    let {transactions} = this.state;
    let data = []
    let sort = {}

    if(transactions.length!=0){
      
      transactions.sort((a,b)=>a.createdAt-b.createdAt)

      transactions.forEach(r=>{
        let year = r.createdAt.getFullYear()
        let month = r.createdAt.getMonth()
        let day = r.createdAt.getDay()

        if(!sort[`${year}-${month}-${day}`])
          sort[`${year}-${month}-${day}`] = [r]
        else
          sort[`${year}-${month}-${day}`].push(r)
        
      })

      for (const [key, day] of Object.entries(sort)) {
        
        data.push({
          day: day[0].createdAt,
          label: day[0].createdAt.toDateString(),
          value: day.map(d=>d.amount).reduce((a,b)=>a+b)
        })

      }

      data.sort((a,b)=>a.day-b.day)

    }
    

   let dates = [...data];
   dates.sort((a, b) => b.day - a.day);

    let CUT_OFF = data.length == 0 ? 0 : Math.min(...data.map(r=>r.value))

    const Values = ({x, y, bandwidth, data}) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={value.value > CUT_OFF ? x(0) + 10 : x(value.value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={value.value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}>
          {value.value}
        </Text>
      ));

    let reverse = [...data];
    reverse.reverse();
    return data.length != 0 ? (
      <View style={{flexDirection: 'row', flex:1, paddingVertical: 16}}>
    <YAxis
          data={dates}
          yAccessor={({index}) => index}
          scale={scale.ScaleBand}
          contentInset={{top: 10*data.length, bottom: 10*data.length}}
          spacing={0.2}
          numberOfTicks={6}
          formatLabel={(value, index) =>
            reverse[index] ? dates[index].label : 0
          }
          svg={{fill: 'rgba(134, 65, 244, 0.8)', fontWeight:"bold"}}
        />
        <BarChart
          style={{flex: 1, marginLeft: 8}}
          data={data}
          horizontal={true}
          yAccessor={({item}) => item.value}
          svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
          contentInset={{top: 10, bottom: 10}}
          spacing={1}
          gridMin={0}>
          <Grid direction={Grid.Direction.VERTICAL} />
          <Values />
        </BarChart>
      </View>
    ) : (
      <View></View>
    );
  }
}

const MyStyleSheet = StyleSheet.create({
  header: {
    flex: 2,
    backgroundColor: '#009688',
    justifyContent: 'space-around',
  },
});

export default Week;

/*

    
*/