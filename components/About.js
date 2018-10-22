import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, Image} from 'react-native';
import { Icon, Container, Content, Right, Left, Body, Button, } from 'native-base';
import { Avatar } from 'react-native-elements';

import Splash from './Splash';

export default class About extends Component{
    render() {
      return (
        <Container style={styles.container}>
          <Content>
            
            <View style={{ paddingTop:10, paddingBottom: 15,  }}>
            <TouchableOpacity style={{flex: 1, }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                <Image source={require('../assets/siska_mock_type.png')} style={{ width:380, height:140 }} />
                   <View style={{ flexDirection: 'column' , paddingLeft: 15,}}>
                   <Text style={{ fontWeight: '500' }}>Version x.x.x</Text> 
                   </View> 

                </View>
                </TouchableOpacity>
            </View>
            
            <View>
              <View style={{ justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', paddingRight:15, paddingLeft:15, paddingBottom: 15}}>
              <TouchableOpacity>
              <View style={{ paddingTop:15 }}>
                <Text style={{ fontWeight: '500' }}>About SISKA</Text>
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
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});  