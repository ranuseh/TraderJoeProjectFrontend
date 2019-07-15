import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import ProductModel from '../model/product.model';

import SwipeCards from 'react-native-swipe-cards';
import { Card } from '../components/Card';
import { NoMoreCards } from '../components/NoMoreCards';
import { updateUser } from '../api/user.api';
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
        console.log('product array', products);
        console.log('user likes', this.props.user.like);
        console.log('user dislikes', this.props.user.dislike);

        const userLikes = this.props.user.like;
        const dislikes = this.props.user.dislike;

        const dontAdd = userLikes.concat(dislikes);

        const productId = products.map(product => {
          return product.productId;
        });

        console.log('PRODUCT ID', productId);

        const uniqueProducts = productId.filter(
          product => !dontAdd.includes(product),
        );

        console.log('uniqeProducts', uniqueProducts);

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
