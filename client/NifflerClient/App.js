import React, {Component} from 'react';

import Gateway from './app/components/gateway';
import Menu from './app/components/menu';

import {View, Alert} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {user: undefined, host:undefined};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin({user, host}) {
    this.setState({user,host});
  }
  handleLogout(){
    this.setState({user:undefined})
  }

  render() {
    let { user, host } = this.state
    return (
      <View style={{flex: 1}}>
        {!this.state.user && <Gateway host={ host } loginHandler={this.handleLogin} />}
        {this.state.user && <Menu user={ user } logout={this.handleLogout}/>}
      </View>
    );
  }
}

export default App;
