import React, { Component } from 'react';
import { Alert, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import User from '../model/user.model';
import { CustomText } from '../components/CustomText';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  onLogOutCallback: () => void;
  user: User;
  token: string;
  navigation: NavigationScreenProp<{}, {}>;
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
      <View style={styles.container}>
        <View style={styles.header}></View>
        <CustomText style={styles.name}>{this.props.user.name}</CustomText>

        <Image
          style={styles.avatar}
          source={{
            uri: this.props.user.image,
          }}
        />
        <View>
          <View style={styles.bodyContent}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                this.props.navigation.navigate('ManageList', { action: 'like' })
              }
            >
              <CustomText>LIKES</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                this.props.navigation.navigate('ManageList', {
                  action: 'dislike',
                })
              }
            >
              <CustomText>DISLIKES</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                this.props.navigation.navigate('ManageList', {
                  action: 'neverTried',
                })
              }
            >
              <CustomText>NEVERTRIED</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutbuttonContainer}
              onPress={() => this.logOut()}
            >
              <CustomText>LOG OUT</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#D21242',
    height: 200,
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    padding: 10,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#DCDCDC',
    borderColor: 'black',
  },
  logoutbuttonContainer: {
    marginTop: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#808080',
  },
});
