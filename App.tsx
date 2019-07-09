import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createRootNavigator } from "./router";
import Login from "./app/screens/login";
import { AsyncStorage } from "react-native";

interface State {
  token: string;
  id: string;
}

interface LoginInfo {
  userId: number;
  token: string;
  id: string;
}

export default class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      id: ""
    };
  }

  onLogIn = (loginInfo: LoginInfo) => {
    this.setState({
      token: loginInfo.token,
      id: loginInfo.id
    });

    console.log("AppState")
    console.log(this.state.token)
  };

  // componentDidMount() {
  //   const getUserId = async () => {
  //     let userId = "";
  //     try {
  //       userId = (await AsyncStorage.getItem("userId")) || "none";
  //     } catch (error) {
  //       // Error retrieving data
  //       console.log(error.message);
  //     }
  //     return userId;
  //   };
  // }

  render() {
    if (this.state.token) {
      const AppContainer = createRootNavigator();
      return <AppContainer />;
    } else {
      return <Login onLoginCallback={this.onLogIn} />;
    }
  }
}
