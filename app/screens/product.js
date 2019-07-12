import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[styles.card, { backgroundColor: this.props.backgroundColor }]}
      >
        <Text>{this.props.title}</Text>
        <Text>{this.props.inventory}</Text>
        <Image
          source={{ uri: this.props.imageURL }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </View>
    );
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
        <Text onPress={() => this.props.navigation.navigate('Matches')}>
          {' '}
          <Text> Go to my matches</Text>
        </Text>
      </View>
    );
  }
}

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cards: [],
    };
  }

  componentDidMount() {
    fetch(
      'http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/products',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loading: false,
          cards: responseJson,
        });
        console.log({ responseJson });
      })
      .catch(error => console.log(error)); //to catch the errors if any
  }

  handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }
  handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }
  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => (
          <NoMoreCards navigation={this.props.navigation} />
        )}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  thumbnail: {
    flex: 1,
    height: 300,
    width: 300,
  },
});
