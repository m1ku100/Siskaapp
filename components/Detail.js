import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Card, Thumbnail, CardItem, Right, Left, Body, Icon, Container, Content, Header,  Button,} from 'native-base';

export default class Profile extends Component{
    render() {

        const { navigation } = this.props;
        const judul = navigation.getParam('judul', '');
        const img = navigation.getParam('img', '');
        const company = navigation.getParam('company', '');
        const update = navigation.getParam('update', '');

        //const otherParam = navigation.getParam('otherParam', 'some default value');

      return (
        
        <Container style={styles.container}>
        <Content>

            <View style={{ paddingTop: 10 }}>

                {/** User Photo Stats**/}
                <View style={{ flexDirection: 'row' }}>

                    {/**User photo takes 1/3rd of view horizontally **/}
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image source={{uri: img }}
                            style={{ width: 75, height: 75, borderRadius: 37.5 }} />

                    </View>

                    {/**User Stats take 2/3rd of view horizontally **/}
                    <View style={{ flex: 3 }}>

                        {/** Stats **/}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'flex-end'
                            }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text>20</Text>
                                <Text style={{ fontSize: 10, color: 'grey' }}>Posts</Text>
                            </View>
                        </View>

                        {/**Edit profile and Settings Buttons **/}
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>

                            <View
                                style={{ flexDirection: 'row' }}>

                                {/** Edit profile takes up 3/4th **/}
                                    <Button 
                                    style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, backgroundColor: '#fa5555'}}>
                                    <Text style={styles.text}>Apply</Text>
                                    </Button>


                                {/** Settings takes up  1/4th place **/}
                                <Button style={{
                                    flex: 1,
                                    height: 30,
                                    marginRight: 10, marginLeft: 5,
                                    justifyContent: 'center',
                                    backgroundColor: '#fa5555'
                                }}>
                                    <Icon name="ios-bookmark" style={{ color: 'white' }}></Icon></Button>
                            </View>
                        </View>{/**End edit profile**/}
                    </View>
                </View>

                <View style={{ paddingBottom: 10 }}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontWeight: 'bold',  }}>{judul}</Text>
                        <Text >{company}</Text>
                        <Text style={styles.update}>{update}</Text>
                    </View>
                </View>


            </View>


            <View >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5' }}>
                   
                </View>
                {/** Height =width/3 so that image sizes vary according to size of the phone yet remain squares **/}
            </View>
        </Content>
    </Container >
      
      );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    color: 'white',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  update:{
    fontSize: 12,
    color: 'grey'
  }
});  