import React, {Component} from 'react';
import {Platform, StyleSheet,  View, AsyncStorage, Alert, TouchableOpacity} from 'react-native';
import {
    Container,
    Header,
    Title,
    Button,
    IconNB,
    Subtitle,
    Card,
    CardItem,
    Icon,
    Thumbnail,
    Text,
    Left,
    Right,
    Body,
    Spinner,
    Content} from 'native-base';


export default class Bookmark extends Component{
    static navigationOptions = {
        header: null,
    };
    
    constructor(props){
        super(props);
        this.state ={ 
          isLoading: false, 
          refreshing:false,
          dataSource: [],
          isLoggedin:  false,
          isproceeded: false
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
            'Remove Bookmark '+judul,
            'Are you sure want to remove this vacancy ? ',
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
        return this.componentDidMount()
       }

      fetch(token){
        this.setState({
            isLoading:true
        });
        fetch('http://192.168.16.14:8000/jwt/vacancy/bookmark/show?token='+token,{
         method: 'get'
        })
        .then((response) => response.json())
        .then((responseJson) =>{
          this.setState({
            dataSource: responseJson,
            isLoading: false,
           })
        }).catch((error)=>{
          alert(error)
        })
      }

      componentDidMount(){
        AsyncStorage.getItem('user', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result);
                let token = resultParsed.access_token;
                this.fetch(token)
            }
        });
      }

    render() {
        if(this.state.isLoading){
            return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Spinner color='red'/>
              <Text>Loading.....</Text>
            </View>
            )
            }

      return (
        <Container style={styles.container}>
            <Header hasSubtitle
            style={{ backgroundColor:'#fa5555' }}
            androidStatusBarColor="#fa6666">
            <Left>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body>
                <Title>Bookmarks</Title>
                <Subtitle>Your saved vacancies</Subtitle>
            </Body>
            <Right />
            </Header>

        <Content>
            <View style={{ flex: 1, padding: 12 }}>
                
                {this.state.dataSource.map((v,index)=> {
                    return(
                        <Card key={index}>
                        <CardItem bordered>
                        <Left>
                        
                            <Thumbnail source={{uri:((v || {}).user || {}).ava}} />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail',{id: (v || {}).id,})}>
                            <Body>
                            <Text>{(v || {}).judul}</Text>
                            <Text note>{((v || {}).user || {}).name}</Text>
                            </Body>
                        </TouchableOpacity>
                        </Left>

                        <Right>
                        <Button 
                        rounded
                        style={{ backgroundColor:'#ED4A6A' }}
                        onPress={() => this.confirmbookmark((v || {}).id, (v || {}).judul)}
                        >
                        <View style={{ flexDirection:'row' }}>
                            <IconNB name={"ios-bookmark"} style={{ color: "white" }} />
                        </View>

                        </Button>
                        </Right>
                        </CardItem>

                        <CardItem>
                        <Body>
                            <Text>
                            NativeBase is a free and source framework that enable
                            developers to build high-quality mobile apps using React
                            Native iOS and Android apps with a fusion of ES6. NativeBase
                            builds a layer on top of React Native that provides you with
                            basic set of components for mobile application development.
                            </Text>
                        </Body>
                        </CardItem>
                        <CardItem style={{ paddingVertical: 0 }}>
                        <Left>
                            <Button
                            transparent>
                                <Icon name="ios-pin" style={{ color:'#ED4A6A' }}/>
                                <Text style={{ color:'#ED4A6A' }}>{(v || {}).city}</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Text note>
                            {(v || {}).updated_at}
                            </Text>
                            </Right>
                        </CardItem>
                    </Card>
                    )
                })}
            </View>
            </Content>
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
    color: 'white',
  },
});  