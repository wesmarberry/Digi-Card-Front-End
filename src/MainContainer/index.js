import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import UserHome from './UserHome/index.js'
import CardCreator from './CardCreator/index.js'

export default class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardCreated: false,
      username: '',
      userEmail: '',
      userCard: ''
    };
  }

  componentDidMount() {
    this.findUser()
    this.getCard()
  }

  findUser = async () => {
    try {
      console.log(this.state)
      const response = await fetch('http://localhost:9292/users/' + this.props.userId, {
        method: 'GET',
        credentials: 'include', // on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await response.json();
      
      if (parsedResponse.status === 200) {

        


        this.setState({
          username: parsedResponse.user.username,
          userEmail: parsedResponse.user.email
        })
      } 



      

     


    } catch (err) {
      console.log(err);
    }
  }

  cardCreated = () => {
    this.setState({
      cardCreated: true
    })
  }

  doesUserCardExist = (parsedResponse) => {
    for (let i = 0; i < parsedResponse.all_cards.length; i++) {
        if (all_cards[i].owner_id === this.props.userId) {
          return true
        } 
    }
    return false
  }

  getCard = async () => {
    try {
      console.log(this.state)
      const response = await fetch('http://localhost:9292/cards/' + this.props.userId, {
        method: 'GET',
        credentials: 'include', // on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await response.json();
      console.log(parsedResponse)
      if (parsedResponse.status === 200) {
        this.setState({
          cardCreated: true,
          userCard: parsedResponse.card
        })
      }



      

     


    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.cardCreated ? <UserHome userId={this.props.userId} findUser={this.findUser} resetLogin={this.props.resetLogin} userCard={this.state.userCard} username={this.state.username}/> : <CardCreator userId={this.props.userId} userEmail={this.state.userEmail} cardCreated={this.cardCreated}/>}

        
        <TouchableOpacity onPress={this.props.resetLogin}>
          <Text>
          Logout
          </Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 40
  }
});