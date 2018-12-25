import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Card, Thumbnail, CardItem, Right, Left, Body,  Icon } from 'native-base';

export default class CardAgency extends Component{

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
                        
                        </View>
                    </Body>
                </Left>
            
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
    color: '#333',
  },
});  