import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

import User from '../model/user.model';
import { allUsers } from '../api/user.api';

export interface Props {
  user: User;
}

interface State {
  allUsers: User[];
}

export default class Matches extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      allUsers: [],
    };
  }

  public async componentDidMount() {
    try {
      const allAppUsers: User[] = await allUsers();

      this.setState({ allUsers: allAppUsers });
    } catch (error) {
      console.log(error.message);
    }
  }

  public render() {
    const items = this.state.allUsers.map((item, key) => (
      <Text style={styles.text} key={item.name}>
        Name: {item.name}
        Email: {item.email}
      </Text>
    ));

    console.log('ITEMS', items);
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}></Text>
        <TouchableHighlight>
          <Card>{items}</Card>
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
  text: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
