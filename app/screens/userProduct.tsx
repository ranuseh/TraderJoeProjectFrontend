import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import User from '../model/user.model';

interface OwnProps {
  user: User;
}

interface NavigationProps {
  navigation: NavigationScreenProp<{}, OwnProps>;
}

export type Props = OwnProps & NavigationProps;

export default class UserProduct extends Component<Props, {}> {
  public render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user', null);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>EditBook #{JSON.stringify(user.name)}</Text>
        <Button
          title="Back To Matches"
          onPress={() => this.props.navigation.navigate('Matches')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
