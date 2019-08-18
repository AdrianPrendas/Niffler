import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const BLUE = '#428AF8';
const LIGHT_GRAY = '#D3D3D3';

export default class MyTextInput extends React.Component {
  state = {
    isFocused: false,
  };

  handleFocus = event => {
    this.setState({isFocused: true});
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({isFocused: false});
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const {isFocused} = this.state;
    const {placeholder, onChangeText,value,secureTextEntry} = this.props;
    return (
      <TextInput style={styles.textInput}
        selectionColor={BLUE}
        underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 6,
    backgroundColor: '#FFFF',
  },
});
