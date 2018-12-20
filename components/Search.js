import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Platform, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Modal} from 'react-native';
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
	View,
	Fab,
	Right,
	Left,
	Spinner
} from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';

//Screen
import CardComponent from './CardComponent';

export default class Search extends Component{
	static navigationOptions = {
		header: null,
      };

	constructor(props){
		super(props);
		this.state ={ 
			isLoading: true, 
			refreshing:false,     
			key: '',
			agen:'',
			loc:'',
			salary_ids:'',
			jobfunc_ids:'',
			industry_ids:'',
			degree_ids:'',
			major_ids:'',
			modalVisible: false,
		}
	}
	
	_onRefresh = () => {
		this.setState({refreshing: true});
		this.componentDidMount().then(() => {
			this.setState({refreshing: false});
		});
	}
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	  }

	searchFecth(){
		const { navigation } = this.props;
		const key = navigation.getParam('key', '');
		
		
		const {agen} = this.state;
		const {loc} = this.state;
		const {salary_ids} = this.state;
		const {jobfunc_ids} = this.state;
		const {industry_ids} = this.state;
		const {degree_ids} = this.state;
		const {major_ids} = this.state;
		
		fetch('http://192.168.16.14:8000/api/search', {
		method: 'post',
		header:{
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body:JSON.stringify({
			q: key,
			agen:agen,
			loc:loc,
			salary_ids:salary_ids,
			jobfunc_ids:jobfunc_ids,
			industry_ids:industry_ids,
			degree_ids:degree_ids,
			major_ids:major_ids,
		})
		
	})
	.then((response) => response.json())
	.then((responseJson) =>{
		
		this.setState({
			isLoading: false,
			dataSource: responseJson,
		});
	})
	.catch((error)=>{
		console.error(error);
	});
}

componentDidMount(){
	
	return this.searchFecth()
	
}
render() {
	
	if(this.state.isLoading){
		return(
			<View style={{flex: 1, padding: 20}}>
				 <Spinner color="red" />
			</View>
			)
		}
		
		return (			
			<Container style={styles.container}>
			<Header searchBar rounded style={{ backgroundColor:'#fa5555' }}
			androidStatusBarColor="#fa6666" >
				<Item>
				<Button transparent onPress={() => this.props.navigation.goBack()}>
					<Icon name="arrow-back" />
				</Button>
					<Input 
					onChangeText={q => this.setState({q})}
					returnKeyType="go"
					onSubmitEditing={() => this.sendSearchKey()}
					placeholder="Job tittle" />
				</Item>
			</Header>

			<Content >
			<ScrollView
			pagingEnabled={true}
			refreshControl={
				<RefreshControl
				refreshing={this.state.refreshing}
				onRefresh={this._onRefresh}
				/>}>

			<FlatList
			data={this.state.dataSource}
			renderItem={({item}) => 
			<TouchableOpacity onPress={() => this.props.navigation.navigate('Detail',{
				id: item.id,
			})}>
			<CardComponent company={item.user.name} jobtitle={item.judul} salary={item.salary} location={item.city} img={item.user.ava} />
			</TouchableOpacity>
			} 
			keyExtractor={({id}) => id.toString()}
			onEndReached={this.handleLoadMore}
			/>
		
		</ScrollView>
		</Content>
		<View >
			<Fab
				active={false}
				direction="up"
				containerStyle={{ }}
				style={{ backgroundColor: '#fa5555' }}
				position="bottomRight"
				onPress={() => {
					this.setModalVisible(true);
				  }}>
				<Icon name="options" />
				
			</Fab>
		</View>

		<View style={{marginTop: 22}}>
        <Modal
          animationType="fade"
		  transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>

		  <Header rounded style={{ backgroundColor:'#fa5555' }}
			androidStatusBarColor="#fa6666" >
			<Left>
					<Button 
					transparent 
					style={{ backgroundColor:'#fa5555' }}
					onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
					
					<Icon name="close" style={{ color:'white', fontSize:24}}/>
				</Button>
			</Left>
			  	<Body >
					<Text style={{ color:'white',fontSize:18 }}>Filter</Text>
				</Body>
				
		  </Header>

            <View>
              <Text>Hello World!</Text>
              <Button
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </Button>
            </View>


          </View>
        </Modal>
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
		color: 'white',
	},
});  