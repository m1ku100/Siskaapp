import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, AsyncStorage,Alert} from 'react-native';
import { Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator} from 'native-base';
import { Avatar } from 'react-native-elements';

export default class Profile extends Component{

  constructor(props){
    super(props);
    this.state={
      isLoggedin:  false,
      refreshing: false
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

forceUpdate = () =>{
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
  navigateTo(route){
  }

  async loggout(){
    if(this.state.isLoggedin){
      try {
        await AsyncStorage.removeItem('user').then(alert('Youre Successfully Logged Out!!'))
      } catch (err) {
        alert(`The error is: ${err}`)
      }
    }else{
      Alert.alert('Warning!!',
      'Please Login to use this feature',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Login', onPress: () => this.props.navigation.navigate('Login')},
      ])
    }

  }

  componentDidMount(){
    this.forceUpdate()
  }

    render() {
      return (
        <Container style={styles.container}>
          <Content>

          <ListItem 
          icon last>
            <Left>
              <Button style={{ backgroundColor: "#FD3C2D" }}>
                <Icon active name="contact" />
              </Button>
            </Left>
            <Body>
              <Text>{this.state.token}</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
          
          <Separator bordered noTopBorder />

          <ListItem icon
          onPress={() => this.navigateTo()}>
            <Left>
              <Button style={{ backgroundColor: "#FD3C2D" }}>
                <Icon active name="notifications" />
              </Button>
            </Left>
            <Body>
              <Text>Notifications</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="bookmarks" />
              </Button>
            </Left>
            <Body>
              <Text>Bookmark Jobs</Text>
            </Body>
            <Right>
              <Text>GeekyAnts</Text>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#4CDA64" }}>
                <Icon active name="filing" />
              </Button>
            </Left>
            <Body>
              <Text>Job Invitation</Text>
            </Body>
            <Right>
              <Text>On</Text>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>

          <Separator bordered />

          <ListItem icon last 
          onPress={() => this.loggout()}>
            <Left>
              <Button style={{ backgroundColor: "#FD3C2D" }}>
                <Icon active name="power" />
              </Button>
            </Left>
            <Body>
              <Text>Log Out</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
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