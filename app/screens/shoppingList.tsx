import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import {
  StyleSheet,
  View,
  TouchableHighlight,
  ListRenderItemInfo,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct } from '../api/product.api';

interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
}

interface State {
  cart: Product[];
}

export default class ShoppingList extends Component<Props, State> {
  private constructor(props: Props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  public async componentDidMount() {
    console.log('state on mount', this.state.cart);

    try {
      const actualProduct: Promise<
        Product
      >[] = this.props.user.shoppingList.map(productid =>
        getProduct(productid),
      );

      const allProducts: Product[] = await Promise.all(actualProduct);

      this.setState({ cart: allProducts });

      console.log('state after set', this.state.cart);
    } catch (error) {
      console.log(error.message);
    }
  }

  private _renderItem = (listRenderItemInfo: ListRenderItemInfo<Product>) => (
    <TouchableOpacity>
      <Text style={styles.rowContainer}>
        <Text style={styles.rowText}>{listRenderItemInfo.item.name}</Text>
      </Text>
    </TouchableOpacity>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
    console.log('MY ITEMS', this.state.cart);

    return (
      <View>
        <FlatList
          data={this.state.cart}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 100,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#CCC',
    shadowOpacity: 1.0,
    shadowRadius: 1,
  },
  rowText: {
    flex: 4,
    flexDirection: 'column',
  },
});
