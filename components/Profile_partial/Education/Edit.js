import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  TouchableOpacity, Image, AsyncStorage, Alert} from 'react-native';
import { Icon,
    Container,
    Content, 
    Button,
    Form,
    Input,
    Item,
    Picker,
    Textarea} from 'native-base';


export default class Edit extends Component{
    
    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          dataSource: '',
          isproceeded: false,
          major:[],
          degree:[],
          tingkatpend_id:'',
          jurusanpend_id:'',
          selected_degree: '',
          selected_major: '',
          id: '',
          awards:'',
          school_name:'',
          start_period:'',
          end_period:'',
          nilai:'',
          selected_major:'',
          selected_degree:''
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
        const { navigation } = this.props;
        const id = navigation.getParam('id', '');
        fetch('http://192.168.16.14:8000/jwt/profile/edu/'+id+'?token='+token,{
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           this.setState({
            dataSource: responseJson,
            selected_degree: responseJson.tingkatpend_id,
            selected_major:responseJson.jurusanpend_id,
            awards: responseJson.awards,
            school_name: responseJson.school_name,
            start_period : responseJson.start_period,
            end_period : responseJson.end_period,
            nilai : responseJson.nilai,
            isLoading: false,
           })
        }).then(() => {
            fetch('http://192.168.16.14:8000/api/clients/major',{
           method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                id: id,
                major: responseJson,
            })
            })
        }).then(() => {
            fetch('http://192.168.16.14:8000/api/clients/degree',{
           method: 'GET'
            })
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({
                degree: responseJson,
            })
            })
        })
        .catch((error) => {
          alert(error);
        });
      }

      submit(){
        const {id} = this.state;
        const {selected_degree} = this.state;
        const {selected_major} = this.state;
        const {awards} = this.state;
        const {school_name} = this.state;
        const {start_period} = this.state;
        const {end_period} = this.state;
        const {nilai} = this.state;
       
        let data = JSON.stringify({
            id: id,
            tingkatpend_id: selected_degree,
            jurusanpend_id: selected_major,
            awards: awards,
            school_name: school_name,
            start_period: start_period,
            end_period: end_period,
            nilai: nilai
        })
        fetch('http://192.168.16.14:8000/jwt/profile/edu/update?token='+this.state.token, {
			method: 'post',
			header:{
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body:data
		})
		.then((response) => response.json())
			.then((responseJson) =>{
			 Alert.alert('Successfull',
            responseJson.message,
                [
                {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ]);
			})
			.catch((error)=>{
				alert(error);
			});

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
       <Container style={styles.container}>
           <Content padder>
                {/* <Text>{this.state.id}</Text>
                <Text>{this.state.selected_degree}</Text>
                <Text>{this.state.selected_major}</Text>
                <Text>{this.state.school_name}</Text>
                <Text>{this.state.start_period}</Text>
                <Text>{this.state.end_period}</Text>
                <Text>{this.state.nilai}</Text>
                <Text>{this.state.awards}</Text>
                 */}
                <Form>
                    <Text>School name</Text>
                    <Item regular>
                    <Input placeholder="School name"
                    onChangeText= {school_name => this.setState({school_name})}
                    defaultValue={(this.state.dataSource || {}).school_name} />
                    </Item>

                    <Text>Major</Text>
                    <Item regular>
                    <Picker
                    selectedValue={this.state.selected_major}
                    onValueChange={selected_major => this.setState({selected_major})}
                    mode='dialog'>
                        {this.state.major.map((v,index) => {
                            return (<Picker.Item label={v.name} value={v.id} key={index}/>)
                        })}
                    </Picker>
                    </Item>

                    <Text>Degree</Text>
                    <Item regular>
                    <Picker
                    selectedValue={this.state.selected_degree}
                    onValueChange={selected_degree => this.setState({selected_degree})}
                    mode='dialog'>
                        {this.state.degree.map((v,index) => {
                            return (<Picker.Item label={v.name} value={v.id} key={index}/>)
                        })}
                    </Picker>
                    </Item>

                    <Text>Period</Text>

                    <View style={{ flexDirection:'row' }}>
                    <View style={{ width:190 }}>
                    <Item regular>
                    <Input 
                    placeholder="Start"
                    onChangeText= {start_period => this.setState({start_period})}
                    defaultValue={(this.state.dataSource || {}).start_period}/>
                    </Item>
                    </View>
                    <Text> - </Text>
                    <View style={{ width:190 }}>
                    <Item regular>
                    <Input 
                    placeholder="End"
                    onChangeText= {end_period => this.setState({end_period})}
                    defaultValue={(this.state.dataSource || {}).end_period} />
                    </Item>
                    </View>
                    </View>

                    <Text>GPA<Text note>(Optional)</Text></Text>
                    <Item regular>
                    <Input placeholder="School name" keyboardType='decimal-pad' 
                    onChangeText= {nilai => this.setState({nilai})}
                    defaultValue={(this.state.dataSource || {}).nilai}/>
                    </Item>
                    
                    <Text>Award</Text>
                    <Item regular>
                    <Textarea placeholder="Award that you ever achieved" 
                    onChangeText= {awards => this.setState({awards})}
                    defaultValue={(this.state.dataSource || {}).awards}/>
                    </Item>

                    <View>
                    <Button 
                    onPress={() => this.submit()}
                    block style={{ backgroundColor:'#fa5555',  }}>
                        <Text style={{ color:'white',fontWeight:'bold' }}>Submit</Text>
                    </Button>
                    </View>
                </Form>
            </Content>
       </Container>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    text: {
		fontWeight: 'bold',
		fontSize: 18,
		textAlign: 'center',
		color: 'white',
	},
});  