import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.topContainer}>
         <Text style={styles.title}>login form</Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc00',
  },
  topContainer: {
    flexGrow: 1,
    backgroundColor: '#ffcc00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
  },
});
