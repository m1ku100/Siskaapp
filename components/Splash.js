import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Splash extends Component{
    // componentDidMount(){
    //     setInterval(()=>{
    //         this.props.navigation.navigate('Main');
    //     },3000)
    // }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>Splash Screen</Text>
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