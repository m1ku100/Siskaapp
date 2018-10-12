import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Platform, StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import { Container, Content, Icon, Button} from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';

//Screen
import CardComponent from './CardComponent';

export default class Splash extends Component{
  constructor(props){
    super(props);
    this.state ={ isLoading: true, refreshing:false}
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
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
            <ActivityIndicator/>
          </View>
        )
      }
  
      return (
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
      
          <TouchableOpacity style={{flex: 1, }}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) => 
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail',{
                    judul: item.judul,
                    company: item.user.name,
                    img: item.user.ava,
                    salary: item.salary,
                    location: item.city,
                    update: item.updated_at,
                    syarat: item.syarat
                  })}>
                    <CardComponent company={item.user.name} jobtitle={item.judul} salary={item.salary} location={item.city} img={item.user.ava} />
                  </TouchableOpacity>
                } 
                keyExtractor={({id}) => id.toString()}
                onEndReached={this.handleLoadMore}
              />
          </TouchableOpacity>
        
        </ScrollView>
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
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});  