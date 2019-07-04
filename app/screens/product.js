import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import SwipeCards from "react-native-swipe-cards";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[styles.card, { backgroundColor: this.props.backgroundColor }]}
      >
        <Text>{this.props.id}</Text>
        <Text>{this.props.title}</Text>
        <Text>{this.props.author}</Text>
        <Image
          source={{ uri: this.props.thumbnail }}
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
        <Text> Go to my matches</Text>
      </View>
    );
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          id: 1,
          title: "Harry Potter and the Goblet of Fire",
          author: "J. K. Rowling",
          thumbnail: "https://covers.openlibrary.org/w/id/7984916-M.jpg",
          backgroundColor: "white"
        },
        {
          id: 2,
          title: "The Hobbit",
          author: "J. R. R. Tolkien",
          thumbnail: "https://covers.openlibrary.org/w/id/6979861-M.jpg",
          backgroundColor: "white"
        },
        {
          id: 3,
          title: "1984",
          author: "George Orwell",
          thumbnail: "https://covers.openlibrary.org/w/id/7222246-M.jpg",
          backgroundColor: "white"
        }
      ]
    };
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
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
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
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300
  },
  noMoreCardsText: {
    fontSize: 22
  },
  thumbnail: {
    flex: 1,
    height: 300,
    width: 300
  }
});
