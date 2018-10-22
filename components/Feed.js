import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity} from 'react-native';
import { Icon, Container, Content, Right, Left, Body, Button} from 'native-base';
import { Avatar } from 'react-native-elements';

import Splash from './Splash';

export default class Feed extends Component{
    render() {
      return (
        <Container style={styles.container}>
          <Content>
            
            <View style={{ paddingTop:10, paddingBottom: 15,  }}>
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
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});  