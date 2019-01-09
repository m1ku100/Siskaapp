import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, TextInput, Alert,Image, Button, AsyncStorage} from 'react-native';
import { Container, Content } from 'native-base';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            hobby: '',
            email: '',
            password: '',
            token: 'as',
            isLoggedin: false
        };
        AsyncStorage.getItem('user', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result)
                this.setState({
                    token: resultParsed.access_token,
                    isLoggedin: resultParsed.isLoggedin
                });
            }
        });
      }

    //submiting and fetching data 
    submit(){
        const {email} = this.state;
        const {password} = this.state;
        let data = {
            email: email,
            password : password
        }
        fetch('http://192.168.16.14:8000/jwt/login',{
            method: 'post',
            header:{
                'Accept': 'application/json',
				'Content-type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then((responseJson)=> {
            //check if succes is false render Alert to show the errors
            if(!((responseJson) || {}).success){
               Alert.alert(
                   'Warning!!',
                   ((responseJson) || {}).error,
                   [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                   ]
               ) 
            }else{ //all good 
                this.saveData(((responseJson) || {}).access_token)
            }

        })
    }

    //set Token to storage
    saveData(token) {
      let tkn = token;
      let data = {
          access_token: tkn,
          isLoggedin: true
      }

      AsyncStorage.setItem('user', JSON.stringify(data));

      this.setState({
          token: token,
      });
      //alert('Data tersimpan');
      this.props.navigation.goBack()
    }

    async deleteData() {
        try {
            await AsyncStorage.removeItem('user').then(alert('Data telah terhapus!!'))
          } catch (err) {
            alert(`The error is: ${err}`)
          }
    }
    //check if isLoggedin true will navigate to profileScreen
    componentDidMount(){

    }

    render(){
        return(
            <View style={styles.container}>
            <Text>{this.state.token}</Text>
            <Text style={styles.instructions}>
                Nama: {this.state.name}{'\n'}
                Hobi: {this.state.hobby}
            </Text>
            <TextInput style={styles.textInput}
                
                onChangeText={email => this.setState({email})}
                placeholder='Email'
            />
            <TextInput style={styles.textInput}
                
                onChangeText={password => this.setState({password})}
                placeholder='Password'
            />
            <Button
                title='Simpan'
                onPress={() => this.submit()}
            />
            <Button
                title='Hapus'
                onPress={this.deleteData.bind(this)}
            />
        </View>
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