import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import ProductModel from '../model/product.model';

import SwipeCards from 'react-native-swipe-cards';
import { Card } from '../components/Card';
import { NoMoreCards } from '../components/NoMoreCards';
import User from '../model/user.model';
import { Vote } from '../api/product.api';

export interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
  updateShoppingListCallback: (product: ProductModel, action: Vote) => void;
}

export interface State {
  loading: boolean;
  products: ProductModel[];
}

export default class ProductScreen extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
    };
  }

  public componentDidMount() {
    console.log('in products');
    fetch(
      'http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/products',
    )
      .then(response => response.json())
      .then((products: ProductModel[]) => {
        const userLikes = this.props.user.like;
        const dislikes = this.props.user.dislike;
        const shoppingList = this.props.user.shoppingList;
        const dontAdd = [...userLikes, ...dislikes, ...shoppingList];

        const uniqueProducts = products.filter(
          product => !dontAdd.includes(product.productId),
        );

        this.setState({
          loading: false,
          products: uniqueProducts,
        });
      })
      .catch(error => console.log(error));
  }

  private handleYup = (product: ProductModel) => {
    this.props.updateShoppingListCallback(product, 'like');
  };

  private handleNope = (product: ProductModel) => {
    this.props.updateShoppingListCallback(product, 'dislike');
  };

  private handleMaybe = (product: ProductModel) => {
    this.props.updateShoppingListCallback(product, 'neverTried');
  };

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
        cards={this.state.products}
        renderCard={(productData: ProductModel) => (
          <Card product={productData} />
        )}
        renderNoMoreCards={() => {
          return <NoMoreCards navigation={this.props.navigation} />;
        }}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    );
  }
}
