import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Card, Thumbnail, CardItem, Right, Left, Body, Button, Icon } from 'native-base';

export default class cardComponent extends Component{

    render() {
      return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: this.props.img }} />
                    <Body>
                        <Text style={styles.text}>{this.props.jobtitle}</Text>
                        <Text>{this.props.company}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontSize:12 }}> <Icon name='ios-pin' style={{ fontSize:12 }} /> {this.props.location} |
                            </Text> 
                            <Text style={{ fontSize:12 }}> {this.props.salary} (IDR)
                            </Text> 
                        </View>
                    </Body>
                </Left>
                <Right>
                    <Icon name='ios-bookmark' size={50} color='grey'/>
                </Right>
            </CardItem>
        </Card>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});  