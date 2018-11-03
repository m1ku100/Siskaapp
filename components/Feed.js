import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, TextInput, Alert} from 'react-native';
import { Icon, Container, Content, Right, Left, Body, Button,} from 'native-base';
import { Avatar } from 'react-native-elements';

import Splash from './Splash';

export default class Feed extends Component{
    
  constructor(){
    super();
    this.state={
      message: ''
    }
  }

  updateValue(text, field){
      
    if(field=='message')
      {
        this.setState({
          message:text
        })
      }
  }

  submit(){
    // let collection={}
    // collection.message=this.state.message,
    // alert(collection.message);

    const {message} = this.state;

    fetch('http://192.168.16.14:8000/api/feed', {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:JSON.stringify({
				message: message
			})
			
		})
		.then((response) => response.json())
			.then((responseJson) =>{
			 Alert.alert('Successfull',
       responseJson,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
			})
			.catch((error)=>{
				console.error(error);
			});
  }

  render() {
      return (
        <Container style={styles.container}>
          <Content>
            
            <View style={{ paddingTop:10, paddingBottom: 15, paddingLeft: 15, }}>
                  <Text style={{ fontWeight: '600' }}>Feedback</Text> 
                   <View style={{ flexDirection: 'column' , paddingLeft: 10, paddingRight:15, paddingTop:20}}>
                   <TextInput
                      //onChangeText={(text) =>this.updateValue(text,'message')}
                      onChangeText= {message => this.setState({message})}
                      style={{height: 100, borderColor: '#333', borderWidth: 0.5}}
                    />
                   </View> 
                   <View  style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop:20 }}>
                   <TouchableOpacity 
                    onPress={()=>this.submit()}
                    style={ styles.submitbtn }>
                    <Text style={styles.text}> Send </Text>
                    </TouchableOpacity>
                   </View>
            </View>

          </Content>
        </Container>
      );
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