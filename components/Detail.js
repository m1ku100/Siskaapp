import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  Image,  ScrollView, ActivityIndicator,AsyncStorage, Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Icon, Container, Content, Button,} from 'native-base';
import HTML from 'react-native-render-html';

export default class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: '',
            user: '',
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

    componentDidMount = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id', '');
        fetch('http://192.168.16.14:8000/api/clients/vacancies/'+id,{
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           console.log(responseJson);
 
           this.setState({
            dataSource: responseJson,
            user: responseJson.user,
            isLoading: false,
           })
        })
        .catch((error) => {
           console.error(error);
        });
     }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                  <ActivityIndicator/>
                </View>
              )
        }

      return (
        
        <Container style={styles.container}>
        <Content>

            <View style={{ paddingTop: 10 }}>

                {/** User Photo Stats**/}
                <View style={{ flexDirection: 'row' }}>

                    {/**User photo takes 1/3rd of view horizontally **/}
                    <View
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image source={{uri: this.state.user.ava }}
                            style={{ width: 75, height: 75, borderRadius: 37.5 }} />

                    </View>

                    {/**User Stats take 2/3rd of view horizontally **/}
                    <View style={{ flex: 3 }}>
                        <View style={{ paddingHorizontal: 10, paddingTop: 10}}>
                        <Text style={ styles.titlecolor}>{this.state.dataSource.judul}</Text>
                        <Text >{this.state.user.name}</Text>
                        <Text>Total Applicants: { this.state.dataSource.total }</Text>
                        <Text style={styles.update}>Last Updated : {this.state.dataSource.updated_at}</Text>
                    </View>
                    </View>
                </View>

                <View style={{ paddingBottom: 10 , flex: 3}}>
                    {/** Stats **/}
                        {/**Edit profile and Settings Buttons **/}
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>

                            <View
                                style={{ flexDirection: 'row' }}>

                                {/** Edit profile takes up 3/4th **/}
                                    <Button 
                                    onPress={()=>this.confirm(this.state.dataSource.id,this.state.dataSource.judul)}
                                    style={{ flex: 3, marginLeft: 10, justifyContent: 'center', height: 30, backgroundColor: '#fa5555'}}>
                                    <Text style={styles.text}>Apply</Text>
                                    </Button>


                                {/** Settings takes up  1/4th place **/}
                                <Button 
                                onPress={()=> this.confirmbookmark(this.state.dataSource.id,this.state.dataSource.judul)}
                                style={{
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
            
            <View>
                <View style={{ justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', paddingRight:15, paddingLeft:15, paddingBottom: 15}}>
                    <View style={{ flexDirection: 'row' ,flex:1, paddingTop:5}}>
                            <Icon name="ios-pin" style={{ fontSize:14, color: '#333' }}></Icon>
                            <Text>    { this.state.dataSource.city }</Text>
                    </View>

                    <View style={{ flexDirection: 'row' ,flex:1, paddingTop:5}}>
                            <Icon name="ios-briefcase" style={{ fontSize:14, color: '#333' }}></Icon>
                            <Text>   {this.state.dataSource.job_func}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' ,flex:1, paddingTop:5}}>
                            <Icon name="ios-school" style={{ fontSize:14 , color: '#333'}}></Icon>
                            <Text>   Min. {this.state.dataSource.degrees}</Text>
                    </View>
                </View>
            </View>

            <View>
                <View style={{ justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', paddingRight:15, paddingLeft:15  }}>
                    <View style={{ flex:1, paddingTop:10}}>
                        <Text style={ styles.textinfo}>Responsibilities</Text>
                        <View>
                            <HTML html={""+ this.state.dataSource.tanggungjawab   }  />
                        </View>
                    </View>

                    <View style={{ flex:1 , paddingTop:10 }}>
                        <Text style={ styles.textinfo}>Requirements</Text>
                        <View>
                        <HTML html={""+ this.state.dataSource.syarat + "" }  />
                        </View>
                    </View>

                    <View style={{ flex:1 , paddingTop:10 }}>
                        <Text style={ styles.textinfo}>About the Company</Text>
                        <View style={{ alignItems: 'center' }}>
                        <HTML html={""+ this.state.dataSource.tentang  }  />
                        </View>
                    </View>
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
  textinfo: {
   
    fontWeight: 'bold', 
  },
  titlecolor:{
    
    fontWeight: 'bold', 
    fontSize: 20,
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