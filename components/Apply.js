import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ActivityIndicator,} from 'react-native';
import { Icon, Container, Content, Right, Left, Body,} from 'native-base';
import { List, ListItem } from "react-native-elements";

export default class Apply extends Component{
  state = {
    data: [],
    page: 0,
    loading: false
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true });
    const response = await fetch(
      `https://randomuser.me/api?results=15&seed=hi&page=${this.state.page}`
    );
    const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json.results],
      loading: false
    }));
  };

  handleEnd = () => {
    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
  };

  render() {
    return (
      <Container style={styles.container}>
      <View>
        <List>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i.toString()}
            onEndReached={() => this.handleEnd()}
            onEndReachedThreshold={0}
            ListFooterComponent={() =>
              this.state.loading
                ? null
                : <ActivityIndicator size="large" animating />}
            renderItem={({ item }) =>
              <ListItem
                roundAvatar
                avatar={{ uri: item.picture.thumbnail }}
                title={`${item.name.first} ${item.name.last}`}
              />}
          />
        </List>
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