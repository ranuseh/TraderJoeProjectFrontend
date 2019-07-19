import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
        <Text style={[styles.welcome]}>
          WELCOME {this.props.user.name.toUpperCase()}
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Product')}
        >
          <Card>
            <Text style={styles.paragraph}>PLAY TJINDER MATCH</Text>
          </Card>
        </TouchableOpacity>

        <Text> </Text>
        <Text> </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Matches')}
        >
          <Card>
            <Text style={styles.paragraph}>SEE TJINDER MATCHES</Text>
          </Card>
        </TouchableOpacity>

        <Text> </Text>
        <Text> </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Shopping List')}
        >
          <Card>
            <Text style={styles.paragraph}>SHOPPING LIST</Text>
          </Card>
        </TouchableOpacity>
        <Text> </Text>
        <Text> </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Card>
            <Text style={styles.paragraph}>MY PROFILE </Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fffff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00000',
    fontFamily: 'bebas_neueregular',
  },
  welcome: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B31100',
    fontFamily: 'bebas_neueregular',
  },
});
