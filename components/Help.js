import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Help extends Component{
    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>Help screen</Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});  