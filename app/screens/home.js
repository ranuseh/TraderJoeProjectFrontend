import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { Card } from 'react-native-elements';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      facebookId: '',
      likes: [],
      dislikes: [],
      neverTried: [],
      email: '',
      name: '',
      recommended: [],
      userMatch: [],
    };
  }

  componentDidMount() {
    return fetch(
      'http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/users/5d266c934c2ee5399d233911',
    )
      .then(response => response.json())

      .then(responseJson => {
        this.setState({
          isLoading: false,
          facebookId: responseJson[0]['facebookId'],
          likes: responseJson[0]['likes'],
          dislikes: responseJson[0]['dislikes'],
          neverTried: responseJson[0]['neverTried'],
          email: responseJson[0]['email'],
          name: responseJson[0]['name'],
          recommended: responseJson[0]['recommended'],
          userMatch: responseJson[0]['userMatch'],
        });

        console.log('in component did mount', responseJson[0]['email']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.welcome]}> Welcome {this.state.name}</Text>
        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('Product')}
        >
          <Card>
            <Text style={styles.paragraph}>PLAY TJINDER MATCH</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('Matches')}
        >
          <Card>
            <Text style={styles.paragraph}>SEE TJINDER MATCHES</Text>
          </Card>
        </TouchableHighlight>

        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('Recommend')}
        >
          <Card>
            <Text style={styles.paragraph}>MY LIKES </Text>
          </Card>
        </TouchableHighlight>
        <Text> </Text>
        <Text> </Text>

        <TouchableHighlight
          style={[styles.buttonContainer, styles.loginButton]}
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
