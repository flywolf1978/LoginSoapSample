import React from 'react';
import SoapRequest from './SoapRequest';//'react-native-soap-request';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar} from 'react-native';
export default class LoginForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name:'',
        password:''
      }
    }
  login() {
    console.log('try login '+this.state.name+': '+this.state.password);

    var soapWebserviceURL='http://isapi.mekashron.com/icu-tech/ICUTech.dll';
        const soapRequest = new SoapRequest({
          security: {
            username: this.state.name,
            password: this.state.password
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
            'soap:UserName': {
              'cmn:internalId': {
                'cmn:UserName': this.state.name
              }
            },
            'soap:Password': {
              'cmn:internalId': {
                'cmn:Password': this.state.password
              }
            }
          }
        });

        const response =  soapRequest.sendRequest();
  }


  render() {
    return (
      <View style={styles.container}>
         <StatusBar
          barStyle='light-content'/>
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
