import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class CardCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.userEmail,
      first_name: '',
      last_name: '',
      website: '',
      photo: '',
      linkedin: '',
      github: '',
      phone: '',
      background: '',
      owner_id: this.props.userId,
      message: ''
    };
  }

  

  createCard = async (e) => {
    
    

      try {
        console.log(this.state)
        const loginResponse = await fetch('http://localhost:9292/cards/create', {
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
          this.props.cardCreated()
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
          name='first_name'
          placeholder="First Name"
          autoCapitalize={false}
          onChangeText={(first_name) => this.setState({first_name})}
          value={this.state.first_name}
        />
        <TextInput
          style={{height: 40}}
          name='last_name'
          placeholder="Last Name"
          autoCapitalize={false}
          onChangeText={(last_name) => this.setState({last_name})}
          value={this.state.last_name}
        />
        <TextInput
          style={{height: 40}}
          autoCapitalize={false}
          name='website'
          placeholder="Website"
          onChangeText={(website) => this.setState({website})}
          value={this.state.website}
        />
        
        <TextInput
          style={{height: 40}}
          autoCapitalize={false}
          name='photo'
          placeholder="Photo Url"
          onChangeText={(photo) => this.setState({photo})}
          value={this.state.photo}
        />
        <TextInput
          style={{height: 40}}
          autoCapitalize={false}
          name='linkedin'
          placeholder="Linkedin"
          onChangeText={(linkedin) => this.setState({linkedin})}
          value={this.state.linkedin}
        />
        <TextInput
          style={{height: 40}}
          autoCapitalize={false}
          name='github'
          placeholder="Github"
          onChangeText={(github) => this.setState({github})}
          value={this.state.github}
        />
        <TextInput
          style={{height: 40}}
          autoCapitalize={false}
          name='phone'
          placeholder="Phone Number (xxx)-xxx-xxxx"
          onChangeText={(phone) => this.setState({phone})}
          value={this.state.phone}
        />
        <TextInput
          style={{height: 40}}
          autoCapitalize={false}
          name='background'
          placeholder="Background"
          onChangeText={(background) => this.setState({background})}
          value={this.state.background}
        />
        <TouchableOpacity onPress={this.createCard}>
          <Text>
          Create Card
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