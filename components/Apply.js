import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ActivityIndicator,Picker} from 'react-native';
import { Icon, Container, Content, Right, Left, Body,} from 'native-base';
import { List, ListItem } from "react-native-elements";

export default class Apply extends Component{

  state = {
    time: '',
    language: ''
  };

  render() {
    return (
      <Container style={styles.container}>
      <View style={{ paddingTop: 10, paddingLeft:15, paddingRight:15,}}>
        <View style={{ flexDirection:'row',justifyContent: 'center', paddingBottom:5 }} >
        
              <Picker
              selectedValue={this.state.time}
              onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue})}
              style={{ width:150 }}
              prompt="Sort By" >
              <Picker.Item label="Time" value="1" />
              <Picker.Item label="All Time" value="2" />
              <Picker.Item label="Today" value="3" />
              <Picker.Item label="Last 7 Days" value="4" />
              <Picker.Item label="Last 1 Month" value="5" />

            </Picker>
            <View style={{ borderLeftColor:'#eae5e5', borderLeftWidth: 2 }} />
            
            <Picker
            style={{ width:150 }}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
            prompt="Sort By" >
            <Picker.Item label="Status" value="status" />
            <Picker.Item label="All Status" value="all" />
            <Picker.Item label="Matched" value="Matched" />
            <Picker.Item label="Not Matched" value="not" />
          </Picker>

        </View>
      </View>

      <View style={{ paddingTop: 10, paddingLeft:15, paddingRight:15}}>
        <View style={{ justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5',  paddingBottom: 15, }}>
          <Text> Job vacancies that you have applied for and their status </Text>
        </View>
       </View>

      <View style={{ paddingTop: 10 }}> 

      </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
});  