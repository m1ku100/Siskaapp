/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';

//screen
import Home from './components/Home';



export default class App extends Component{

	
	render() {
		return (
			<AppStackNav />
			);
		}
		
	}
	
const AppStackNav = StackNavigator({
	Main: {
		screen: Home
	}
	},{ headerMode: 'none' });

	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'skyblue',
		},
		welcome: {
			fontSize: 20,
			textAlign: 'center',
			margin: 10,
		},
		instructions: {
			textAlign: 'center',
			color: '#333333',
			marginBottom: 5,
		},
	});
	