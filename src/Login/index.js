import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      userId: '',
      needToRegister: false
    };
  }

 

  login = async (e) => {
    

    
    try {
      console.log(this.state)
      const loginResponse = await fetch('http://localhost:9292/users/login', {
        method: 'POST',
        credentials: 'include', // on every request we have to send the cookie
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json();
      const message = parsedResponse.message
      if (parsedResponse.status === 200) {

        


        this.setState({
          message: message,
          userId: parsedResponse.user.id
        })
        this.props.userLoggedIn(this.state.userId)
      } else {
        this.setState({
          message: parsedResponse.message
        })
      }



      

     


    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.login}>
        <TextInput
          style={{height: 40}}
          name='username'
          placeholder="Username"
          autoCapitalize={false}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          style={{height: 40}}
          secureTextEntry={true}
          name='password'
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={this.login}>
          <Text style={styles.whiteText}>
          Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={this.props.displayRegistration}>
          <Text style={styles.whiteText}>
          Register
          </Text>
        </TouchableOpacity>
        <Text>
          {this.state.message}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 300
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5
 
  },
  whiteText: {
    color: 'white',
    fontWeight: 'bold'
  }
});