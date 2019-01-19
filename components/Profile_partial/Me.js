import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { Icon,
    Container,
    Content, 
    Right, 
    Left, 
    Body, 
    Button, 
    Header, 
    Title, 
    IconNB,
    Card,
    CardItem,
    Grid,
    Col,
    Row} from 'native-base';
import { Avatar } from 'react-native-elements';

export default class Me extends Component{
    static navigationOptions = {
        header: null,
    };
    
    constructor(props){
        super(props);
        this.state={
            isloading : false,
            exp: [],
            edu:[],
            organization:[]
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
        this.setState({
            isLoading:true
        });
        fetch('http://192.168.16.14:8000/jwt/profile/me?token='+token,{
         method: 'get'
        })
        .then((response) => response.json())
        .then((responseJson) =>{
          this.setState({
            dataSource: responseJson,
            seeker: responseJson.seeker.data,
            birth: responseJson.seeker,
            user: responseJson.source,
            exp: responseJson.exp.data,
            edu: responseJson.educations.data,
            organization: responseJson.organization.data,
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
                        
                        <View>
                            <Grid>
                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-transgender"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>   {null != (this.state.seeker || {}).gender ? 
                                    (this.state.seeker || {}).gender : ' - '}</Text>
                                </View>
                                </Row>

                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-heart-empty"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>   {null != (this.state.seeker || {}).relationship ? 
                                    (this.state.seeker || {}).relationship : ' - '}</Text>
                                </View>
                                </Row>

                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-calendar"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>   {null != (this.state.birth || {}).more ? 
                                    (this.state.birth || {}).more : ' - '}</Text>
                                </View>
                                </Row>

                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-flag"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>    {null != (this.state.seeker || {}).nationality ? 
                                    (this.state.seeker || {}).nationality : ' - '}</Text>
                                </View>
                                </Row>

                            </Grid>
                        </View>
                    </View>

                    <View>
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Left>
                                <Text style={styles.title}>Contact</Text>
                            </Left>
                        </View>
                        
                        <View >
                            <Grid>
                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-phone-portrait"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>      {null != (this.state.seeker || {}).phone ? 
                                    (this.state.seeker || {}).phone : ' - '}</Text>
                                </View>
                                </Row>

                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-pin"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>     {null != (this.state.seeker || {}).phone ? 
                                    (this.state.seeker || {}).phone : ' - '}</Text>
                                </View>
                                </Row>

                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-home"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>   {null != (this.state.seeker || {}).address ? 
                                    (this.state.seeker || {}).address : ' - '}</Text>
                                </View>
                                </Row>

                                <Row>
                                <View style={{ flexDirection:'row' }}>
                                <Button
                                danger 
                                transparent
                                rounded
                                small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-mail"} />
                                </View>
                                </Button>
                                    <Text> </Text>
                                    <Text style={{ paddingTop:5 }}>   {null != (this.state.dataSource || {}).email ? 
                                    (this.state.dataSource || {}).email : ' - '}</Text>
                                </View>
                                </Row>
                            </Grid>
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
                        {this.state.edu.map((v,index) => {
                         return (
                            <Card style={styles.mb} key={index}>
                            <CardItem header>
                                <Left>
                               <Text style={{ fontWeight:'bold' }}>{v.degrees} of {v.majors} in {v.school_name} </Text>
                              </Left>
                              <Right>
                                  <View style={{ flexDirection:'row' }}>
                                  <Button
                                    danger 
                                    transparent
                                    rounded
                                    small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-settings"} style={{ color: "#ED4A6A" }} />
                                </View>
                                 </Button>
                                  
                                  <Button
                                    danger 
                                    transparent
                                    rounded
                                    small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-trash"} style={{ color: "#ED4A6A" }} />
                                </View>
                                 </Button>
                                  </View>
                              </Right>
                            </CardItem>
                            <CardItem>
                              <Body>
                                <Text>
                                  Get on the mobile fast track with NativeBase, the
                                  fastest-growing platform and tool set for iOS and Android
                                  development.
                                </Text>
                              </Body>
                            </CardItem>
                            <CardItem footer>
                              <Text></Text>
                            </CardItem>
                          </Card>
                         )
                        })}
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
                        {this.state.exp.map((v,index) => {
                         return (
                            <Card style={styles.mb} key={index}>
                            <CardItem header>
                            <Left>
                              <Text style={{ fontWeight:'bold' }}>{v.company}</Text>
                              </Left>
                              <Right>
                              <View style={{ flexDirection:'row' }}>
                                  <Button
                                    danger 
                                    transparent
                                    rounded
                                    small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-settings"} style={{ color: "#ED4A6A" }} />
                                </View>
                                 </Button>
                                  
                                  <Button
                                    danger 
                                    transparent
                                    rounded
                                    small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-trash"} style={{ color: "#ED4A6A" }} />
                                </View>
                                 </Button>
                                  </View>
                              </Right>
                            </CardItem>
                            <CardItem>
                              <Body>
                                <Text>
                                  Get on the mobile fast track with NativeBase, the
                                  fastest-growing platform and tool set for iOS and Android
                                  development.
                                </Text>
                              </Body>
                            </CardItem>
                            <CardItem footer>
                              <Text>{v.start_date} - {v.end_date} </Text>
                            </CardItem>
                          </Card>
                         )
                        })}
                        </View>
                    </View>

                    <View>
                        <View style={{ flex:1, flexDirection: 'row' }}>
                            <Left>
                                <Text style={styles.title}>Organization Experience </Text>
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
                        {this.state.organization.map((v,index) => {
                         if(this.state.organization.length < 1){
                            return(
                                <Card>
                                <CardItem>
                                  <Body>
                                    <Text>You don't have any data for this section</Text>
                                  </Body>
                                </CardItem>
                              </Card>
                            )
                         }else{
                            return (
                                <Card style={styles.mb} key={index}>
                                <CardItem header>
                                <Left>
                                <Text style={{ fontWeight:'bold' }}>{v.name}</Text>
                                </Left>
                                <Right>
                                <View style={{ flexDirection:'row' }}>
                                  <Button
                                    danger 
                                    transparent
                                    rounded
                                    small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-settings"} style={{ color: "#ED4A6A" }} />
                                </View>
                                 </Button>
                                  
                                  <Button
                                    danger 
                                    transparent
                                    rounded
                                    small >
                                <View style={{ flexDirection:'row' }}>
                                <IconNB name={"ios-trash"} style={{ color: "#ED4A6A" }} />
                                </View>
                                 </Button>
                                  </View>
                                </Right>
                                </CardItem>
                                <CardItem>
                                <Body>
                                    <Text>
                                    Get on the mobile fast track with NativeBase, the
                                    fastest-growing platform and tool set for iOS and Android
                                    development.
                                    </Text>
                                </Body>
                                </CardItem>
                                <CardItem footer>
                                <Text>{v.start_date} - {v.end_date} </Text>
                                </CardItem>
                            </Card>
                            )
                         }

                        })}
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