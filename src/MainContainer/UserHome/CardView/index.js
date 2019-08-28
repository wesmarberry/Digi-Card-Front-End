import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Hyperlink from 'react-native-hyperlink'

export default class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.userCard.first_name} {this.props.userCard.last_name}{"\n"}
          {this.props.userCard.phone}{"\n"}
          {this.props.userCard.email}
        </Text>

        <Image source={{url: this.props.userCard.photo}} />

        <Hyperlink >
          {this.props.userCard.website}{"\n"}
          {this.props.userCard.linkedin}{"\n"}
          {this.props.userCard.gihthub}
        </Hyperlink>

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