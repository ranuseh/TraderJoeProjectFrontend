import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import { Card } from 'react-native-elements';

interface State {
  facebookId: string;
  likes: Product[];
  dislikes: Product[];
  neverTried: Product[];
  email: string;
  name: string;
  recommended: Product[];
  userMatch: Product[];
}

interface Props {
  userId: string;
  email: string;
  name: string;
}

export default class Home extends Component<Props, State> {
  public constructor(props) {
    super(props);

    this.state = {
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

  public componentDidMount() {
    return fetch(
      `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/users/${this.props.userId}`,
    )
      .then(response => response.json())
      .then(user => {
        if (user == null) {
          return this.addNewUser();
        }

        return user;
      })
      .then(user => {
        this.setState({
          isLoading: false,
          ...user,
        });

        console.log('in component did mount', user.email);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private addNewUser = async () => {
    const user = {
      email: this.props.email,
      facebookId: this.props.userId,
      name: this.props.name,
    };

    try {
      const response = await fetch(
        'http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/users/add',
        {
          method: 'POST',
          headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );

      if (response.status >= 200 && response.status < 300) {
        return user;
      }
    } catch (errors) {
      console.log(errors);
    }
    return null;
  };

  public render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.welcome]}> Welcome {this.props.name}</Text>
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
            <Text style={styles.paragraph}>MY LIKES </Text>
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
