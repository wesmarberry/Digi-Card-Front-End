/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Login from './src/Login'
import MainContainer from './src/MainContainer'
import Registration from './src/Registration'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      needToRegister: false,
      userId: ''
    };
  }

  userLoggedIn = (userId) => {
    this.setState({
      logged: true,
      needToRegister: false,
      userId: userId
    })
  }

  resetLogin = () => {
    this.setState({
      logged: false,
      needToRegister: false,
      userId: ''
    })
  }

  displayRegistration = () => {
    this.setState({
      needToRegister: true
    })
  }

  render() {
    let display = ''
    if (this.state.logged) {
      display = <MainContainer resetLogin={this.resetLogin} userId={this.state.userId}/>
    } else if (this.state.needToRegister) {
      display = <Registration userLoggedIn={this.userLoggedIn} resetLogin={this.resetLogin}/>
    } else {
      display = <Login userLoggedIn={this.userLoggedIn} displayRegistration={this.displayRegistration}/>
    }
    return (
      <View>
        {display}
      </View>
    );
  }
}




const styles = StyleSheet.create({
  
});


