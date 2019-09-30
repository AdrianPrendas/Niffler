import React, {Component} from 'react';

import {View, StyleSheet, Modal, Alert, TextInput, Button,AsyncStorage} from 'react-native';

import {BarChart, Grid, XAxis} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import {Text} from 'react-native-svg';

class Week extends Component {
  state = {
    host: 'niffler-rest-api.herokuapp.com',
    registers: [],
  };

  componentDidMount() {
    this.loadTable();
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

      //reverse = dayToDay.reverse();

      data = dayToDay.map(day => {
        let d = day[0].createdAt.toString().split(' ')[0]
        let n = day[0].createdAt.toString().split(' ')[2]
        return {
          label:  `${d} ${n}` ,
          value: day.map(r => r.amount).reduce((a, b) => a + b),
        };
      });
    }

    let values = [...data];
    values.sort((a, b) => a.value - b.value);
    let CUT_OFF = data.length != 0 ? data[2].value : 0;

    const Values = ({x, y, bandwidth, data}) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={value.value < CUT_OFF ? y(value.value) - 10 : y(value.value) + 15}
          fontSize={14}
          fill={value.value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value.value}
        </Text>
      ));

    const Dates = ({x, y, bandwidth, data}) =>
      data.map((value, index) => (
        <Text
          key={value.label}
          x={x(index) + bandwidth / 2}
          y={190}
          fontSize={14}
          fill={'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value.label}
        </Text>
      ));

    return data.length!=0?(<BarChart
        style={{height: 200}}
        data={data}
        svg={{fill: '#009688'}}
        contentInset={{top: 30, bottom: 30}}
        yAccessor={({item}) => item.value}>
        <Grid />
        <Values />
        <Dates />
      </BarChart>
    ):(<View></View>)
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
