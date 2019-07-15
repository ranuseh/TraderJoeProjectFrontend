import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import ProductModel from '../model/product.model';
import { updateUser } from '../api/user.api';

import SwipeCards from 'react-native-swipe-cards';
import { Card } from '../components/Card';
import { NoMoreCards } from '../components/NoMoreCards';
import User from '../model/user.model';

export interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
}

export interface State {
  loading: boolean;
  products: ProductModel[];
}

export default class Product extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
    };
  }

  public componentDidMount() {
    fetch(
      'http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/products',
    )
      .then(response => response.json())
      .then(products => {
        const userLikes = this.props.user.like;
        const dislikes = this.props.user.dislike;
        const dontAdd = userLikes.concat(dislikes);

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
    updateUser(this.props.user.facebookId, 'like', product.productId);
  };

  private handleNope = (product: ProductModel) => {
    updateUser(this.props.user.facebookId, 'dislike', product.productId);
  };
  private handleMaybe = (product: ProductModel) => {
    updateUser(this.props.user.facebookId, 'neverTried', product.productId);
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
