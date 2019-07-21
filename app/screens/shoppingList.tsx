import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import {
  StyleSheet,
  View,
  ListRenderItemInfo,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from 'react-native';

import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct, deleteProductFromUser, Vote } from '../api/product.api';

interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
  updateShoppingListCallback: (product: Product, action: Vote) => void;
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
    try {
      const actualProduct: Promise<
        Product
      >[] = this.props.user.shoppingList.map(productid =>
        getProduct(productid),
      );

      const allProducts: Product[] = await Promise.all(actualProduct);

      this.setState({ cart: allProducts });
    } catch (error) {
      console.log(error.message);
    }
  }

  private _renderItem = (listRenderItemInfo: ListRenderItemInfo<Product>) => (
    <TouchableOpacity style={styles.container}>
      <View style={styles.mainRow}>
        <Image
          source={{ uri: listRenderItemInfo.item.imageURL }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
        <Text>{listRenderItemInfo.item.name} </Text>
      </View>

      <View style={styles.ratingRow}>
        <Text
          style={styles.like}
          onPress={() =>
            this.props.updateShoppingListCallback(
              listRenderItemInfo.item,
              'like',
            )
          }
        >
          Like
        </Text>
        <Text
          style={styles.dislike}
          onPress={() =>
            this.props.updateShoppingListCallback(
              listRenderItemInfo.item,
              'dislike',
            )
          }
        >
          Dislike
        </Text>
        <Text
          style={styles.delete}
          onPress={() =>
            this.props.updateShoppingListCallback(
              listRenderItemInfo.item,
              'delete',
            )
          }
        >
          Delete
        </Text>
      </View>
    </TouchableOpacity>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
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
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  mainRow: {
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
  ratingRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 50,
    padding: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
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
  thumbnail: {
    flex: 1,
    height: 50,
    width: 50,
    padding: 0,
  },
});
