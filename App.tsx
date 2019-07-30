import React, { Component } from 'react';
import AppContainer from './router';
import LoginScreen from './app/screens/login.screen';
import { AsyncStorage } from 'react-native';
import { getOrCreateUser, updateUser } from './app/api/user.api';
import User from './app/model/user.model';
import ProductModel from './app/model/product.model';
import { NavigationState } from 'react-navigation';
import { Vote, deleteProductFromUser } from './app/api/product.api';

interface State {
  token: string;
  user: User;
}

export interface LoginInfo {
  facebookId: string;
  token: string;
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
    if (loginInfo.token != null) {
      try {
        AsyncStorage.setItem('userToken', loginInfo.token);
      } catch (error) {
        console.log(error.message);
      }
      const user = await getOrCreateUser(
        loginInfo.facebookId,
        loginInfo.name,
        loginInfo.image,
      );

      this.setState({ user, token: loginInfo.token });
    }
  };

  private onLogOut = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem(this.navigationScreenKey),
      ]);
    } catch (error) {
      console.log(error.message);
    }

    this.setState({
      token: null,
      user: null,
    });
  };

  private updateShoppingList = async (
    product: ProductModel,
    action: Vote | 'delete',
  ) => {
    const returnedUserAfterDelete: User = await deleteProductFromUser(
      this.state.user.facebookId,
      product.productId,
    );

    if (action === 'delete') {
      this.setState({ user: returnedUserAfterDelete });
    } else {
      const returnUserAfterUpdate = await updateUser(
        this.state.user.facebookId,
        action,
        product.productId,
      );

      this.setState({ user: returnUserAfterUpdate });
    }
  };

  private navigationScreenKey = 'navigationScreen';

  private persistNavigationState = async (state: NavigationState) => {
    try {
      await AsyncStorage.setItem(
        this.navigationScreenKey,
        JSON.stringify(state),
      );
    } catch (err) {
      console.log(err);
    }
  };

  private loadNavigationState = async () => {
    const jsonString = await AsyncStorage.getItem(this.navigationScreenKey);

    return JSON.parse(jsonString);
  };

  public render() {
    if (this.state.user == null) {
      return <LoginScreen onLoginCallback={this.onLogIn} />;
    } else {
      return (
        <AppContainer
          persistNavigationState={this.persistNavigationState}
          loadNavigationState={this.loadNavigationState}
          screenProps={{
            token: this.state.token,
            onLogOutCallback: this.onLogOut,
            updateShoppingListCallback: this.updateShoppingList,
            user: this.state.user,
          }}
        />
      );
    }
  }
}
