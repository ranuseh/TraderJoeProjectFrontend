import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import {
  StyleSheet,
  View,
  ListRenderItemInfo,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';

import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct, deleteProductFromUser } from '../api/product.api';
import { updateUser } from '../api/user.api';

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

  public manageShoppingList = (product: Product, action: string) => {
    if (action === 'Like') {
      updateUser(this.props.user.facebookId, 'like', product.productId);
      this.props.navigation.navigate('Tabs');
    } else if (action === 'Dislike') {
      updateUser(this.props.user.facebookId, 'dislike', product.productId);
      this.props.navigation.navigate('Tabs');
    } else if (action === 'Delete') {
      deleteProductFromUser(
        this.props.user.facebookId,
        'shoppingList',
        product.productId,
      );
      this.props.navigation.navigate('Tabs');
    }
  };

  private _renderItem = (listRenderItemInfo: ListRenderItemInfo<Product>) => (
    <TouchableOpacity>
      <Text style={styles.rowContainer}>
        <Text style={styles.rowText}>
          {listRenderItemInfo.item.name}
          <Text
            style={styles.like}
            onPress={() =>
              this.manageShoppingList(listRenderItemInfo.item, 'Like')
            }
          >
            <Text>Like</Text>
          </Text>
          <Text
            style={styles.dislike}
            onPress={() =>
              this.manageShoppingList(listRenderItemInfo.item, 'Dislike')
            }
          >
            <Text>Dislike</Text>
          </Text>
          <Text
            style={styles.delete}
            onPress={() =>
              this.manageShoppingList(listRenderItemInfo.item, 'Delete')
            }
          >
            <Text>Delete</Text>
          </Text>
        </Text>
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
    fontSize: 20,
  },
  like: {
    flex: 4,
    flexDirection: 'column',
    fontSize: 20,
    color: 'green',
  },
  dislike: {
    flex: 4,
    flexDirection: 'column',
    fontSize: 20,
    color: 'blue',
  },
  delete: {
    flex: 4,
    flexDirection: 'column',
    fontSize: 20,
    color: 'red',
  },
});
