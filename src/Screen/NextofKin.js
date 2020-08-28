import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Dimensions, YellowBox, ActivityIndicator, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class NextofKin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          spinner: false,
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
           let screen= this.state.screenName;
            if(screen=="UpdateProfile"){
             this.props.navigation.navigate('FieldUpdate');
             return true;
              }
           else{
             console.log("not executed");
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
            <View style={{backgroundColor:'#fff'}}>
                <Text style={styles.utext}>Next of Kin 1</Text>
               </View> 

          </View>
      <ScrollView>
          
     <View style={{ flex: 1, backgroundColor:'#fff'}}>
               <View>
              <Text style={styles.Adnote}>NOK 1 Name</Text>
              <TextInput style={styles.inputbox}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK Relationship</Text>
              <TextInput style={styles.inputbox}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK Phone </Text>
              <TextInput style={styles.inputbox}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK Email</Text>
              <TextInput style={styles.inputbox}>
              </TextInput>
            </View>
            <View style={{backgroundColor:'#fff'}}>
                <Text style={styles.utext}>Next of Kin 2</Text>
                <Text style={styles.Adnote}>NOK 2 Name</Text>
                <TextInput style={styles.inputbox}>
              </TextInput>
               </View>
               <View>
              <Text style={styles.Adnote}>NOK 2 Relationship</Text>
              <TextInput style={styles.inputbox}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK 2 Phone </Text>
              <TextInput style={styles.inputbox}>
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>NOK 2 Email</Text>
              <TextInput style={styles.inputbox}>
              </TextInput>
            </View>
              
            <View style={styles.arrowsButton}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('NoteSummary')}} style={styles.box}><Image style={styles.arrow} source={require('../assets/arrow1.png')} /></TouchableOpacity>
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
            textAlignVertical: 'top'
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
            textAlignVertical: 'top'
          },

      });
    export default NextofKin;