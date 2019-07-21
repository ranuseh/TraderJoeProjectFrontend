import React, { Component } from 'react';
import { createRootNavigator } from './router';
import Login from './app/screens/login';
import { AsyncStorage, Alert } from 'react-native';
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
    const previousState = this.state.user;

    await deleteProductFromUser(
      this.state.user.facebookId,
      'shoppingList',
      product.productId,
    );

    if (action === 'delete') {
      const newShoppingList = this.state.user.shoppingList.filter(
        pid => pid !== product.productId,
      );

      const newUser: User = {
        ...previousState,
        shoppingList: [...newShoppingList],
      };

      this.setState({ user: newUser });
    } else {
      await updateUser(this.state.user.facebookId, action, product.productId);

      const newShoppingList = this.state.user.shoppingList.filter(
        pid => pid !== product.productId,
      );

      const newUser: User = {
        ...previousState,
        shoppingList: [...newShoppingList],
        [action]: [...previousState[action], product.productId],
      };

      this.setState({ user: newUser });
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
      // handle the error according to your needs
    }
  };

  private loadNavigationState = async () => {
    const jsonString = await AsyncStorage.getItem(this.navigationScreenKey);

    return JSON.parse(jsonString);
  };

  public render() {
    console.log('user in render', this.state.user);
    if (this.state.user == null) {
      return <Login onLoginCallback={this.onLogIn} />;
    } else {
      const AppContainer = createRootNavigator();

      return (
        <AppContainer
          persistNavigationState={this.persistNavigationState}
          loadNavigationState={this.loadNavigationState}
          screenProps={{
            onLogOutCallback: this.onLogOut,
            updateShoppingListCallback: this.updateShoppingList,
            user: this.state.user,
          }}
        />
      );
    }
  }
}
