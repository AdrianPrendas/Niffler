import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert,Button} from 'react-native';

import {AreaChart, Grid} from 'react-native-svg-charts';
import {Circle, Path} from 'react-native-svg';

import Proxy from './proxy';

import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';

class Currencies extends Component {
  state = {
    proxy: new Proxy(),
    symbols: undefined,
    base:undefined,
    target:undefined,
    startDate: null,
    endDate:null
  };

  componentDidMount() {
    this.state.proxy.getSymbols(symbols => {
      let data = [];
      for (const [key, value] of Object.entries(symbols)) {
        data.push({label: `(${key}) ${value}`, value: key});
      }
      this.setState({symbols: data});
    });
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
  }

  onStartDateChange(date) {
    this.setState({
        startDate: date,
    });
  }

  onEndDateChange(date) {
    this.setState({
      endDate: date,
    });
  }

  request(){
    let { base, target, startDate, endDate } = this.state;

    startDate = startDate ? startDate.toISOString().split("T")[0] : '';
    endDate = endDate ? endDate.toISOString().split("T")[0] : '';

    Alert.alert("request", `base: ${base}, target: ${target}, startDate: ${startDate}, endDate: ${endDate}`)

  }

  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80,
    ];

    const Decorator = ({x, y, data}) => {
      return data.map((value, index) => (
        <Circle
          key={index}
          cx={x(index)}
          cy={y(value)}
          r={4}
          stroke={'rgb(134, 65, 244)'}
          fill={'white'}
        />
      ));
    };

    const Line = ({line}) => (
      <Path d={line} stroke={'rgba(134, 65, 244)'} fill={'none'} />
    );

    let { startDate, endDate } = this.state;
    startDate = startDate ? startDate.toISOString().split("T")[0] : '';
    endDate = endDate ? endDate.toISOString().split("T")[0] : '';

    return (
      <View style={{flex: 1}}>

        <View style={{ flex: 1}}>

            <View style={{ flex: 2, flexDirection: 'row', margin: 10,justifyContent: 'space-between'}}>
            
                <View style={{flex: 1}}>
                    {this.state.symbols && 
                        <RNPickerSelect
                            placeholder={{label: 'Base'}}
                            onValueChange={value => this.setState({base:value})}
                            items={this.state.symbols}
                        />
                    }
                </View>

                <View style={{flex: 1}}>
                    {this.state.symbols && 
                        <RNPickerSelect
                            placeholder={{label: 'Target'}}
                            onValueChange={value => this.setState({target:value})}
                            items={this.state.symbols}
                        />
                    }
                </View>

            </View>
            
            <View style={{ flex: 8,flexDirection:"row"}}>

                <View style={{flex:1}}>

                    <CalendarPicker
                    onDateChange={this.onStartDateChange}
                    height="200"
                    />
            
                    <View style={{alignItems:"center"}}>
                        <Text>START DATE</Text>
                        <Text>{ startDate }</Text>
                    </View>

                </View>

                <View style={{flex:1}}>

                    <CalendarPicker
                    onDateChange={this.onEndDateChange}
                    height="200"
                    />
            
                    <View style={{alignItems:"center"}}>
                        <Text>END DATE</Text>
                        <Text>{ endDate }</Text>
                    </View>

                </View>
            
            </View>
            <View style={{margin:10}}>
                <Button title="request" onPress={()=>this.request()}/>
            </View>
            
        </View>

        <View style={{flex: 1}}>
            <AreaChart
                style={{height: 200, flex: 1}}
                data={data}
                svg={{fill: 'rgba(134, 65, 244, 0.2)'}}
                contentInset={{top: 20, bottom: 30}}>
                    <Grid />
                    <Line />
                    <Decorator />
          </AreaChart>
        </View>
    </View>);
  }
}

export default Currencies;
