import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationScreenProp,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import ProductScreen from './app/screens/product';
import Home from './app/screens/home';
import Matches from './app/screens/matches';
import ShoppingList from './app/screens/shoppingList';
import Profile from './app/screens/profile';
import UserProduct from './app/screens/userProduct';
import User from './app/model/user.model';

interface ScreenProps {
  onLogOutCallback: () => Promise<void>;
  updateShoppingListCallback: () => Promise<void>;
  user: User;
  token: string;
}
interface NavigationProps {
  user: User;
}
interface Props {
  screenProps: ScreenProps;
  navigation: NavigationScreenProp<{}, NavigationProps>;
}

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: (props: Props) => {
      return <Home {...props.screenProps} navigation={props.navigation}></Home>;
    },
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <Icon name="ios-home" type="ionicon" size={28
        } color="#1E52BD" />
      ),
    },
  },
  Product: {
    screen: (props: Props) => {
      return (
        <ProductScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></ProductScreen>
      );
    },
    navigationOptions: {
      tabBarLabel: 'Play',
      tabBarIcon: () => (
        <Icon name="sound" type="entypo" size={28} color="#1E52BD" />
      ),
    },
  },
  Matches: {
    screen: (props: Props) => {
      return (
        <Matches {...props.screenProps} navigation={props.navigation}></Matches>
      );
    },
    navigationOptions: {
      tabBarLabel: 'Matches',
      tabBarIcon: () => (
        <Icon name="heart" type="entypo" size={28} color="#1E52BD" />
      ),
    },
  },
  'Shopping List': {
    screen: (props: Props) => {
      return (
        <ShoppingList
          {...props.screenProps}
          navigation={props.navigation}
        ></ShoppingList>
      );
    },
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: () => (
        <Icon name="ios-basket" type="ionicon" size={28} color="#1E52BD" />
      ),
    },
  },
  Profile: {
    screen: (props: Props) => {
      return <Profile {...props.screenProps}></Profile>;
    },
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => (
        <Icon name="ios-person" type="ionicon" size={28} color="#1E52BD" />
      ),
    },
  },
});

export const ProductStack = createStackNavigator({
  Matches: {
    screen: (props: Props) => {
      return (
        <Matches {...props.screenProps} navigation={props.navigation}></Matches>
      );
    },
  },
  UserProduct: {
    screen: (props: Props) => {
      return (
        <UserProduct
          {...props.screenProps}
          navigation={props.navigation}
        ></UserProduct>
      );
    },
    navigationOptions: () => ({
      tabBarVisible: false,
      gesturesEnabled: false,
    }),
  },
});

export const createRootNavigator = () => {
  const stackNavigator = createStackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: () => ({
          gesturesEnabled: false,
        }),
      },
      ProductStack: {
        screen: ProductStack,
        navigationOptions: () => ({
          gesturesEnabled: false,
        }),
      },
    },
    {
      headerMode: 'none',
      mode: 'modal',
    },
  );

  return createAppContainer(stackNavigator);
};
