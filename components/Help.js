import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity} from 'react-native';
import { Icon, Container, Content, Right, Left, Body, Button} from 'native-base';

export default class Help extends Component{
    render() {
      return (
        <Container style={styles.container}>
          <Content>
            <View>
              <View style={{ justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', paddingRight:15, paddingLeft:15, paddingBottom: 15}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Feed')}>
              <View style={{ paddingTop:15 }}>
              <Button iconLeft transparent danger>
                <Icon name='ios-paper'/>
                <Text style={{ fontWeight: '500' }}>      FEEDBACK</Text>
             </Button>
             </View>
             </TouchableOpacity>

              <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
              <View style={{ paddingTop:15 }}>
                <Button iconLeft transparent danger>
                  <Icon name='ios-settings'/>
                  <Text style={{ fontWeight: '500' }}>      ABOUT US</Text>
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
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
});  