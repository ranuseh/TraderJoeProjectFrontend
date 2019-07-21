import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Card } from 'react-native-elements';
import User from '../model/user.model';
import { CustomText } from '../components/CustomText';

interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
}

export default class Home extends Component<Props, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <CustomText style={styles.welcome}>
          WELCOME {this.props.user.name.toUpperCase()}
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
    padding: 10,
    backgroundColor: '#fffff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00000',
  },
  welcome: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B31100',
  },
});
