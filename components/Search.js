import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Platform, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Modal, Alert} from 'react-native';
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
	Spinner,
	Form,
	Picker,
	CheckBox,
	ListItem
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
			checked: false,
			modalVisible: false,
			secondmodal: false,
			currencies: [],
			industries_data:[]
            
		}
	}
	
	onValueChange(value) {
		this.setState({
		  loc: value
		});
	}

	setModalVisible(visible) {
		this.setState({
			modalVisible: visible,
		});
	}

	setIndustry(value){
		if(this.state.industry_ids == ''){
			this.setState({
				industry_ids:  value,
			})
		}else(
			this.setState({
				industry_ids: this.state.industry_ids+','+ value,
			})
		)
		
	}

	search(){
		this.setState({
			modalVisible: false,
			isLoading:true,
			dataSource: null
		});

		const {key} = this.state;
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

	/**
	 * for 1st search 
	 * 
	 */  
	searchFecth(){
		
		const { navigation } = this.props;
		const q = navigation.getParam('key', '');
		
		const {key} = this.state;
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
			q: q,
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

fecthComponent(){
	var cities = 'http://192.168.16.14:8000/api/clients/cities';
	var job_func = 'http://192.168.16.14:8000/api/clients/jobfunction';
	var industries = 'http://192.168.16.14:8000/api/clients/industries';
	var degree_id = 'http://192.168.16.14:8000/api/clients/degree';

	fetch(cities).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        currencies : responseJson
			})
			console.log(responseJson);
    }).then(() => {
      fetch(job_func).then((responsejob_func) => responsejob_func.json())
      .then((responsejob_func) => {
        this.setState({
          job_func_data : responsejob_func,
        })
      })
    }).then(() => {
		fetch(industries).then((responseindustries) => responseindustries.json())
      	.then((responseindustries) => {
        this.setState({
			industries_data : responseindustries,
        })
      })
	}).then(() => {
		fetch(degree_id).then((responsedegree_id) => responsedegree_id.json())
      .then((responsedegree_id) => {
        this.setState({
			degree_id : responsedegree_id,
        })
      })
	}).then(() => {
		fetch('https://s3.amazonaws.com/cbu-rec-center-app/credentials/schedule.json').then((json) => json.json())
      .then((json) => {
        this.setState({
			res : json,
        })
      })
	}).catch((error) => {
      console.error(error)
    })

}

componentDidMount(){
	const { navigation } = this.props;
	const q = navigation.getParam('key', '');
	this.setState({
		key: q
	});
	this.fecthComponent();
	this.searchFecth();
	
}
render() {
    const isLoading = this.state.isLoading;
	
		return (			
			<Container style={styles.container}>
			<Header searchBar rounded style={{ backgroundColor:'#fa5555' }}
			androidStatusBarColor="#fa6666" >
				<Item>
				<Button transparent onPress={() => this.props.navigation.goBack()}>
					<Icon name="arrow-back" />
				</Button>
					<Input 
					defaultValue={this.state.key}
					onChangeText={key => this.setState({key})}
					returnKeyType="go"
					onSubmitEditing={() => this.search()}
					placeholder="Job tittle" />
				</Item>
			</Header>

			<Content >
				{isLoading ? <Spinner  color="red"/> :
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
		
		</ScrollView>}
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
          animationType="slide"
		  	  transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>

			{/*Modal Content start Here */}

		  <Header rounded style={{ backgroundColor:'#fa5555' }}
			androidStatusBarColor="#fa6666" >
			<Left>
				<Button 
					transparent 
					style={{ backgroundColor:'#fa5555' }}
					onPress={() => {
                  	this.setModalVisible(!this.state.modalVisible);}}>
					<Icon name="close" style={{ color:'white', fontSize:24}}/>
				</Button>
			</Left>
			  	<Body >
					<Text style={{ color:'white',fontSize:18 }}>Filter</Text>
				</Body>
				
		  </Header>
						
						<Modal
						visible={this.state.secondmodal}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
						}}>
							<Header rounded style={{ backgroundColor:'#fa5555' }}
							androidStatusBarColor="#fa6666" >
							<Left>
								<Button 
									transparent 
									style={{ backgroundColor:'#fa5555' }}
									onPress={() => {
														this.setState({secondmodal:false})
														}}>
									<Icon name="arrow-back" style={{ color:'white', fontSize:24}}/>
								</Button>
							</Left>
							<Body >
								<Text style={{ color:'white',fontSize:18 }}>industry</Text>
							</Body>
							</Header>

							<View padder>
							<Text>{this.state.industry_ids}</Text>
						<ScrollView>

									{this.state.industries_data.map((v,index)=>{
											
											return ( 
											<ListItem button >
											<CheckBox
											color="red"
											checked={this.state.checked}
											key={v.id}
											onPress={()=>this.setIndustry(v.id)}
											/>
											<Body>
												<Text>{v.nama}</Text>
											</Body>
										</ListItem>)
									})}

									</ScrollView>
							</View>
						</Modal>


		  <View padder>
          <Form>
          	<Text>Job Title</Text>
            <Item regular>
						<Input 
						defaultValue={this.state.key}
						onChangeText={key => this.setState({key})}
						placeholder="Job Title" />
            </Item>
		
						<Text>Location</Text>
            <Item >
						<Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.loc}
              onValueChange={loc => this.setState({loc})}
            >
						<Picker.Item label="-- Choose Location --" value="" />
						 {this.state.currencies.map( (v,index)=>{
   							return <Picker.Item label={v.name} value={v.id} key={index}/>
 						 }) }
            </Picker>
            </Item>

					<Text>Industry</Text>
					
						<Item regular>
								<Input 
								onFocus={()=> this.setState({secondmodal:true})}
								placeholder="Industry"
								defaultValue={this.state.industry_ids}
								/>
            </Item>
						
					<Text>Indutry</Text>
								<Item regular>
					<Picker
              note
              mode="dropdown"
              style={{ width: 120 }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
            </Item>
          </Form>
        </View>

						<View style={{ flexDirection:'row',alignSelf: 'center' }}>
						<Button rounded
						onPress={() => {
							this.search();
							}}
						style={{ backgroundColor:'#fa5555',  }}>
            <Text>Search</Text>
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