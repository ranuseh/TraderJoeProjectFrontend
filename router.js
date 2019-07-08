import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

import Login from "./app/screens/login";
import Product from "./app/screens/product";
import Home from "./app/screens/home";
import Matches from "./app/screens/matches";
import Recommend from "./app/screens/recommend";
import Profile from "./app/screens/profile";
import EditBook from "./app/screens/editBook";


export const Tabs = createBottomTabNavigator({
  // Defines a button that on click will render the screen component
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: "Login",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-key" type="ionicon" size={28} color={tintColor} />
      )
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-map" type="ionicon" size={28} color={tintColor} />
      )
    }
  },
  Product: {
    screen: Product,
    navigationOptions: {
      tabBarLabel: "Play",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="open-book" type="entypo" size={28} color={tintColor} />
      )
    }
  },
  Matches: {
    screen: Matches,
    navigationOptions: {
      tabBarLabel: "Matches",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="ios-add-circle-outline"
          type="ionicon"
          size={28}
          color={tintColor}
        />
      )
    }
  },
  Recommend: {
    screen: Recommend,
    navigationOptions: {
      tabBarLabel: "To Try",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" type="entypo" size={28} color={tintColor} />
      )
    }
  },
});

export const ProductStack = createStackNavigator({
  Product: {
    screen: Product,
    navigationOptions: () => ({
      header: null
    })
  },
  EditBook: {
    screen: EditBook,
    navigationOptions: () => ({
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  },
  'Matches': {
    screen: Matches,
    navigationOptions: () => ({
      header: null,
      tabBarVisible: false,
      gesturesEnabled: false
    })
  }
});

export const createRootNavigator = () => {
  const stackNavigator = createStackNavigator(
    {
      Tabs: {
        screen: Tabs,
        navigationOptions: () => ({
          gesturesEnabled: false
        })
      },
      ProductStack: {
        screen: ProductStack,
        navigationOptions: () => ({
          gesturesEnabled: false
        })
      }
    },
    {
      headerMode: "none",
      mode: "modal"
    }
  );
  return createAppContainer(stackNavigator);
};
