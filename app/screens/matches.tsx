import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

import User from '../model/user.model';
import { getRecommendedUsers } from '../api/user.api';

export interface Props {
  user: User;
}

interface State {
  allUsers: [User, number][];
}

export default class Matches extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      allUsers: [],
    };
  }

  private userItems = () => {
    console.log('You clicked');
  };

  public async componentDidMount() {
    try {
      const allAppUsers: [User, number][] = await getRecommendedUsers(
        this.props.user.facebookId,
      );

      this.setState({ allUsers: allAppUsers });
    } catch (error) {
      console.log(error.message);
    }
  }

  public render() {
    const items = this.state.allUsers.map((singleUserDate: [User, number]) => {
      const user = singleUserDate[0];
      const score = singleUserDate[1];

      return (
        <Text key={user.name} style={styles.paragraph}>
          <Text>{user.name} </Text>
          <Text>TJ Match: {score} </Text>
        </Text>
      );
    });

    return (
      <View style={styles.container}>
        <Card>{items}</Card>
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
  text: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
