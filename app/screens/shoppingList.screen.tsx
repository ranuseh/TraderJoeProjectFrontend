import React, { Component } from 'react';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';

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
import { getProduct, Vote } from '../api/product.api';
import { CustomText } from '../components/CustomText';

interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
  updateShoppingListCallback: (product: Product, action: Vote) => void;
}

interface State {
  cart: Product[];
}

export default class ShoppingListScreen extends Component<Props, State> {
  private constructor(props: Props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  public async loadShoppingList() {
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

  public componentDidUpdate(prevProps: Props) {
    if (this.props.user.shoppingList !== prevProps.user.shoppingList) {
      this.loadShoppingList();
    }
  }

  private _renderItem = (listRenderItemInfo: ListRenderItemInfo<Product>) => (
    <TouchableOpacity style={styles.container}>
      <View style={styles.mainRow}>
        <Image
          source={{ uri: listRenderItemInfo.item.imageUrl }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
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
    if (this.state.cart.length === 0) {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.loadShoppingList()} />
          <CustomText style={styles.paragraph}>
            You have no items in your Shopping List
          </CustomText>

          <CustomText style={styles.paragraph}>
            Play to start adding items!
          </CustomText>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.loadShoppingList()} />
          <FlatList
            data={this.state.cart}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00000',
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
