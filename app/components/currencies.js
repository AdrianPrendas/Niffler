import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert,Button} from 'react-native';

import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
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
    start_date: null,
    end_date:null,
    data:  [ 50, 10, 40, 95, -20, -80 ],
    labels:  [ 50, 10, 40, 95, -20, -80 ]
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
        start_date: date,
    });
  }

  onEndDateChange(date) {
    this.setState({
      end_date: date,
    });
  }

  request(){
    let { base, target, start_date, end_date, proxy } = this.state;

    if(!base || !target || !start_date || !end_date){
        return Alert.alert("err", `base, target, start date and end date are required`)    
    }
    

    start_date = start_date ? start_date.toISOString().split("T")[0] : '';
    end_date = end_date ? end_date.toISOString().split("T")[0] : '';

    let req = {
        base, 
        symbols:target, 
        start_date, 
        end_date
    }

    //Alert.alert("request", `${JSON.stringify(req,null,2)}`)

    
    proxy.exchageType(req,(data)=>{
            //Alert.alert("data", `${JSON.stringify(data,null,2)}`)
        this.setState({data:data.map(r=>r.value), labels:data.map(r=>r.date.getDate())})
    })
    

  }

  render() {
    let {data, labels} = this.state

    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30





    let { start_date, end_date } = this.state;
    start_date = start_date ? start_date.toISOString().split("T")[0] : '';
    end_date = end_date ? end_date.toISOString().split("T")[0] : '';

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
                        <Text>{ start_date }</Text>
                    </View>

                </View>

                <View style={{flex:1}}>

                    <CalendarPicker
                    onDateChange={this.onEndDateChange}
                    height="200"
                    />
            
                    <View style={{alignItems:"center"}}>
                        <Text>END DATE</Text>
                        <Text>{ end_date }</Text>
                    </View>

                </View>
            
            </View>
            <View style={{margin:10}}>
                <Button title="request" onPress={()=>this.request()}/>
            </View>
            
        </View>

        <View style={{ flex:1,  flexDirection: 'row' }}>
        <YAxis
                    data={data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
          
                <View style={{ flex: 1, marginLeft: 10 }}>
          
                    <LineChart
                        style={{ flex: 1 }}
                        data={data}
                        contentInset={verticalContentInset}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                    >
                        <Grid/>
                    </LineChart>
                    <XAxis
                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                        data={labels}
                        formatLabel={(value, index) => value}
                        contentInset={{ left: 10, right: 10 }}
                        svg={axesSvg}
                    />
                </View>


        </View>
    </View>);
  }
}

export default Currencies;
