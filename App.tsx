import React, { Component } from 'react';
import { createRootNavigator } from './router';
import Login from './app/screens/login';

import { AsyncStorage } from 'react-native';

interface State {
  token: string;
  userId: string;
  email: string;
  name: string;
}

export interface LoginInfo {
  userId: string;
  token: string;
  email: string;
  name: string;
}

export default class App extends Component<{}, State> {
  public constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null,
      email: null,
      name: null,
    };
  }
  private onLogIn = (loginInfo: LoginInfo) => {
    console.log('on login:', loginInfo.userId);

    this.setState({
      token: loginInfo.token,
      userId: loginInfo.userId,
      email: loginInfo.email,
      name: loginInfo.name,
    });

    if (loginInfo.token != null) {
      try {
        AsyncStorage.setItem('userToken', loginInfo.token);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  private onLogOut = () => {
    this.setState({
      token: null,
      userId: null,
      email: null,
      name: null,
    });

    try {
      AsyncStorage.removeItem('userToken');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  public render() {
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
            email: this.state.email,
            name: this.state.name,
          }}
        />
      );
    }
  }
}
