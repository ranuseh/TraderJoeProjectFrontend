import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import ProductScreen from './app/screens/product';
import Home from './app/screens/home';
import Matches from './app/screens/matches';
import ShoppingList from './app/screens/shoppingList';
import Profile from './app/screens/profile';
import UserProduct from './app/screens/userProduct';

export const Tabs = createBottomTabNavigator({
  Home: {
    screen: props => {
      console.log('home');
      console.log(JSON.stringify(props));
      return <Home {...props.screenProps} navigation={props.navigation}></Home>;
    },
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-map" type="ionicon" size={28} color={tintColor} />
      ),
    },
  },
  Product: {
    screen: props => {
      console.log(JSON.stringify(props));
      return (
        <ProductScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></ProductScreen>
      );
    },
    navigationOptions: {
      tabBarLabel: 'Play',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="open-book" type="entypo" size={28} color={tintColor} />
      ),
    },
  },
  Matches: {
    screen: props => {
      console.log(JSON.stringify(props));
      return (
        <Matches {...props.screenProps} navigation={props.navigation}></Matches>
      );
    },
    navigationOptions: {
      tabBarLabel: 'Matches',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="ios-add-circle-outline"
          type="ionicon"
          size={28}
          color={tintColor}
        />
      ),
    },
  },
  'Shopping List': {
    screen: props => {
      console.log(JSON.stringify(props));
      return (
        <ShoppingList
          {...props.screenProps}
          navigation={props.navigation}
        ></ShoppingList>
      );
    },
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" type="entypo" size={28} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: props => {
      console.log(JSON.stringify(props));
      return (
        <Profile {...props.screenProps} navigation={props.navigation}></Profile>
      );
    },
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="cake" type="entypo" size={28} color={tintColor} />
      ),
    },
  },
});

export const ProductStack = createStackNavigator({
  Matches: {
    screen: props => {
      console.log(JSON.stringify(props));
      return (
        <Matches {...props.screenProps} navigation={props.navigation}></Matches>
      );
    },
    navigationOptions: () => ({
      header: null,
    }),
  },
  UserProduct: {
    screen: props => {
      console.log(JSON.stringify(props));
      return (
        <UserProduct
          {...props.screenProps}
          navigation={props.navigation}
        ></UserProduct>
      );
    },
    navigationOptions: () => ({
      header: null,
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
