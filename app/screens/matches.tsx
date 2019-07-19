import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';

import User from '../model/user.model';
import { getRecommendedUsers } from '../api/user.api';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
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
        <Text
          key={user.name}
          style={styles.paragraph}
          onPress={() =>
            this.props.navigation.navigate('UserProduct', { user })
          }
        >
          <Text>{user.name}</Text>
          <Text>Score: {score} </Text>
        </Text>
      );
    });

    return (
      <View style={styles.container}>
        <TouchableHighlight>
          <Text>{items}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
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
});
