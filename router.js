import React, { Component } from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import Product from './app/screens/product';
import Home from './app/screens/home';
import Matches from './app/screens/matches';
import Recommend from './app/screens/recommend';
import Profile from './app/screens/profile';

export const Tabs = createBottomTabNavigator({
  // Defines a button that on click will render the screen component
  Home: {
    screen: props => {
      console.log('home')
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
      return <Product {...props.screenProps}></Product>;
    },
    navigationOptions: {
      tabBarLabel: 'Play',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="open-book" type="entypo" size={28} color={tintColor} />
      ),
    },
  },
  Matches: {
    screen: Matches,
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
  Recommend: {
    screen: Recommend,
    navigationOptions: {
      tabBarLabel: 'To Try',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" type="entypo" size={28} color={tintColor} />
      ),
    },
  },
  Profile: {
    screen: props => {
      console.log(JSON.stringify(props));
      return <Profile {...props.screenProps}></Profile>;
    },
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="cake" type="entypo" size={28} color={tintColor} />
      ),
    },
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
    },
    {
      headerMode: 'none',
      mode: 'modal',
    },
  );

  return createAppContainer(stackNavigator);
};
