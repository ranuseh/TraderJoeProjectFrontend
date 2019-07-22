import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Image, Button } from 'react-native';
import User from '../model/user.model';

interface Props {
  onLogOutCallback: () => void;
  user: User;
  token: string;
}

export default class ProfileScreen extends Component<Props, {}> {
  private logOut = () => {
    fetch(
      `https://graph.facebook.com/${this.props.user.facebookId}/permissions?access_token=${this.props.token}`,
      {
        method: 'DELETE',
      },
    );

    Alert.alert('You have successfully logged out');

    this.props.onLogOutCallback();
  };

  public render() {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image
              style={styles.avatar}
              source={{
                uri: this.props.user.image,
              }}
            />
            <Text style={styles.name}>{this.props.user.name}</Text>
          </View>
        </View>
        <Button title={'LogOut'} onPress={() => this.logOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#778899',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600',
  },
});
