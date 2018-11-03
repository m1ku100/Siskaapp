import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, TextInput, Alert} from 'react-native';
import { Container, Content } from 'native-base';

export default class Login extends Component{

    constructor(){
        super();
        this.state={
          username: '',
          email: '',
          password: '',
          repassword: '',
        }
      }

    register(){
        const {username} = this.state;
        const {email} = this.state;
        const {password} = this.state;
        const {repassword} = this.state;
    }

    render(){
        return(
            <Container style={styles.container}>
                <Content>

                </Content>
            </Container>
        )   
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    text: {
      fontWeight: '500',
      fontSize: 14,
      textAlign: 'center',
      color: 'white',
    },
    submitbtn:{
      backgroundColor:'#fa5555', 
      width:300, 
      height:40,
      justifyContent:'center',
      alignContent:'center'
    }
  });