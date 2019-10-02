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

class Week extends Component {
  state = {
    host: 'niffler-rest-api.herokuapp.com',
    registers: [],
  };

  componentDidMount() {
    this.loadTable();
    
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.loadTable();
  });
  }

  componentWillUnmount() {
    this.focusListener.remove();
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

  render() {
    let {registers} = this.state;

    let minDate = 0;
    let maxDate = 0;
    dayToDay = [];
    let data = [];

    if (registers.length != 0) {
      register = registers.sort(
        (a, b) => a.createdAt.getDate() - b.createdAt.getDate(),
      );
      minDate = registers[0].createdAt.getDate();
      maxDate = registers[registers.length - 1].createdAt.getDate();

      for (let i = minDate; i <= maxDate; i++) {
        let day = registers.filter(r => r.createdAt.getDate() === i);
        dayToDay.push(day);
      }
      dayToDay = dayToDay.filter(d=>d!=0)//cleaning array from empty values
      //Alert.alert("day",`${JSON.stringify(dayToDay,null,2)}`)

      //reverse = dayToDay.reverse();

      data = dayToDay.map(day => {
        
        let d = day[0].createdAt.toString().split(' ')[0]
        let n = day[0].createdAt.toString().split(' ')[2]
        return {
          label: `${d} ${n}`,
          value: day.map(r => r.amount).reduce((a, b) => a + b),
        };
      });
    }

    let values = [...data];
    values.sort((a, b) => a.value - b.value);
    
    let CUT_OFF = data.length != 0 ? values[0].value : 0;

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

    const Dates = ({x, y, bandwidth, data}) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={value.value > CUT_OFF ? x(0) + 10 : x(value.value) + 10}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={value.value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}>
          {value.label}
        </Text>
      ));
    let reverse = [...data];
    reverse.reverse();
    return data.length != 0 ? (
      <View style={{flexDirection: 'row', flex:1, paddingVertical: 16}}>
        <YAxis
          data={reverse}
          yAccessor={({index}) => index}
          scale={scale.ScaleBand}
          contentInset={{top: 10*data.length, bottom: 10*data.length}}
          spacing={0.2}
          numberOfTicks={6}
          formatLabel={(value, index) =>
            reverse[index] ? reverse[index].label : 0
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
