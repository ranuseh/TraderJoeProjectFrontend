import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createRootNavigator } from "./router";
import Login from "./app/screens/login";
import Profile from "./app/screens/profile";

import { AsyncStorage } from "react-native";

interface State {
  token: string;
  userId: string;
}

interface LoginInfo {
  userId: string;
  token: string;
}

interface LogOutInfo {
  userId: string;
  token: string;
}

export default class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      userId: null
    };
  }
  onLogIn = (loginInfo: LoginInfo) => {
    console.log("on login:", loginInfo.userId);

    this.setState({
      token: loginInfo.token,
      userId: loginInfo.userId
    });
  };

  onLogOut = (logOutInfo: LogOutInfo) => {
    console.log("on logOut:", logOutInfo.userId);

    this.setState({
      token: "logged out",
      userId: "logged out"
    });
  };

  render() {
    console.log("in render:", this.state.userId);

    if (this.state.userId == null) {
      console.log("in if:", this.state.userId);

      return <Login onLoginCallback={this.onLogIn} />;

    } else if (this.state.userId === "logged out") {
      console.log("in else if:", this.state.userId)
      
      return <Profile onLogOutCallback={this.onLogOut} />;

    } else {
      console.log("in else:", this.state.userId);

      const AppContainer = createRootNavigator();

      return <AppContainer />;
    }
  }
}
