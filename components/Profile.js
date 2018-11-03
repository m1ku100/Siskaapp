import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity} from 'react-native';
import { Icon, Container, Content, Right, Left, Body, Button} from 'native-base';
import { Avatar } from 'react-native-elements';

import Splash from './Splash';

export default class Profile extends Component{

  constructor(){
    super();
    this.state={
      loginstate : false
    }
  }

    render() {
      
      if(!this.state.loginstate)
      {
        return(
          <Container style={styles.nonactive}>
          <Content>
            
            <View style={{ paddingTop:10, paddingBottom: 15, backgroundColor:'#FFEEEE' }} >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
                <TouchableOpacity style={styles.button}
                onPress={() => this.props.navigation.navigate('Register')}
                >
                  <Text style={styles.buttontext}>Sign Up</Text>
                </TouchableOpacity>
                
                <View style={{ flexDirection: 'row', paddingTop:5}}>
                <Text style={{ fontSize:12 }}>Already have an account?  </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{ color:'#fa5555',fontSize:12 }}>
                    Sign in 
                  </Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
            
            <View pointerEvents="none" style={{ backgroundColor: '#F3F3F3', opacity:0.4 }}>
              <View style={{ justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', paddingRight:15, paddingLeft:15, paddingBottom: 15}}>
              <TouchableOpacity>
              <View style={{ paddingTop:15 }}>
              <Button iconLeft transparent danger>
                <Icon name='ios-bookmark'/>
                <Text style={{ fontWeight: '500' }}>      BOOKMARKED VACANCY</Text>
             </Button>
             </View>
             </TouchableOpacity>

              <TouchableOpacity>
              <View style={{ paddingTop:15 }}>
                <Button iconLeft transparent danger>
                  <Icon name='ios-settings'/>
                  <Text style={{ fontWeight: '500' }}>      SETTINGS</Text>
              </Button>
              </View>
             </TouchableOpacity>

              <TouchableOpacity>
                <View style={{ paddingTop:15 }}>
                  <Button iconLeft transparent danger>
                    <Icon name='ios-power'/>
                    <Text style={{ fontWeight: '500' }}>      LOGOUT</Text>
                </Button>
                </View>
             </TouchableOpacity>
              </View>
            </View>

          </Content>
        </Container>
        )
      }

      return (
        <Container style={styles.container}>
          <Content>
            
            <View style={{ paddingTop:10, paddingBottom: 15,  }} >
            <TouchableOpacity style={{flex: 1, }}  onPress={() => this.props.navigation.navigate('Splash')}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Avatar
                large
                rounded
                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.9}
                />
                   <View style={{ flexDirection: 'column' , paddingLeft: 15,}}>
                   <Text style={{ fontWeight: '400' }}>Username</Text> 
                   <Text>View and Edit Resume</Text> 
                   </View> 
                  
                  <Icon name='ios-arrow-forward' style={{ paddingLeft:50 ,fontSize:14}}/>
                </View>
            </TouchableOpacity>

            </View>
            
            <View>
              <View style={{ justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', paddingRight:15, paddingLeft:15, paddingBottom: 15}}>
              <TouchableOpacity>
              <View style={{ paddingTop:15 }}>
              <Button iconLeft transparent danger>
                <Icon name='ios-bookmark'/>
                <Text style={{ fontWeight: '500' }}>      BOOKMARKED VACANCY</Text>
             </Button>
             </View>
             </TouchableOpacity>

              <TouchableOpacity>
              <View style={{ paddingTop:15 }}>
                <Button iconLeft transparent danger>
                  <Icon name='ios-settings'/>
                  <Text style={{ fontWeight: '500' }}>      SETTINGS</Text>
              </Button>
              </View>
             </TouchableOpacity>

              <TouchableOpacity>
                <View style={{ paddingTop:15 }}>
                  <Button iconLeft transparent danger>
                    <Icon name='ios-power'/>
                    <Text style={{ fontWeight: '500' }}>      LOGOUT</Text>
                </Button>
                </View>
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
  nonactive:{
    flex: 1,
    backgroundColor: '#F3F3F3'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  button:{
    width: 160,
    height:40,
     backgroundColor:'#fa5555',
     justifyContent: 'center',
     borderRadius:5,
     borderColor: '#fff',
  },
  buttontext:{
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize:16
  }
});  