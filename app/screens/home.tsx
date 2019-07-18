import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Card } from 'react-native-elements';
import User from '../model/user.model';

interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
}

export default class Home extends Component<Props, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.welcome]}> Welcome {this.props.user.name}</Text>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Product')}
        >
          <Card>
            <Text style={styles.paragraph}>PLAY TJINDER MATCH</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Matches')}
        >
          <Card>
            <Text style={styles.paragraph}>SEE TJINDER MATCHES</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Recommend')}
        >
          <Card>
            <Text style={styles.paragraph}>SHOPPING LIST</Text>
          </Card>
        </TouchableHighlight>
        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Card>
            <Text style={styles.paragraph}>MY PROFILE </Text>
          </Card>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  welcome: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
