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


export default class Create extends Component{
    
    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          dataSource: '',
          isproceeded: false,
          id: '',
          name:'',
          start_period:'',
          end_period:'',
          title:'',
          descript:'',
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
        fetch('http://192.168.16.14:8000/jwt/profile/organization/'+id+'?token='+token,{
           method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
           this.setState({
            dataSource: responseJson,
            id: id,
            name: responseJson.name,
            title:responseJson.title,
            descript: responseJson.descript,
            start_period : responseJson.start_period,
            end_period : responseJson.end_period,
            isLoading: false,
           })
        })
        .catch((error) => {
          alert(error);
        });
      }

      submit(){
        const {id} = this.state;
        const {name} = this.state;
        const {title} = this.state;
        const {descript} = this.state;
        const {start_period} = this.state;
        const {end_period} = this.state;
       
        let data = JSON.stringify({
            id: id,
            name: name,
            title: title,
            descript: descript,
            start_period: start_period,
            end_period: end_period,
            nilai: nilai
        })
        fetch('http://192.168.16.14:8000/jwt/profile/organization/save?token='+this.state.token, {
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
                    <Text>Name</Text>
                    <Item regular>
                    <Input placeholder="School name"
                    onChangeText= {name => this.setState({name})}
                     />
                    </Item>

                    <Text>Title</Text>
                    <Item regular>
                    <Input placeholder="School name"
                    onChangeText= {title => this.setState({title})}
                   />
                    </Item> 

                    <Text>Period</Text>

                    <View style={{ flexDirection:'row' }}>
                    <View style={{ width:190 }}>
                    <Item regular>
                    <Input 
                    placeholder="Start"
                    onChangeText= {start_period => this.setState({start_period})}
                    />
                    </Item>
                    </View>
                    <Text> - </Text>
                    <View style={{ width:190 }}>
                    <Item regular>
                    <Input 
                    placeholder="End"
                    onChangeText= {end_period => this.setState({end_period})}
                     />
                    </Item>
                    </View>
                    </View>
                    
                    <Text>Award</Text>
                    <Item regular>
                    <Textarea placeholder="Award that you ever achieved" 
                    onChangeText= {awards => this.setState({awards})}
                    />
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