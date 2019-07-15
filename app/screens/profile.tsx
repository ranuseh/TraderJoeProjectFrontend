import React, { Component } from 'react';
import { Alert, View, Image, Button, StyleSheet, Text } from 'react-native';
import User from '../model/user.model';

interface Props {
  onLogOutCallback: () => void;
  userId: string;
  user: User;
  token: string;
}

export default class Profile extends Component<Props, {}> {
  private logOut = () => {
    fetch(
      `https://graph.facebook.com/${this.props.userId}/permissions?access_token=${this.props.token}`,
      {
        method: 'DELETE',
      },
    );

    Alert.alert('You have successfully logged out');

    this.props.onLogOutCallback();
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{this.props.user.name} Profile Page</Text>
        </View>
        <Image
          source={{ uri: this.props.user.image }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <View style={styles.buttonContainer}>
          <Button title={'LogOut'} onPress={() => this.logOut()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  thumbnail: {
    flex: 1,
    height: 300,
    width: 300,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
});
