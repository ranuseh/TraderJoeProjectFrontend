import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import SwipeCards from 'react-native-swipe-cards';

interface Props {
  title: string;
  inventory: string;
  imageURL: string;
  navigation: NavigationScreenProp<{}, {}>;
}

interface State {
  loading: boolean; 
  cards: Card[]
}

class Card extends React.Component<Props, State, NoMoreCards> {
  public render() {
    return (
      <View style={styles.card}>
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


  public render() {
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

export default class Product extends React.Component<Props, State> {
  public constructor(props) {
    super(props);
    this.state = {
      loading: true,
      cards: [],
    };
  }

  public componentDidMount() {
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
      .catch(error => console.log(error));
  }

  private handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }
  private handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }
  private handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }

  public render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#ecf0f1',
  },
});
