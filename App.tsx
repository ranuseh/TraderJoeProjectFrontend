import React, { Component } from 'react';
import { createRootNavigator } from './router';
import Login from './app/screens/login';
import { AsyncStorage } from 'react-native';
import { getOrCreateUser } from './app/api/user';

interface State {
  token: string;
  user: User;
}

export interface LoginInfo {
  facebookId: string;
  token: string;
  email: string;
  name: string;
}

export default class App extends Component<{}, State> {
  public constructor(props) {
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
    }

    const user = await getOrCreateUser(
      loginInfo.facebookId,
      loginInfo.name,
      loginInfo.email,
    );

    this.setState({ user, token: loginInfo.token });
  };

  private onLogOut = () => {
    this.setState({
      token: null,
      user: null,
    });

    try {
      AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.log(error.message);
    }
  };

  public render() {
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
