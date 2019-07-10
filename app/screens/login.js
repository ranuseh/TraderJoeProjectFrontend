import React, { Component } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import * as Facebook from "expo-facebook";
import { AsyncStorage } from "react-native";

export default class Login extends Component {
  async logIn() {
    const result = await Facebook.logInWithReadPermissionsAsync(
      "457065005090623",
      {
        permissions: ["public_profile", "email"]
      }
    );

    const { type, token, expires, permissions, declinedPermissions } = result;

    this.getUserId(token)

  }

  getUserId = async (token) => {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    const json = await response.json();

    console.log("json id", json.id);
    console.log("token", token);

    
    if (json.id) {
      this.saveUserToken(token);
      this.props.onLoginCallback({ userId: json.id, token: token });
    } else {
      this.props.onLoginCallback({ userId: null, token: null });
    }

  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem("userToken");
      this.getUserId(token)

    } catch (error) {
      console.log(error.message);
    }
  }

  saveUserToken = async userToken => {
    try {
      await AsyncStorage.setItem("userToken", userToken);
    } catch (error) {
      console.log(error.message);
    }
  };

  // async logOut() {
  //   await fetch(
  //     `https://graph.facebook.com/${
  //       this.state.userId
  //     }/permissions?access_token=${this.state.token}`,
  //     {
  //       method: "DELETE"
  //     }
  //   );

  //   this.setState({ userId: null, token: null });
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>TJinder</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.loginButton}
            title={"Login"}
            onPress={() => this.logIn()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC",
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DCDCDC"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#00b5ec"
  },
  loginText: {
    color: "white"
  }
});
