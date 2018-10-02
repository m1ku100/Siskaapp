import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text,
  View, 
  SafeAreaView,
  TextInput,
  StatusBar,
  Image
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

//Screen
import Profile from './Profile';
import Help from './Help';
import Main from './Main';
import Apply from './Apply';


export default class Home extends Component{
  
  static navigationOptions = {
    headerTitle: ( 
      <Image style={{ 
        height: 30,
         width:80, 
         alignSelf: 'center', 
         resizeMode: 'contain',
        paddingLeft: 50}} 
         source={require('../assets/siska.png')} 
         /> 
    ),
    //  title: 'Tittle'
    // headerRight:  <Icon name='ios-search' color="grey" size={24} style={{ paddingRight: 20 }}/>,
  }
  
  render() {
    return (
      <AppTabNav/>
      );
    }
  }

  const AppTabNav = createMaterialTopTabNavigator({

    Home:{
      screen: Main,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarTextFontSize: 18,
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-home' color={tintColor} size={20} />
        )
      }
    },
    ApplyJob:{
      screen: Apply,
      navigationOptions: {
        tabBarLabel: 'Apply Job',
        tabBarTextFontSize: 18,
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-briefcase' color={tintColor} size={20} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarTextFontSize: 18,
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-contact' color={tintColor} size={20} />
        )
      }
    },
    Help: {
      screen: Help,
      navigationOptions: {
        tabBarLabel: 'Help',
        tabBarTextFontSize: 18,
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-help-circle' color={tintColor} size={20} />
        )
      }
    }
  },{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,

    tabBarOptions:{
      activeTintColor: 'skyblue',
      inactiveTintColor: 'grey',
      showIcon: true,
      style:{
        backgroundColor: 'white',
        borderTopWidth: 0.5,
      }
    }
  })

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    text: {
      //fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
      color: 'grey',
    },
  });  