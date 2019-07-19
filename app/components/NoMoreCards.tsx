import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

export interface Props {
  navigation: NavigationScreenProp<{}, {}>;
}

export class NoMoreCards extends Component<Props> {
  public render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
        <Text onPress={() => this.props.navigation.navigate('Matches')}>
          <Text style={styles.goToMatches}> Go to my matches</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
    margin: 20,
    border: 20,
    color: '#00000',
  },
  goToMatches: {
    color: '#B31100',
    fontSize: 22,
    margin: 20,
    border: 20,
  },
});
