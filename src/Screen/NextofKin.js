import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions, YellowBox, ActivityIndicator, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class NextofKin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          spinner: false,
          No1name:'',
          No2name:'',
          N1Relationship:'',
          No2Relationship:'',
          N1phone:'',
          N2phone:'',
          N1email:'',
          N2email:''
          }
            this.backItems= this.backItems.bind(this);
        }
        componentDidMount(){
            BackHandler.addEventListener('hardwareBackPressed',this.backItems);
        }
        componentWillUnmount(){
         BackHandler.removeEventListener('hardwareBackPressed',this.backItems)
        }
         backItems(){
             this.props.navigation.goBack();
             return true;
         } 
         fun = async() => {
           console.log(this.state.N2phone);
          if ( this.state.No1name !==  '' || this.state.No2name !== '')  {
           if (this.state.N1Relationship !== '' || this.state.No2Relationship !== '' ) {
                if(this.state.N1phone !== '' || this.state.N2phone !== '') {
                  if(this.state.N1email !== '' || this.state.N2email !=='') {
                  
                      let obj = {
                      No1Kin:'NOK 1 name: '+this.state.No1name,
                      Nok1Rel:'NOK 1 Relationship: '+this.state.N1Relationship,
                      No1Phone:'NOK 1 Phone: '+this.state.N1phone,
                      No1Email:'NOK 1 Email: '+ this.state.N1email,
                     }
                     if(this.state.No1name!==''&& this.state.N1Relationship!==''&& this.state.N1phone!==''&&this.state.N1email!==''){
                     if(this.state.No2name!==''&&this.state.No2Relationship!==''&& this.state.N2phone!==''&&this.state.N2email!==''){
                      obj.No2Kin='NOK 2 Name: '+ this.state.No2name;
                      obj.Nok2Relat='NOK 2 Relationship: '+ this.state.No2Relationship;
                      obj.No2Phone='NOK 2 Phone: '+ this.state.N2phone;
                      obj.No2Email='NOK 2 Email: '+this.state.N2email;
                      console.log(obj);
                     await AsyncStorage.setItem('NextKin',JSON.stringify(obj)).then(succ=>{
                      this.props.navigation.navigate('NoteSummary'); 
                     });
                     }
                    }else{
                      alert("Please fill the first section");
                    }
                    if(this.state.No1name!==''&& this.state.N1Relationship!==''&& this.state.N1phone!==''&&this.state.N1email!==''){
                    console.log(obj);
                     await AsyncStorage.setItem('NextKin',JSON.stringify(obj)).then(succ=>{
                      this.props.navigation.navigate('NoteSummary'); 
                     });
                    }
                     
                  }
                  else {
                    alert('Please enter email address')
                  }
                }
                else {
                  alert('Please enter phone number ')
                }
              }
                else {
                  alert('Please enter Relationship')
                }
              }
                else {
                  alert('Please enter name')
                }
              }    
    render() {
        return (
          <View style={{flex:1}} >
          <View style={styles.body}>
          <View>
                 <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
               </View>
            <View>
              <Image style={styles.logo} source={require('../assets/logo.png')} />
            </View>
            </View>
            <ScrollView>
            <View style={{backgroundColor:'#fff'}}>
                <Text style={styles.utext}>Next of Kin 1</Text>
               </View> 

          
     
          
     <View style={{ flex: 1, backgroundColor:'#fff'}}>
               <View>
              <Text style={styles.Adnote}>NOK 1 Name</Text>
              <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({No1name:text})}}  value={this.state.No1name}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK 1 Relationship</Text>
              <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({N1Relationship:text})}}  value={this.state.N1Relationship}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK 1 Phone </Text>
              <TextInput style={styles.inputbox} keyboardType="numeric" onChangeText={(text)=>{this.setState({N1phone:text})}}  value={this.state.N1phone}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK 1  Email</Text>
              <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({N1email:text})}}  value={this.state.N1email}>
              </TextInput>
            </View>
            <View style={{backgroundColor:'#fff'}}>
                <Text style={styles.utext}>Next of Kin 2</Text>
                <Text style={styles.Adnote}>NOK 2 Name</Text>
                <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({No2name:text})}}  value={this.state.No2name}>
              </TextInput>
               </View>
               <View>
              <Text style={styles.Adnote}>NOK 2 Relationship</Text>
              <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({No2Relationship:text})}}  value={this.state.No2Relationship}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK 2 Phone </Text>
              <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({N2phone:text})}}  value={this.state.N2phone}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote} >NOK 2 Email</Text>
              <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({N2email:text})}}  value={this.state.N2email}>
              </TextInput>
            </View>
              
            <View style={styles.arrowsButton}>
            <TouchableOpacity onPress={this.fun} style={styles.box}><Image style={styles.arrow} source={require('../assets/arrow1.png')} /></TouchableOpacity>
            </View>
         
            </View>
            </ScrollView>
            </View>
           

        )
      }
    
    };
    const styles = StyleSheet.create({
        arrowsButton:{
          flex:1,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginBottom:15
            },
        spinnerTextStyle: {
          color: '#FFF'
        },
    
        body:
        {
          backgroundColor: 'white'
        },
        utext:
        {
          fontSize: 26,
          textAlign: 'center',
          marginTop: width * 0.02,
          color: '#052761',
          fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
        },
        logo: {
          width: width * 0.8,
          height: height * 0.1,
          alignSelf: 'center',
          marginTop: width * 0.05
        },
        arrow:
        {
          alignSelf: 'center',
          marginTop: width * 0.01,
          width: 55,
          height: 35
        },
        box: {
          width:width*0.24,
          marginLeft:10,
          marginRight:10,
          height: 43,
          backgroundColor: '#21AAF9',
          marginTop: width * 0.1,
          borderRadius: 10,
          alignSelf: 'center'
        },
        Adnote: {
            marginTop: width * 0.02,
            fontSize: 18,
            textAlign: 'center',
            fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
          },
          inputbox:
          {
            marginTop: 8,
            alignSelf: 'center',
            width: width * 0.9,
            height: width * 0.1,
            overflow: 'scroll',
            backgroundColor: '#F3F4F4',
            borderWidth: 1,
            borderColor: 'lightgray',
            fontSize: 15,
            textAlignVertical: 'top',
            textAlign:'center'
          },
          Add_inputbox :  {
            marginTop: 8,
            textAlign:'center',
            alignSelf: 'center',
            width: width * 0.9,
            height: width * 0.20,
            overflow: 'scroll',
            backgroundColor: '#F3F4F4',
            borderWidth: 1,
            borderColor: 'lightgray',
            fontSize: 15,
            textAlignVertical: 'top'
          },

      });
    export default NextofKin;