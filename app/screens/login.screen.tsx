import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Image, Text } from 'react-native';
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

      this.getUserId(token);
    } catch (error) {
      console.log(error.message);
    }
  }

  private async logIn() {
    const result = await Facebook.logInWithReadPermissionsAsync(
      '457065005090623',
      {
        permissions: ['public_profile'],
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
        name: null,
        image: null,
      });
    } else {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,picture&access_token=${token}`,
      );
      const json = await response.json();

      if (json.id) {
        this.props.onLoginCallback({
          facebookId: json.id,
          token,
          name: json.name,
          image: json.picture.data.url,
        });
      } else {
        this.props.onLoginCallback({
          facebookId: null,
          token: null,
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
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/Screen%20Shot%202019-07-22%20at%2010.17.30%20AM_zpsl9aqlxle.png',
            }}
          />
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/Screen%20Shot%202019-07-22%20at%2010.23.27%20AM_zpsezaqxo5x.png',
            }}
          />
        </View>
        <View style={styles.body}>
          <CustomText style={styles.bodyContent}>Make Connections</CustomText>
          <CustomText style={styles.bodyContent}>
            Discover New Products
          </CustomText>
          <CustomText style={styles.bodyContent}>Buy, Rate, Repeat</CustomText>
        </View>
        <Text style={styles.buttonContainer} onPress={() => this.logIn()}>
          <CustomText>Login</CustomText>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  bodyContent: {
    fontSize: 18,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    textAlign: 'center',
    paddingTop: 15,
  },
  header: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 60,
    backgroundColor: '#fffff',
    fontSize: 18,
  },
});
