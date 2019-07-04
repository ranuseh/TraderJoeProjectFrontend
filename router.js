import React, { Component } from "react";
import { Dimensions, Platform } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";

import IntroPage from "./app/screens/introPage";
import Product from "./app/screens/product";
import Explore from "./app/screens/explore";
import AddBook from "./app/screens/addBook";
import Lists from "./app/screens/lists";
import Profile from "./app/screens/profile";
import EditBook from "./app/screens/editBook";


export const Tabs = createBottomTabNavigator({
  IntroPage: {
    screen: IntroPage,
    navigationOptions: {
      tabBarLabel: "Login",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-key" type="ionicon" size={28} color={tintColor} />
      )
    }
  },
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: "Explore",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-map" type="ionicon" size={28} color={tintColor} />
      )
    }
  },
  Product: {
    screen: Product,
    navigationOptions: {
      tabBarLabel: "Product",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="open-book" type="entypo" size={28} color={tintColor} />
      )
    }
  },
  "Add Book": {
    screen: AddBook,
    navigationOptions: {
      tabBarLabel: "Add Book",
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
  Lists: {
    screen: Lists,
    navigationOptions: {
      tabBarLabel: "Lists",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" type="entypo" size={28} color={tintColor} />
      )
    }
  },
  "My Profile": {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" type="ionicon" size={28} color={tintColor} />
      )
    }
  }
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
