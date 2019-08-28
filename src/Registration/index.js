import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      message: ''
    };
  }

 

  register = async (e) => {
    
    if (this.state.email === '') {
      this.setState({
        message: 'Please fill out all fields'
      })
    } else if (this.state.username === '') {
      this.setState({
        message: 'Please fill out all fields'
      })
    } else if (this.state.password === '') {
      this.setState({
        message: 'Please fill out all fields'
      })
    } else {
      if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({
        message: 'Passwords do not match'
      })
      } else {

        try {
          console.log(this.state)
          const loginResponse = await fetch('http://localhost:9292/users/register', {
            method: 'POST',
            credentials: 'include', // on every request we have to send the cookie
            body: JSON.stringify(this.state),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const parsedResponse = await loginResponse.json();
          
          if (parsedResponse.status === 200) {

            this.setState({
              message: parsedResponse.message,
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
      
    }

    
  }

  render() {
    return (
      <View style={styles.login}>
      <TextInput
          style={{height: 40}}
          name='email'
          placeholder="Email"
          autoCapitalize={false}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
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
        <TextInput
          style={{height: 40}}
          secureTextEntry={true}
          name='passwordConfirmation'
          placeholder="Confirm Password"
          onChangeText={(passwordConfirmation) => this.setState({passwordConfirmation})}
          value={this.state.passwordConfirmation}
        />
        <TouchableOpacity onPress={this.register}>
          <Text>
          Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.resetLogin}>
          <Text>
          Back to Login
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
  }
});