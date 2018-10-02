import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Container, Content, Icon} from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';

//Screen
import CardComponent from './CardComponent';
import cardComponent from './CardComponent';

export default class Splash extends Component{

    render() {
      return (
        <Container>
          <Content>
            <CardComponent company="Apa saja" jobtitle="Butcher" />
            <CardComponent company="PT tati" jobtitle="Police"/>
            <CardComponent company="asdsd" jobtitle="Security"/>
            <CardComponent company="Apa saja" jobtitle="Salesman"/>
            <CardComponent company="Apa saja" jobtitle="Game Programmer"/>
            <CardComponent company="Apa saja" jobtitle="Network Analysis"/>
            <CardComponent company="Apa saja" jobtitle="Bomb defuser"/>
          </Content>
        </Container>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});  