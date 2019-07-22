import React, { Component } from 'react';
import {
  View,
  Button,
  StyleSheet,
  AsyncStorage,
  Image,
  Text,
} from 'react-native';
import * as Facebook from 'expo-facebook';
import { LoginInfo } from '../../App';
import { CustomText } from '../components/CustomText';

interface Props {
  onLoginCallback: (loginInfo: LoginInfo) => void;
}

export default class LoginScreen extends Component<Props> {
  public async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('userToken');

      console.log('token', token);
      this.getUserId(token);
    } catch (error) {
      console.log(error.message);
    }
  }

  private async logIn() {
    const result = await Facebook.logInWithReadPermissionsAsync(
      '457065005090623',
      {
        permissions: ['public_profile', 'email'],
      },
    );

    const { token } = result;

    this.getUserId(token);
  }

  private getUserId = async (token: string) => {
    if (token == null) {
      this.props.onLoginCallback({
        facebookId: null,
        token: null,
        email: null,
        name: null,
        image: null,
      });
    } else {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`,
      );
      const json = await response.json();

      if (json.id) {
        this.props.onLoginCallback({
          facebookId: json.id,
          token,
          email: json.email,
          name: json.name,
          image: json.picture.data.url,
        });
      } else {
        this.props.onLoginCallback({
          facebookId: null,
          token: null,
          email: null,
          name: null,
          image: null,
        });
      }
    }
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../config/images/logo.png')} />
        </View>
        <Text style={styles.container} onPress={() => this.logIn()}>
          <CustomText>Login</CustomText>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    width: 250,
    borderRadius: 80,
    fontSize: 18,
  },
});
