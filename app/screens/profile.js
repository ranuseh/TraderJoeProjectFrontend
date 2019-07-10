import React, { Component } from 'react';
import {
  Alert,
  View,
  Button,
  StyleSheet,
  Text,
  AsyncStorage,
} from 'react-native';

export default class Profile extends Component {
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('userToken');

      this.getUserIdForLogOut(token);
    } catch (error) {
      console.log(error.message);
    }
  }

  getUserIdForLogOut = async token => {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`,
    );
    const json = await response.json();

    if (json.id) {
      this.logOut(token, json.id);
    }
  };

  logOut = async (token, jsonId) => {
    console.log('inside logout');
    console.log('state in logout:', jsonId);
    console.log('state in logout:', token);

    await fetch(
      `https://graph.facebook.com/${jsonId}/permissions?access_token=${token}`,
      {
        method: 'DELETE',
      },
    );

    Alert.alert('You have successfully logged out');

    this.props.onLogOutCallback({ userId: jsonId, token });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>TJinder</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.loginButton}
            title={'LogOut'}
            onPress={() => this.logOut()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#00b5ec',
  },
  loginText: {
    color: 'white',
  },
});
