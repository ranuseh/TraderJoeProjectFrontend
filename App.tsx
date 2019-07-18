import React, { Component } from 'react';
import { createRootNavigator } from './router';
import Login from './app/screens/login';
import { AsyncStorage } from 'react-native';
import { getOrCreateUser } from './app/api/user.api';
import User from './app/model/user.model';
import ProductModel from './app/model/product.model';

interface State {
  token: string;
  user: User;
}

export interface LoginInfo {
  facebookId: string;
  token: string;
  email: string;
  name: string;
  image: string;
}

export default class App extends Component<{}, State> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      token: null,
      user: null,
    };
  }
  private onLogIn = async (loginInfo: LoginInfo) => {
    console.log('on login:', loginInfo.facebookId);

    if (loginInfo.token != null) {
      try {
        AsyncStorage.setItem('userToken', loginInfo.token);
      } catch (error) {
        console.log(error.message);
      }
      const user = await getOrCreateUser(
        loginInfo.facebookId,
        loginInfo.email,
        loginInfo.name,
        loginInfo.image,
      );

      this.setState({ user, token: loginInfo.token });
    }
  };

  private onLogOut = async () => {
    console.log('on logout:');

    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.log(error.message);
    }

    this.setState({
      token: null,
      user: null,
    });
  };

  public render() {
    console.log('user in render', this.state.user);
    if (this.state.user == null) {
      return <Login onLoginCallback={this.onLogIn} />;
    } else {
      const AppContainer = createRootNavigator();

      return (
        <AppContainer
          screenProps={{
            onLogOutCallback: this.onLogOut,
            user: this.state.user,
          }}
        />
      );
    }
  }
}
