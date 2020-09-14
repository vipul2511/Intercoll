import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions, YellowBox, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class Debtordetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          spinner: false,
           NewPhone: '',
           Moblie : '',
           Email : '',
           EDetails :'',
           Address : '',
           ClientNo :'',
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
         onChangeTextInput = (text) => {
          const num= text.replace(/[^0-9]/g, "");
          this.setState({ NewPhone: num });
       }
       onChangeTextInput1 = (text) => {
        const num= text.replace(/[^0-9]/g, "");
        this.setState({ Moblie: num });
     }
     onChangeTextInput2 = (text) => {
      const num= text.replace(/[^0-9]/g, "");
      this.setState({ ClientNo: num });
   }
     onChangeAddress=(text)=>{
      const num= text.replace(/[^\w\s]/gi, "");
        this.setState({ Address: num });
       }
       
         fun = async() => {
         
          let obj={};
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(this.state.NewPhone !==''){
            obj.Phone='New phone: '+ this.state.NewPhone;
          }
          if(this.state.Moblie!==''){
            obj.Moblie='New mobile: '+this.state.Moblie;
          }
          if(this.state.Email!=''){
            obj.EmailEFS='New email: '+this.state.Email;
          }
           if(this.state.Address!=''){
             obj.Address='New Address: '+this.state.Address;
           }
           if(this.state.EDetails!=''){
            obj.Emp_detaitls='Employment details: '+this.state.EDetails
           }
           if(this.state.ClientNo!=''){
            obj.Client_no='Client Number: '+this.state.ClientNo
           }
           await AsyncStorage.setItem('New_obj' , JSON.stringify(obj)).then(suc=>{
            this.props.navigation.navigate('NoteSummary'); 
          });
        
        
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
            <View style={{backgroundColor:'#fff'}}>
                <Text style={styles.utext}>New Debtor details</Text>
               </View> 

          </View>
      <ScrollView>
          
     <View style={{ flex: 1, backgroundColor:'#fff'}}>
               <View>
              <Text style={styles.Adnote}>New Phone</Text>
              <TextInput keyboardType='numeric'   maxLength={10}
              style={styles.inputbox} maxLength={10} onChangeText={this.onChangeTextInput} value={this.state.NewPhone}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>New Mobile</Text>
              <TextInput style={styles.inputbox} keyboardType='numeric'  
            maxLength={10}  onChangeText={this.onChangeTextInput1}  value={this.state.Moblie}> 
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>New Email / EFS</Text>
              <TextInput style={styles.inputbox} onChangeText={(text)=>{this.setState({Email:text.trim()})}}  value={this.state.Email}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>New Address / PFS</Text>
              <TextInput style={styles.Add_inputbox} onChangeText={this.onChangeAddress}  value={this.state.Address}>
              </TextInput>
            </View>
            <View style={{backgroundColor:'#fff'}}>
                <Text style={styles.utext}>Employer Details</Text>
                <TextInput style={styles.Add_inputbox} onChangeText={(text)=>{this.setState({EDetails:text})}}  value={this.state.EDetails}>
              </TextInput>
               </View>
               <View>
              <Text style={styles.Adnote}>CLIENT NUMBER</Text>
              <TextInput keyboardType="number-pad" style={styles.inputbox} onChangeText={this.onChangeTextInput2}  value={this.state.ClientNo}>
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
            alignSelf: 'center',
            width: width * 0.9,
            height: width * 0.20,
            overflow: 'scroll',
            backgroundColor: '#F3F4F4',
            borderWidth: 1,
            borderColor: 'lightgray',
            fontSize: 15,
            textAlignVertical: 'top',
            textAlign:'center'
          },

      });
    export default Debtordetails;