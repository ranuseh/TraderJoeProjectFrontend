import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { CustomText } from './CustomText';

export interface Props {
  navigation: NavigationScreenProp<{}, {}>;
}

export class NoMoreCards extends Component<Props> {
  public render() {
    return (
      <View>
        <CustomText style={styles.noMoreCardsText}>No more cards</CustomText>
        <CustomText
          onPress={() => this.props.navigation.navigate('UserMatches')}
        >
          <Text style={styles.goToMatches}> Go to my matches</Text>
        </CustomText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
    border: 20,
    color: '#00000',
  },
  goToMatches: {
    color: '#B31100',
    textAlign: 'center',
    fontSize: 18,
    margin: 20,
    border: 20,
  },
});
