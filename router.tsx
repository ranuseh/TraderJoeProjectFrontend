import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  NavigationScreenProp,
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import ProductScreen from './app/screens/product.screen';
import HomeScreen from './app/screens/home.screen';
import UserMatchesScreen from './app/screens/userMatches.screen';
import ManageListScreen from './app/screens/manageList.screen';
import ProfileScreen from './app/screens/profile.screen';
import ProductMatchesScreen from './app/screens/productMatches.screen';
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

const ProductStack = createStackNavigator({
  UserMatches: {
    screen: (props: Props) => {
      return (
        <UserMatchesScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></UserMatchesScreen>
      );
    },
  },
  ProductMatches: {
    screen: (props: Props) => {
      return (
        <ProductMatchesScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></ProductMatchesScreen>
      );
    },
  },
});

const ProfileStack = createStackNavigator({
  UserProfile: {
    screen: (props: Props) => {
      return (
        <ProfileScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></ProfileScreen>
      );
    },
  },
  ManageList: {
    screen: (props: Props) => {
      return (
        <ManageListScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></ManageListScreen>
      );
    },
  },
});

const Tabs = createBottomTabNavigator({
  Home: {
    screen: (props: Props) => {
      return (
        <HomeScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></HomeScreen>
      );
    },
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <Icon name="ios-home" type="ionicon" size={28} color="#1E52BD" />
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
    screen: ProductStack,
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
        <ManageListScreen
          {...props.screenProps}
          navigation={props.navigation}
        ></ManageListScreen>
      );
    },
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: () => (
        <Icon name="shopping-cart" type="entypo" size={26} color="#1E52BD" />
      ),
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: () => (
        <Icon name="ios-person" type="ionicon" size={28} color="#1E52BD" />
      ),
    },
  },
});

export default createAppContainer(Tabs);
