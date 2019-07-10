import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { Card } from 'react-native-elements';

export default class Matches extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          // onPress={() => this.props.navigation.navigate("Product")}
        >
          <Card>
            <Text style={styles.paragraph}>First Match</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          // onPress={() => this.props.navigation.navigate("Matches")}
        >
          <Card>
            <Text style={styles.paragraph}>Second Match</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          // onPress={() => this.props.navigation.navigate("Recommend")}
        >
          <Card>
            <Text style={styles.paragraph}>Third Match</Text>
          </Card>
        </TouchableHighlight>
        <Text> </Text>
        <Text> </Text>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          // onPress={() => this.props.navigation.navigate("My Profile")}
        >
          <Card>
            <Text style={styles.paragraph}>Fourth Match</Text>
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
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
