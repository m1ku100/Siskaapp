import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, TextInput, Alert,Image} from 'react-native';
import { Container, Content } from 'native-base';

export default class Register extends Component{

    constructor(){
        super();
        this.state={
          name: '',
          email: '',
          password: '',
          repassword: '',
          dataSource: '',
          error: ''
        }
      }

    register(){
        const {name} = this.state;
        const {email} = this.state;
        const {password} = this.state;
        const {repassword} = this.state;

        fetch('http://192.168.16.14:8000/jwt/register', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
                name: name,
                email: email,
                password: password,
                repassword: repassword
			})
			
		})
		.then((response) => response.json())
			.then((responseJson) =>{
             
                this.setState({
                    dataSource: responseJson,
                    error : responseJson.error
                });

                if(!this.state.dataSource.success){
                    Alert.alert(this.state.dataSource.status,
                        this.state.error,
                        [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ]);
                }else{
                    Alert.alert(this.state.dataSource.status,
                        this.state.dataSource.message,
                        [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
                        ]);
                }
			})
			.catch((error)=>{
				console.error(error);
			});
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
               autoCorrect={false} 
               onChangeText= {name => this.setState({name})}
               returnKeyType="next" 
               placeholder='Username' 
               placeholderTextColor='grey'
               />

               <TextInput style = {styles.input} 
               autoCapitalize="none" 
               autoCorrect={false} 
               onChangeText= {email => this.setState({email})}
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Email ' 
               placeholderTextColor='grey'
               />

                <TextInput style = {styles.input} 
                onChangeText= {password => this.setState({password})}  
              returnKeyType="go" 
              placeholder='Password' 
              placeholderTextColor='grey' 
              secureTextEntry/>

              <TextInput style = {styles.input}  
              onChangeText= {repassword => this.setState({repassword})} 
              returnKeyType="go" 
              placeholder='Retype Password' 
              placeholderTextColor='grey' 
              secureTextEntry/>

                <TouchableOpacity 
                style={styles.buttonContainer}
                onPress= {()=> this.register()} >
                <Text  style={styles.buttonText}>Sign up</Text>
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
        width: 270,
        height: 90
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