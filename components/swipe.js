import React, {Component} from 'react';
import { StyleSheet, 
  View,
  TouchableOpacity, 
  Image, 
  Alert,
AsyncStorage} from 'react-native';
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
  import HTML from 'react-native-render-html';

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
      isLoggedin:  false,
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
        

/**
 * 
 * @param {*} id 
 * @param {*} judul 
 */
 confirmbookmark(id, judul){
  if(!this.state.isLoggedin){
    Alert.alert('Warning!!',
      'Please Login to use this feature',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Login', onPress: () => this.props.navigation.navigate('Login')},
      ])
  }else{
    Alert.alert(
      'Bookmark Vacancy '+judul,
      'Are you sure want to apply this vacancy ? ',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.bookmark(id)},
      ],
      { cancelable: false }
      )
  }
 }

 bookmark(vacancy){
  fetch('http://192.168.16.14:8000/jwt/vacancy/bookmark?token='+this.state.token,{
    method:'post',
    headers:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }, body: JSON.stringify({
          vacancy_id: vacancy
    })
  }).then((response) => response.json())
  .then((responseJson) =>{
   Alert.alert(responseJson.status,
   responseJson.message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  })
  .catch((error)=>{
    console.error(error);
  });

 }

 /**
  * Check if user was login
  * 
  * @param {*} id 
  */
 confirm(id, judul){

  if(!this.state.isLoggedin){
    Alert.alert('Warning!!',
      'Please Login to use this feature',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Login', onPress: () => this.props.navigation.navigate('Login')},
      ])
  }else{
    Alert.alert(
      'Apply Vacancy '+judul,
      'Are you sure want to apply this vacancy ? ',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.apply(id)},
      ],
      { cancelable: false }
      )
  }
 }

 apply(vacancy){
  fetch('http://192.168.16.14:8000/jwt/vacancy/apply?token='+this.state.token,{
    method:'post',
    headers:{
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }, body: JSON.stringify({
          vacancy_id: vacancy
    })
  }).then((response) => response.json())
  .then((responseJson) =>{
   Alert.alert(responseJson.status,
   responseJson.message,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  })
  .catch((error)=>{
    console.error(error);
  });

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
                    { item.judul }
                  </Text>
                  <Text note>{((item || {}).user || {}).name}</Text>
                </TouchableOpacity>
                </Body>
                </Left>
                
                <Right>
                  <Button
                  bordered danger 
                  transparent
                  rounded
                  onPress={() => this.confirmbookmark(item.id, item.judul)}
                  >
                  <View style={{ flexDirection:'row' }}>
                    <IconNB name={"ios-bookmark"} style={{ color: "#ED4A6A" }} />
                  </View>
                  </Button>
                </Right>
              </CardItem>

            {/** Card body start here */}
            <CardItem cardBody>
            
            <View>
               
              
            </View>
            </CardItem>

            {/** this card footer */}
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
                onPress={() => this.confirm(item.id, item.judul)}
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
            </Card>
            
          }
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