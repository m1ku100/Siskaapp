import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';



export default class Edit extends Component{
    
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Splash Screen</Text>
        <Button
          title="Go Back"
          onPress={() => this.props.navigation.navigate('Profile')}
        />
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