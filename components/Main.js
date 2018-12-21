import React, {Component} from 'react';
import {StyleSheet,
FlatList,
TouchableOpacity} from 'react-native';
import { Container,
  Header,
  Button,
  Icon,
  Item,
  Input,
  Content,
  Card,
  CardItem,
  Body,
  Tab,
  Tabs,
  Text,
  View} from 'native-base';

  import CardComponent from './CardComponent';


export default class Splash extends Component{
  
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true, 
      refreshing:false,
      q:''
    }
  }

  sendSearchKey(){
    this.props.navigation.navigate('Search',{
      key : this.state.q
    })
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
      return (
        <Container style={styles.container}>
        <Header searchBar rounded style={{ backgroundColor:'#fa5555' }}
          androidStatusBarColor="#fa6666" >
          <Item>
            <Icon active name="search"  />
            <Input 
            onChangeText={q => this.setState({q})}
            returnKeyType="go"
            onSubmitEditing={() => this.sendSearchKey()}
            placeholder="Job tittle" />
          </Item>
        </Header>

        <Tabs locked>
          <Tab 
          tabStyle={{backgroundColor: '#fa5555',paddingEnd:-30}}
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#fa5555'}}
          activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
          heading="Popular Vacancy">
          <Card style={styles.mb} >
            <CardItem>
              <Body>
                <FlatList
                horizontal={true}
                data={this.state.dataSource}
                renderItem={({item}) => 
                    <CardComponent company={item.user.name} jobtitle={item.judul} salary={item.salary} location={item.city} img={item.user.ava} />
                } 
                keyExtractor={({id}) => id.toString()}
                />
              </Body>
            </CardItem>
          </Card>
          </Tab>

          <Tab 
          tabStyle={{backgroundColor: '#fa5555'}}
          textStyle={{color: '#fff'}} 
          activeTabStyle={{backgroundColor: '#fa5555'}}
          activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
          heading="Latest Vacancy">
          <Card style={styles.mb}>
            <CardItem>
              <Body>
                <FlatList
                horizontal={true}
                data={this.state.dataSource}
                renderItem={({item}) => 
                    <CardComponent company={item.user.name} jobtitle={item.judul} salary={item.salary} location={item.city} img={item.user.ava} />
                } 
                keyExtractor={({id}) => id.toString()}
                />
              </Body>
            </CardItem>
          </Card>
          </Tab>
        </Tabs>


        <Content padder style={{ paddingTop:-50 }}>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Swipe')}>
          <Card>
              <CardItem style={styles.cardcolor}>
                <Body>
                  <View style={{ flexDirection:'row',alignSelf: 'center' }}>
                  <Icon active name="images" style={{ color:'white' }}/>
                  <Text style={{ color:'white', fontWeight: '400' }}>  Swipe & Apply</Text>
                  </View>
                </Body>
              </CardItem>
          </Card>
        </TouchableOpacity>

          <Card style={styles.mb}>
            <CardItem header>
              <Text style={styles.text}>Most Favorite Agency</Text>
            </CardItem>
            <CardItem>
              <Body>
                <FlatList
                horizontal={true}
                data={this.state.dataSource}
                renderItem={({item}) => 
                    <CardComponent company={item.user.name} jobtitle={item.judul} salary={item.salary} location={item.city} img={item.user.ava} />
                } 
                keyExtractor={({id}) => id.toString()}
                />
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  text: {
    fontWeight: '300',
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  cardcolor:{
    backgroundColor: '#fa5555',
  }
 
});  