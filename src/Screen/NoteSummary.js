import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions, Image, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RNSmtpMailer from "react-native-smtp-mailer";
import Icon from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import base64 from 'react-native-base64';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class NoteSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '',
      fieldNum: false,
      date: new Date(),
      getValue: [],
      newData: '',
      newStringArr: [],
      newArr: '',
      subjectTitle: '',
      valueItem: '',
      newStringARR: '',
      newFieldARR: '',
      finalDataTosend: '',
      UserName: '',
      AddNote: null,
      finalNotes: null,
      finalDataTosend: '',
      spinner: false,
      screenName: this.props.route.name,
      perScreen: '',
      agentUpdatedID: '',
      fieldNumber: '',
      ERF: '',
      CET: '',
      opDateTime: null,
      fieldSend: null,
      payItem: null,
      payment: '',
      Combine: '',
      CombineVal: true
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  loading() {
    this.setState({ spinner: true });
  }
  retrieveData = async () => {
    let field = this.state.newData;
    const data1 = await AsyncStorage.getItem("Field_call");
    field = JSON.parse(data1);
    this.setState({ newData: field });
    console.log(`the data of first${this.state.newData}`);
  }
  getData = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    let list = this.state.getValue;
    let data1 = await AsyncStorage.getItem("Update");
    console.log("this is data" + data1);
    if (this.state.getValue.length != 0) {
      list.shift();
      this.setState({ getValue: [...this.state.getValue, JSON.parse(data1)] });
      console.log("shifted work");
    } else {
      this.setState({ getValue: [...this.state.getValue, JSON.parse(data1)] });
      console.log("unshifted not worked");
    }
    let field = this.state.newData;
    const data2 = await AsyncStorage.getItem("Field_call");
    field = JSON.parse(data2);
    this.setState({ newData: field });
    console.log("the array");
    console.log(this.state.newData);

    const idd = await AsyncStorage.getItem("fieldData");
    const IDs = JSON.parse(idd);
    let fieldCall = Object.values(IDs);
    this.setState({ fieldSend: fieldCall });

    let listItem = [this.state.valueItem]
    let data3 = await AsyncStorage.getItem("Update");
    listItem = (JSON.parse(data3));
    console.log(listItem);
    this.setState({ valueItem: listItem });
    let CCID = `CCID ${this.state.valueItem.Ccid} Agent Update`;
    let ccidDIS = `CCID:${this.state.valueItem.Ccid}`
    let Arr = [];
    Arr.push(this.state.valueItem.OPCode, this.state.valueItem.newDate, this.state.valueItem.Time);
    let item = Arr.join(",");
    this.setState({ opDateTime: item });
    this.setState({ fieldNumber: ccidDIS });
    this.setState({ subjectTitle: CCID });
    console.log(this.state.valueItem);
    console.log(this.state.subjectTitle);

    let de_PS = await AsyncStorage.getItem('UU');
    let gy_EI = await AsyncStorage.getItem('FF');
    let base_otp = base64.decode(de_PS);
    let base_us = base64.decode(gy_EI);
    this.setState({ ERF: base_us });
    this.setState({ CET: base_otp });
    console.log(de_PS);
    console.log(gy_EI);

    let pay = await AsyncStorage.getItem('payment');
    let payData = JSON.parse(pay);
    this.setState({ payItem: payData });
    console.log(this.state.payItem);
    if (this.state.payItem != null) {
      let ArrITem = [];
      let PayMode = "Payment Method: " + this.state.payItem.payMode;
      ArrITem.push(PayMode, this.state.payItem.numeric, this.state.payItem.textData, this.state.payItem.SetDate);
      let ArrItem = ArrITem.join(",");
      this.setState({ payment: ArrItem });
    }
    let newStringData = Object.values(this.state.valueItem);
    let newString = this.state.newStringARR;
    newString = newStringData;
    this.setState({ newStringARR: newString });
    console.log("this is string" + this.state.newStringARR);

    let newStringData1 = Object.values(this.state.newData);
    let newStringField = this.state.newFieldARR;
    newStringField = newStringData1;
    this.setState({ newFieldARR: newStringField })
    console.log("this is string" + this.state.newFieldARR);

    let finalData = this.state.finalDataTosend;
    let dat = this.state.finalArr;
    finalData = (this.state.newStringARR).toString() + (this.state.newFieldARR).toString();
    this.setState({ finalDataTosend: finalData });
    console.log("This is final Data" + this.state.finalDataTosend);

    let temp_user = this.state.UserName;
    let data4 = await AsyncStorage.getItem("username");
    temp_user = JSON.parse(data4);
    this.setState({ UserName: temp_user });
    console.log(this.state.UserName);

    let agent = await AsyncStorage.getItem("agentEmail");
    let mailed = JSON.parse(agent)
    this.setState({ agentUpdatedID: mailed });

    let nam = await AsyncStorage.getItem("ScreenName");
    this.setState({ perScreen: nam });
    let WQE = base64.decode(this.state.AscData);
    let IWQ = base64.decode(this.state.GFT);
  }
  onChangeCombine = (text) => {
    const num = text.replace(/[^0-9,]/g, "");
    this.setState({ Combine: num });
  }
  newFuncEND = () => {
    this.loading();
    let item = this.state.Combine;
    let ID = item.split(",")
    console.log(ID);
    var lengths = ID.map(function (word) {
      if (word.length >= 5 && word.length <= 7) {
        return true;
      } else {
        return false;
      }
    });
  let DataItem=lengths.every(i=>i==true);
 this.setState({CombineVal:DataItem});
    setTimeout(this.sendEmail,1000);

  }
  newID = () => {
    console.log(this.state.CombineVal);
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
  }
  handleBackButtonClick() {
    let previous = this.state.perScreen
    let screens = this.state.screenName;
    if (screens == "NoteSummary") {
      this.props.navigation.navigate(previous);
      return true;
    } else {
      console.log("not working");
    }
  }
  activity = () => {
    if (this.state.showIndicator) {
      return (
        <View style={{
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color='#24a4dc' />
        </View>
      );
    }
  }
  newFunct = () => {
    let final = this.state.finalDataTosend;
    let newData = this.state.finalNotes;
    let addnote = this.state.AddNote;
    let newFinal = final + addnote;
    newData = newFinal
    this.setState({ finalNotes: newData });
    console.log("new final data" + this.state.finalNotes);
  }
  sendEmail = () => {
    this.loading();
    let addnote = this.state.AddNote;
    let fin = '';
    if (this.state.Combine != '') {
      fin = 'Combine: ' + this.state.Combine;
    }
    if(this.state.CombineVal ==true){
    if (addnote !== null) {
      RNSmtpMailer.sendMail({
        mailhost: "smtp.office365.com",
        port: "587",
        ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
        username: this.state.ERF,
        password: this.state.CET,
        from: this.state.ERF,
        recipients: "Harshitashrimali980@gmail.com",
        bcc: ["harshitashrimali980@gmail.com"],
        subject: this.state.subjectTitle,
        htmlBody: `<p>Username: ${this.state.UserName}</p> <p>${this.state.fieldNumber}</p> <p>${this.state.opDateTime}</p> <p>${this.state.valueItem.Address}</p> <p>${this.state.fieldSend}</p> <p>${this.state.payment}</p> <p>Notes: ${addnote}</p> <p>${fin}</p>`,
        attachmentPaths: [],
        attachmentNames: [],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
        attachmentTypes: []//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
      })
        .then(success => {
          this.props.navigation.navigate('FinalSent');8
          this.setState({ spinner: false })
        })
        .catch(err => {
          Toast.show(`${this.state.UserName} something went wrong when trying to send email.Please contact Admin`, Toast.LONG);
          this.setState({ spinner: false })
        }
        );
    } else {
      let fin = '';
      if (this.state.Combine != '') {
        fin = 'Combine: ' + this.state.Combine;
      }
      RNSmtpMailer.sendMail({
        mailhost: "smtp.office365.com",
        port: "587",
        ssl: false, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
        username: this.state.ERF,
        password: this.state.CET,
        from: this.state.ERF,
        recipients: "harshitashrimali980@gmail.com",
        bcc: ["harshitashrimali980@gmail.com"],
        subject: this.state.subjectTitle,
        htmlBody: `<p>Username: ${this.state.UserName}</p> <p>${this.state.fieldNumber}</p> <p>${this.state.opDateTime}</p> <p>${this.state.valueItem.Address}</p> <p>${this.state.fieldSend}</p> <p>${this.state.payment}</p> <p>${fin}</p>`,
        attachmentPaths: [],
        attachmentNames: [],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
        attachmentTypes: []//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
      })
        .then(success => {
          this.props.navigation.navigate('FinalSent');
          this.setState({ spinner: false })
        })
        .catch(err => {
          Toast.show(`${this.state.UserName} something went wrong when trying to send email.Please contact Admin`, Toast.LONG);
          this.setState({ spinner: false })
        })
    }
  }else{
    alert("Please input correct CCID number");
    this.setState({ spinner: false })
  }
  };
  backItem = () => {
    this.props.navigation.navigate('CustomButton');
  }

  listOption = () => {
    return this.state.getValue.map((item, index) => {
      return (<View key={index}>
        <Text style={styles.noteText}>
          {item.OPCode}, {this.state.fieldNumber}, {item.newDate}, {item.Time}, {item.Address},  {Object.values(this.state.newData).join(",  ")} </Text>
      </View>
      );
    })
  }
  removeData = async () => {
    const removeData = await AsyncStorage.removeItem('Field_call');
    await AsyncStorage.removeItem('Update');
    await AsyncStorage.removeItem('payment');
    console.log(removeData);
    this.props.navigation.navigate('FieldUpdate');
  }
  render() {
    return (
      <View style={{ flex: 1 }} >
        <View style={{ backgroundColor: '#fff' }}>
          <Icon name="menu" color='#24a4dc' size={35} style={{ marginLeft: 8, marginTop: 10 }} onPress={() => this.props.navigation.toggleDrawer()} />
          <Text style={styles.utext}>Notes summary</Text>
        </View>
        <ScrollView style={styles.body}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ justifyContent: 'center' }}
        >
          <Spinner
            visible={this.state.spinner}
            textContent={'Please Wait...'}
            textStyle={styles.spinnerTextStyle}
          />
          <View>
            <View>
            </View>
            <View>
              <ScrollView>
                <View style={styles.textBox}>
                  <ScrollView>
                    {this.listOption()}
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
            <View>
              <Text style={styles.Adnote}>Additional notes</Text>
              <TextInput style={styles.inputbox}
                multiline={true}
                numberOfLines={7}
                onChangeText={(text) => this.setState({ AddNote: text })}
              >
              </TextInput>
            </View>
            <View>
              <Text style={styles.Adnote}>Combine</Text>
              <TextInput style={styles.Com_inputbox}
                multiline={true}
                numberOfLines={7}
                onChangeText={this.onChangeCombine}
                value={this.state.Combine}
              >
              </TextInput>
            </View>
            <View>
            <TouchableOpacity style={styles.paymentBtn} onPress={()=>{this.props.navigation.navigate('Debtordetails')}}><Text style={styles.pay_word}>New debtor details / EFS / PFS
</Text></TouchableOpacity>
            <TouchableOpacity style={styles.paymentBtn} onPress={()=>{this.props.navigation.navigate('NextofKin')}}><Text style={styles.pay_word}>Next of kin
</Text></TouchableOpacity>
            </View>
            {this.activity()}
            <View style={{ marginTop: height * 0.01, marginBottom: 10 }}>
              <View style={styles.buttons}>
                <Text style={styles.send1}>Send</Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={this.backItem} style={styles.box}>
                  <Image style={styles.arrow} source={require('../assets/arrow2.png')} /></TouchableOpacity>
                <TouchableOpacity onPress={this.newFuncEND}>
                  <Image style={styles.icon1} source={require('../assets/right.png')} /></TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  arrow:
  {
    alignSelf: 'center',
    width: 40,
    height: 45
  },
  box: {
    width: width * 0.24,
    marginRight: width * 0.25,
    backgroundColor: '#21AAF9',
    borderRadius: 10,
    alignSelf: 'center',
    height: 45
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  body:
  {
    backgroundColor: 'white'
  },
  buttons: {
    flexDirection: 'row',
    marginTop: width * 0.01,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  utext:
  {
    fontSize: 27,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  Adnote: {
    marginTop: width * 0.02,
    fontSize: 27,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  textBox:
  {
    marginTop: 20,
    paddingLeft: 4,
    alignSelf: 'center',
    width: width * 0.9,
    height: width * 0.62,
    backgroundColor: '#F3F4F4',
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'scroll',
  },
  inputbox:
  {
    marginTop: 8,
    alignSelf: 'center',
    width: width * 0.9,
    height: width * 0.25,
    overflow: 'scroll',
    backgroundColor: '#F3F4F4',
    borderWidth: 1,
    borderColor: 'lightgray',
    fontSize: 18,
    textAlignVertical: 'top'
  },
  Com_inputbox:
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
  send1: {
    marginTop: width * 0.02,
    fontSize: 25,
    marginLeft: width * 0.45,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  },
  icon1: {
    marginRight: width * 0.04,
  },
  noteText: {
    fontSize: 16,
    padding: 2,
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
    color: '#808080'
  },
  paymentBtn: {
    backgroundColor: '#3CB371',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: width * 0.02,
    justifyContent:'center' ,
    marginTop: 15 

  },
  pay_word: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif',
  }
});
export default NoteSummary;