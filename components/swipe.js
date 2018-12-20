import React, {Component} from 'react';
import { StyleSheet, 
  View,
  TouchableOpacity, 
  Image, 
  Alert} from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  IconNB,
  DeckSwiper,
  Card,
  CardItem,
  Icon,
  Thumbnail,
  Text,
  Left,
  Right,
  Body,
  Spinner} from 'native-base';
  import { createBottomTabNavigator } from 'react-navigation';
  
  //Screen
  const cards = 
  [
    
  ];
    
export default class swipe extends Component{
  static navigationOptions = {
    header: null,
  };
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: false, 
      refreshing:false,     
      card: cards,
      dataSource: [cards],
      cardkey: '2'
    }
  }
        
 bookmark(id){
   Alert.alert(
     'BOokmark Vacancy'+id,
     'Are you sure want to apply this vacancy ? ',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'OK', onPress: () => console.log('OK Pressed')},
     ],
     { cancelable: false }
     )
 }

 apply(id){
   Alert.alert(
     'Apply Vacancy'+id,
     'Are you sure want to apply this vacancy ? ',
     [
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'OK', onPress: () => console.log('OK Pressed')},
     ],
     { cancelable: false }
     )
 }

   componentDidMount(){
     
     return fetch('http://192.168.16.14:8000/api/clients/vacancies')
     .then((response) => response.json())
     .then((responseJson) => {
       
       this.setState({
         isLoading: false,
         dataSource: responseJson
       }, function(){
         
       });
       
     })
     .catch((error) =>{
       console.error(error);
     });
     
   }
render() {
  
  if(this.state.isLoading){
    return(
      <View style={{flex: 1, padding: 20}}>
      <Spinner color='red'/>
      </View>
      )
    }
    
    return (
      
      <Container style={styles.container}>
        <Header  rounded style={{ backgroundColor:'#fa5555' }}
        androidStatusBarColor="#fa6666">
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-back" />
          </Button>
          </Left>
        <Body>
          <Title>Swipe & Apply</Title>
        </Body>
        <Right> 
          <Button
          block 
          transparent
          onPress={() => this.props.navigation.navigate("Search")}
          >
          <Icon name="search" style={{ color:'white' }} />
        </Button>
        </Right>
        </Header>
        
        <View style={{ flex: 1, padding: 12 }}>
        <DeckSwiper
        dataSource={this.state.dataSource}
        looping={false}
        renderEmpty={() =>
          <View>
          <Spinner color='red'/>
          </View>}
        renderItem={item => 
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri:((item || {}).user || {}).ava}}/>
                <Body>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail',{id: item.id,})}>
                  <Text>
                    { item.judul}
                  </Text>
                  <Text note>{((item || {}).user || {}).name}</Text>
                </TouchableOpacity>
                </Body>
                </Left>
                <Right>
                  <Button
                  block 
                  transparent
                  onPress={() => this.bookmark(item.id)}
                  >
                  <IconNB name={"ios-bookmark"} style={{ color: "#ED4A6A" }} />
                  </Button>
                </Right>
              </CardItem>
            <CardItem cardBody>
            <Image
            style={{
              resizeMode: "cover",
              width: null,
              flex: 1,
              height: 300
            }}
            source={{uri:((item || {}).user || {}).ava} }
            />
            </CardItem>
            <CardItem>
            <Left>
              <IconNB name={"ios-people"} style={{ color: "#ED4A6A" }} />
              <Text>
              0 Applicants
              </Text>
            </Left>
            <Body>
              <View style={{ flexDirection:'row',alignSelf: 'center', paddingLeft:40}}>
              <Button
                block 
                transparent
                onPress={() => this.apply(item.id)}
                >
                <Icon name="paper-plane" style={{ color:'#ED4A6A' }} /><Text style={{ color: "#ED4A6A", fontSize:14}} >Apply</Text>
              </Button>
              </View>
            </Body>
            <Right>
              <Text note>
              {item.updated_at}
              </Text>
            </Right>
            </CardItem>
            </Card>}
            />
            </View>
          </Container>
          );
        }
      }
              
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});  