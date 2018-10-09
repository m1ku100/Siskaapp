import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Profile extends Component{
    render() {

        const { navigation } = this.props;
        const judul = navigation.getParam('judul', '');
        //const otherParam = navigation.getParam('otherParam', 'some default value');

      return (
        

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This Title : {judul}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Home')}
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
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }
});  