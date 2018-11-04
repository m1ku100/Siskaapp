import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, TextInput, Alert,Image} from 'react-native';
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
                
                <View style={styles.loginContainer}>
                    <Image  style={styles.logo} source={require('../assets/siska_mock_type.png')}  />
                </View>

                <View style={{ paddingTop: 32 }}>
                <TextInput style = {styles.input} 
               autoCapitalize="none" 
               onSubmitEditing={() => this.passwordInput.focus()} 
               autoCorrect={false} 
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Email or Mobile Num' 
               placeholderTextColor='grey'
               
               />

                <TextInput style = {styles.input}   
              returnKeyType="go" 
              ref={(input)=> this.passwordInput = input} 
              placeholder='Password' 
              placeholderTextColor='grey' 
              secureTextEntry/>

                <TouchableOpacity style={styles.buttonContainer} >
                <Text  style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity> 
                </View>

                </Content>
            </Container>
        )   
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
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
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 300,
        height: 100
    },
    input:{
        height: 40,
        backgroundColor: '#FFEEEE',
        marginBottom: 10,
        padding: 10,
        color: 'grey'
    },
    buttonContainer:{
        backgroundColor: '#fa5555',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
  });