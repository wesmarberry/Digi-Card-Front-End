import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import CardView from './CardView'
import CardSearch from './CardSearch'

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      cardView: false
    };
  }

  componentDidMount() {
    this.props.findUser()
  }

  viewCard = () => {
    this.setState({
      cardView: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Welcome to Digi-Card {this.props.username}!
        </Text>

        {this.state.cardView ? <CardView userCard={this.props.userCard}/> : <TouchableOpacity onPress={this.viewCard}>
          <Text>
          View Your Card
          </Text>
        </TouchableOpacity>}

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