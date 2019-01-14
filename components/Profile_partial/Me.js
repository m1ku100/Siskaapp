import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { Icon, Container, Content, Right, Left, Body, Button, Header, Title, IconNB, Card,CardItem} from 'native-base';
import { Avatar } from 'react-native-elements';

export default class Me extends Component{
    static navigationOptions = {
        header: null,
    };
    
    constructor(props){
        super(props);
        this.state={
            isloading : true
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

    fetchdata(token){
        fetch('http://192.168.16.14:8000/jwt/me?token='+token,{
         method: 'get'
        })
        .then((response) => response.json())
        .then((responseJson) =>{
          this.setState({
            dataSource: responseJson,
            user: responseJson.user,
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
                this.fetchdata(token)
            }
        });
    }

    render() {
        return (
            <Container>
            <Header  rounded style={{ backgroundColor:'#fa5555' }}
            androidStatusBarColor="#fa6666">
            <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
            </Button>
            </Left>
            <Body>
            <Title></Title>
            </Body>
            </Header>

            <Content>
                <View style={{ flex:1,backgroundColor:'#fa5555',alignItems: 'center', height: 200 }}>
                    <View style={{  alignItems: 'center' }}>
                        <Image source={ {uri: (this.state.user || {}).ava} } 
                        style={{width: 128, height: 128, borderRadius: 128/2,borderColor:'white', borderWidth: 5}}/>
                        <Text style={styles.text}>{(this.state.dataSource || {}).name}</Text>
                        <Text noote style={{ color: 'white' }}>[ Looking for a job ]</Text>
                    </View>
                </View>
                <View style={{ flex: 1, paddingLeft:15,paddingRight:15,paddingTop:15}}>
                    <View>
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Left>
                                <Text style={styles.title}>Personal Details</Text>
                            </Left>
                            <Right>
                            <Button
                            danger 
                            transparent
                            rounded
                            small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-create"} style={{ color: "#ED4A6A" }} />
                                </View>
                            </Button>
                            </Right>
                        </View>
                        
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Text></Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Left>
                                <Text style={styles.title}>Contact</Text>
                            </Left>
                            <Right>
                            <Button
                            danger 
                            transparent
                            rounded
                            small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-create"} style={{ color: "#ED4A6A" }} />
                                </View>
                            </Button>
                            </Right>
                        </View>
                        
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Text></Text>
                        </View>
                    </View>

                    <View>
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Left>
                                <Text style={styles.title}>Education</Text>
                            </Left>
                            <Right>
                            <Button
                            danger 
                            transparent
                            rounded
                            small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-add-circle-outline"} style={{ color: "#ED4A6A" }} />
                                </View>
                            </Button>
                            </Right>
                        </View>
                        
                        <View style={{ flex:1, }}>
                        <Card>
                            <CardItem header>
                                <Text>Name of School</Text>
                            </CardItem>
                        <CardItem>
                            <Body>
                                <Text>For Education</Text>
                                <Text>Like it? Keep Scrolling...</Text>
                            </Body>
                            </CardItem>
                        </Card>
                        </View>
                    </View>

                    <View>
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Left>
                                <Text style={styles.title}>Work Experience</Text>
                            </Left>
                            <Right>
                            <Button
                            danger 
                            transparent
                            rounded
                            small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-add-circle-outline"} style={{ color: "#ED4A6A" }} />
                                </View>
                            </Button>
                            </Right>
                        </View>
                        
                        <View style={{ flex:1}}>
                        <Card>
                            <CardItem header>
                                <Text>Job Title</Text>
                            </CardItem>
                        <CardItem>
                            <Body>
                                <Text>For Work Experience</Text>
                                <Text>Like it? Keep Scrolling...</Text>
                            </Body>
                            </CardItem>
                        </Card>
                        </View>
                    </View>

                    <View>
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Left>
                                <Text style={styles.title}>Organization Experience</Text>
                            </Left>
                            <Right>
                            <Button
                            danger 
                            transparent
                            rounded
                            small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-add-circle-outline"} style={{ color: "#ED4A6A" }} />
                                </View>
                            </Button>
                            </Right>
                        </View>
                        
                        <View style={{ flex:1, }}>
                        <Card>
                            <CardItem header>
                                <Text>Organization Name</Text>
                            </CardItem>
                        <CardItem>
                            <Body>
                                <Text>For Organization Experience</Text>
                                <Text>Like it? Keep Scrolling...</Text>
                            </Body>
                            </CardItem>
                        </Card>
                        </View>
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
            fontWeight: '600',
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
        },
        title:{
            fontWeight: 'bold'
        }
    });  