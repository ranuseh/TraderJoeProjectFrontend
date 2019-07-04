import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import { Card } from "react-native-elements";

export default class Explore extends Component {
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("Play for Matches")}
        >
          <Card>
            <Text style={styles.paragraph}>PLAY TJINDER MATCH</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("See Matches")}
        >
          <Card>
            <Text style={styles.paragraph}>SEE TJINDER MATCHES</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("My Likes")}
        >
          <Card>
            <Text style={styles.paragraph}>MY LIKES </Text>
          </Card>
        </TouchableHighlight>
        <Text> </Text>
        <Text> </Text>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.onClickListener("My Recommendations")}
        >
          <Card>
            <Text style={styles.paragraph}>MY RECOMMENDATIONS</Text>
          </Card>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 30,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e"
  }
});
