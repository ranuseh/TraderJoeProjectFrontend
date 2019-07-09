import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createRootNavigator } from "./router";
import Login from "./app/screens/login";

interface State {
  token: string;
}

interface LoginInfo {
  userId: number;
  token: string;
}

export default class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      token: ""
    };
  }

  loadFrontPage = () => {};

  onLogIn = (loginInfo: LoginInfo) => {
    this.setState({ token: loginInfo.token });
  };

  render() {
    if (this.state.token) {
      const AppContainer = createRootNavigator();
      return <AppContainer />;
    } else {
      return <Login onLoginCallback={this.onLogIn} />;
    }
  }
}
