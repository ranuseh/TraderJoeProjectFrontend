import React, { Component } from 'react';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';
import { SwipeListView } from 'react-native-swipe-list-view';

import {
  StyleSheet,
  View,
  ListRenderItemInfo,
  Image,
  Text,
} from 'react-native';

import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct, Vote, UserList } from '../api/product.api';
import { CustomText } from '../components/CustomText';

interface NavigationProps {
  action: UserList;
}

interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, NavigationProps>;
  updateShoppingListCallback: (product: Product, action: Vote) => void;
}

interface State {
  cart: Product[];
}

export default class ManageListScreen extends Component<Props, State> {
  private constructor(props: Props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  public async loadList(action: UserList) {
    try {
      const actualProduct: Promise<Product>[] = this.props.user[action].map(
        productid => getProduct(productid),
      );

      const allProducts: Product[] = await Promise.all(actualProduct);

      this.setState({ cart: allProducts });
    } catch (error) {
      console.log(error.message);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    const { navigation } = this.props;
    const action = navigation.getParam('action', 'shoppingList');

    if (this.props.user.shoppingList !== prevProps.user.shoppingList) {
      this.loadList(action);
    }
  }

  private _renderItem = (listRenderItemInfo: ListRenderItemInfo<Product>) => (
    <View style={styles.row}>
      <View style={styles.picturerow}>
        <Image
          source={{ uri: listRenderItemInfo.item.imageUrl }}
          style={styles.pic}
        />
      </View>
      <View style={styles.textrow}>
        <View style={styles.inforow}>
          <CustomText style={styles.infotxt}>Name: </CustomText>
          <CustomText style={styles.infotxt}>Price: </CustomText>
          <CustomText style={styles.infotxt}>Category:</CustomText>
          <Text style={styles.infotxt}>
            <CustomText>
              In {listRenderItemInfo.item.shoppingListCount} users carts
            </CustomText>
          </Text>
        </View>
      </View>
      <View style={styles.picturerowarrow}>
        <Image
          source={{
            uri:
              'https://i38.photobucket.com/albums/e124/ranuseh/pngkey.com-bracket-png-4411331_zps4kzhgudr.png',
          }}
          style={styles.picarrow}
        />
      </View>
    </View>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
    const { navigation } = this.props;
    const action = navigation.getParam('action', 'shoppingList');

    console.log('IN CART', this.state.cart);
    if (this.state.cart.length === 0) {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.loadList(action)} />
          <CustomText style={styles.paragraph}>Nothing here</CustomText>
          <CustomText style={styles.paragraph}>
            Play to start adding items!
          </CustomText>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <CustomText style={styles.paragraph}>{action} list page </CustomText>
          <CustomText style={styles.paragraph}>Swipe for options </CustomText>

          <NavigationEvents onWillFocus={() => this.loadList(action)} />
          <SwipeListView
            data={this.state.cart}
            renderItem={this._renderItem}
            disableRightSwipe={true}
            renderHiddenItem={(rowData: ListRenderItemInfo<Product>) => (
              <View style={styles.swipecontainer}>
                <CustomText
                  style={styles.rowBackleft}
                  onPress={() =>
                    this.props.updateShoppingListCallback(
                      rowData.item,
                      'dislike',
                    )
                  }
                >
                  <CustomText>Dislike </CustomText>
                </CustomText>
                <CustomText
                  style={styles.rowBackright}
                  onPress={() =>
                    this.props.updateShoppingListCallback(rowData.item, 'like')
                  }
                >
                  <CustomText>Like </CustomText>
                </CustomText>
                <CustomText
                  style={styles.rowBackdelete}
                  onPress={() =>
                    this.props.updateShoppingListCallback(
                      rowData.item,
                      'delete',
                    )
                  }
                >
                  <CustomText>Delete </CustomText>
                </CustomText>
                <CustomText
                  style={styles.rowBacksave}
                  onPress={() =>
                    this.props.updateShoppingListCallback(
                      rowData.item,
                      'neverTried',
                    )
                  }
                >
                  <CustomText>Never Tried </CustomText>
                </CustomText>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-275}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 40,
    backgroundColor: 'white',
  },
  paragraph: {
    flexDirection: 'column',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
  },
  row: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderColor: '#DCDCDC',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  pic: {
    width: 80,
    height: 80,
  },
  picarrow: {
    width: 30,
    height: 30,
  },
  picturerow: {
    backgroundColor: 'white',
    padding: 20,
  },
  textrow: {
    backgroundColor: 'white',
  },
  picturerowarrow: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 40,
    alignItems: 'flex-end',
  },
  rowBackleft: {
    backgroundColor: '#ffa951',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 67,
    height: 120,
  },
  rowBackright: {
    backgroundColor: '#ff975e',
    textAlign: 'center',
    flexDirection: 'row',
    width: 67,
    height: 120,
  },
  rowBackdelete: {
    backgroundColor: '#f95c5c',
    textAlign: 'center',
    flexDirection: 'row',
    width: 67,
    height: 120,
  },
  rowBacksave: {
    backgroundColor: '#e54b4b',
    textAlign: 'center',
    flexDirection: 'row',
    width: 67,
    height: 120,
  },
  swipecontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  welcome: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  welcome1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    fontSize: 16,
    textAlign: 'center',
    color: '#D21242',
    padding: 10,
  },
  inforow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 40,
  },
  infotxt: {
    paddingBottom: 5,
  },
  emojipic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 12,
    height: 12,
    fontFamily: 'Chalkduster',
  },
});
