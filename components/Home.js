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
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

//Screen
import Profile from './Profile';
import Help from './Help';
import Main from './Main';
import Apply from './Apply';
import Splash from './Splash';
import Detail from './Detail';
import Feed from './Feed';
import About from './About';
import Login from './Login';
import Register from './Register';
import Search from './Search';
import Swipe from './swipe';


export default class Home extends Component{
  
  render() {
    return (
      <StackNav/>
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
      navigationOptions:{
        tabBarLabel: 'Help',
        tabBarTextFontSize: 18,
        tabBarIcon: ({tintColor}) => (
          <Icon name='ios-help-circle' color={tintColor} size={20} />
        )
      }
    },
  },{
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: true,

    tabBarOptions:{
      activeTintColor: '#fa5555',
      inactiveTintColor: 'grey',
      showIcon: true,
      style:{
        backgroundColor: 'white',
        borderTopWidth: 0.5,
      }
    }
  })

  const StackNav = createStackNavigator({
    Main: {
      screen: AppTabNav,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('title','SISKA'),
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 160,
          fontSize:20,
          marginTop:5,
          
        },
      }),
    },
    Search:{
      screen: Search,
      navigationOptions: () => ({
        title: 'Search Vacancy',
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 85,
          fontSize:20,
          marginTop:5,
          
        },
      }),
    },
    Swipe:{
      screen:Swipe,
      navigationOptions: () => ({
        title: 'Swipe & Apply',
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 85,
          fontSize:20,
          marginTop:5,
          
        },
      }),
    },
    Feed:{
      screen: Feed,
      navigationOptions: () => ({
        title: 'Feedback',
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 85,
          fontSize:20,
          marginTop:5,
          
        },
      }),
    },
    About:{
      screen: About,
      navigationOptions: () => ({
        title: 'About SISKA',
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 85,
          fontSize:20,
          marginTop:5,
          
        },
      }),
    },
    Login:{
      screen: Login,
      navigationOptions: () => ({
        title: 'Sign In',
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 85,
          fontSize:20,
          marginTop:5,
          
        },
      }),
    },
    Register:{
      screen: Register,
      navigationOptions: () => ({
        title: 'Sign Up',
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 85,
          fontSize:20,
          marginTop:5,
          
        },
      }),
    },
    Splash:{
      screen: Splash,
      navigationOptions: () => ({
        title: 'Spalsh',
        headerBackTitle: 'A much too long text for back button from B to A'
      }),
    },
    Detail:{
      screen: Detail,
      navigationOptions: () => ({
        title: 'Job Detail',
        headerTitleStyle:{
          alignSelf: 'center',
          fontWeight:'500',
          paddingLeft: 85,
          fontSize:20,
          marginTop:5,
          
        },
      })
    }
  });

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