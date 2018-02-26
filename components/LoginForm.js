import React from 'react';
import SoapRequest from './SoapRequest';//'react-native-soap-request';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {DOMParser} from 'xmldom';
import {config} from '../config';
export default class LoginForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name:'',
        password:'',
        error:false,
        message:''
      }
    }
async  login() {
    console.log('try login '+this.state.name+': '+this.state.password);
    var soapWebserviceURL=config.apiUrl;
        const soapRequest = new SoapRequest({
          security: {
            username: config.apiUser,
            password: config.apiPassword,
          },
          targetNamespace: 'http://soap.acme.com/2.0/soap-access-services',
          commonTypes: 'http://soap.acme.com/2.0/soap-common-types',
          requestURL: soapWebserviceURL
        });
        const xmlRequest = soapRequest.createRequest({
          'soap:Login': {
            attributes: {
              'xmlns:soap': 'http://soap.acme.com/2.0/soap-access-services',
              'xmlns:cmn': 'http://soap.acme.com/2.0/soap-common-types'
            },
            'UserName': this.state.name,
            'Password': this.state.password
          }
        });

        const response = await soapRequest.sendRequest();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(soapRequest.xmlResponse);
        let res=JSON.parse(xmlDoc.getElementsByTagName("return")[0].childNodes[0].nodeValue);
        this.setState({
                error: res['ResultCode']==-1?true:false,
                message: res['ResultCode']==-1?res['ResultMessage']:xmlDoc.getElementsByTagName("return")[0].childNodes[0].nodeValue
              })
  }
  renderError() {
    if (this.state.error) {
      return (
          <Text style={{fontSize: 20,fontWeight: 'bold', textAlign: 'center', color: 'red'}}>Error {this.state.message}</Text>
      );
    }
    return null;
  }
  renderSuccess() {
    if (!this.state.error) {
      return (
          <Text style={{fontSize: 20,fontWeight: 'bold', textAlign: 'center', color: 'green'}}>{this.state.message}</Text>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
         <StatusBar
          barStyle='light-content'/>
          {this.renderError()}
          {this.renderSuccess()}
         <TextInput
          placeholder='user name'
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}
          returnKeyTyoe='next'
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={()=>this.passwordInput.focus()}
          style={styles.input}/>
         <TextInput
          placeholder='password'
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          returnKeyTyoe='go'
          secureTextEntry style={styles.input}
          ref={(input)=>this.passwordInput=input}/>
         <TouchableOpacity
          onPress={()=> this.login()}
          style={styles.buttonContainer}>
           <Text style={styles.buttonText}>
            Login</Text>
         </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor:'#b34700',
    paddingVertical:15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: 40,
    marginBottom: 20,
    color: '#000',
    paddingHorizontal: 20

  },
});
