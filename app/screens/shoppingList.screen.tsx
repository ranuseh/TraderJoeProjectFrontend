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
    <TouchableOpacity>
      <View style={styles.row}>
        <Image
          source={{ uri: listRenderItemInfo.item.imageUrl }}
          style={styles.pic}
        />
        <View style={styles.nameContainer}>
          <Text
            onPress={() =>
              this.props.updateShoppingListCallback(
                listRenderItemInfo.item,
                'like',
              )
            }
          >
            <Image
              source={{
                uri:
                  'https://i38.photobucket.com/albums/e124/ranuseh/heart_zpsmhbnee4n.png',
              }}
              style={styles.emojipic}
            />
          </Text>

          <Text
            style={styles.nameTxt}
            onPress={() =>
              this.props.updateShoppingListCallback(
                listRenderItemInfo.item,
                'delete',
              )
            }
          >
            <Image
              source={{
                uri:
                  'https://i38.photobucket.com/albums/e124/ranuseh/cancel_zpsjmgn1gym.png',
              }}
              style={styles.emojipic}
            />
          </Text>

          <Text
            onPress={() =>
              this.props.updateShoppingListCallback(
                listRenderItemInfo.item,
                'dislike',
              )
            }
          >
            <Image
              source={{
                uri:
                  'https://i38.photobucket.com/albums/e124/ranuseh/neutral_zpsun8ttyzo.png',
              }}
              style={styles.emojipic}
            />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
    console.log('IN CART', this.state.cart);
    if (this.state.cart.length === 0) {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.loadShoppingList()} />
          <CustomText style={styles.paragraph}>Nothing here</CustomText>

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
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 30,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  emojipic: {
    width: 30,
    height: 30,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'pink',
    // width: 300,
    // height: 20,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 16,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 20,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
});
