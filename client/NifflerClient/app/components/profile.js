import React, {Component} from 'react';

import {View, Text} from 'react-native';

import MyStyleSheet from './css/styles';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        _id: undefined,
        name: undefined,
        username: undefined,
        email: undefined,
        password: undefined,
        ...props.user,
      },
    };
  }

  componentDidMount() {
    return
    let {user} = this.props.navigation.state.params;
    this.setState({user});
  }

  render() {
    return (
      <View style={MyStyleSheet.dafault}>
        <Text>Profile screen</Text>

        <View>
          
          <View>
           
            <Text>{JSON.stringify(this.state.user,undefined,2)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Profile;
