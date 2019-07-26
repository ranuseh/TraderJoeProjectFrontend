import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Card } from 'react-native-elements';
import User from '../model/user.model';
import { CustomText } from '../components/CustomText';

interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
}

export default class HomeScreen extends Component<Props, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <CustomText style={styles.welcome}>
          WELCOME {this.props.user.name.toUpperCase()}!
          <CustomText>
            <Image
              source={{
                uri:
                  'https://i38.photobucket.com/albums/e124/ranuseh/Screen%20Shot%202019-07-22%20at%2010.17.30%20AM_zpsl9aqlxle.png',
              }}
              style={styles.emojipic}
            />
          </CustomText>
        </CustomText>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Product')}
        >
          <Card>
            <CustomText style={styles.paragraph}>PLAY TJINDER MATCH</CustomText>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Matches')}
        >
          <Card>
            <CustomText style={styles.paragraph}>
              SEE TJINDER MATCHES
            </CustomText>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Shopping List')}
        >
          <Card>
            <CustomText style={styles.paragraph}>SHOPPING LIST</CustomText>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Card>
            <CustomText style={styles.paragraph}>MY PROFILE </CustomText>
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
    padding: 20,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#D21242',
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  emojipic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 50,
    height: 50,
    backgroundColor: 'white',
  },
});
