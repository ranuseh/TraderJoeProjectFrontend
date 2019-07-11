import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createRootNavigator } from './router';
import Login from './app/screens/login';
import Profile from './app/screens/profile';

import { AsyncStorage } from 'react-native';

interface State {
  token: string;
  userId: string;
}

interface LoginInfo {
  userId: string;
  token: string;
}

interface LogOutInfo {
  userId: string;
  token: string;
}

export default class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
    };
  }
  onLogIn = (loginInfo: LoginInfo) => {
    console.log('on login:', loginInfo.userId);

    this.setState({
      token: loginInfo.token,
      userId: loginInfo.userId,
    });

    if (loginInfo.token != null) {
      try {
        AsyncStorage.setItem('userToken', loginInfo.token);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  onLogOut = () => {
    console.log('inside log out in app');

    this.setState({
      token: null,
      userId: null,
    });

    try {
      AsyncStorage.removeItem('userToken');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  render() {
    console.log('in render:', this.state.userId == null);

    if (this.state.userId == null) {
      console.log('in render if:', this.state.userId);
      return <Login onLoginCallback={this.onLogIn} />;
    } else {
      console.log('in render else:', this.state.userId);
      const AppContainer = createRootNavigator();

      return (
        <AppContainer
          screenProps={{
            onLogOutCallback: this.onLogOut,
            token: this.state.token,
            userId: this.state.userId,
          }}
        />
      );
    }
  }
}
