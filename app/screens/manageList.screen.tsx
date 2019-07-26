import React, { Component } from 'react';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';
import { SwipeListView } from 'react-native-swipe-list-view';

import { StyleSheet, View, ListRenderItemInfo, Image } from 'react-native';

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
    </View>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
    const { navigation } = this.props;
    const action = navigation.getParam('action', 'shoppingList');

    console.log('IN CART', this.state.cart);
    if (this.state.cart.length === 0) {
      return (
        <View>
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
          <CustomText style={styles.welcome}>{action} list page </CustomText>
          <CustomText style={styles.welcome1}>Swipe for options </CustomText>

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
                  Dislike
                </CustomText>
                <CustomText
                  style={styles.rowBackright}
                  onPress={() =>
                    this.props.updateShoppingListCallback(rowData.item, 'like')
                  }
                >
                  Like
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
                  Delete
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
                  Save
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
    backgroundColor: 'white',
    // marginTop: 40,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  row: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  pic: {
    width: 70,
    height: 70,
  },
  picturerow: {
    backgroundColor: 'white',
    padding: 20,
  },
  rowBackleft: {
    backgroundColor: '#DD9296',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: 67,
    height: 110,
  },
  rowBackright: {
    backgroundColor: '#87B38D',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 67,
    height: 110,
  },
  rowBackdelete: {
    backgroundColor: '#CC76A1',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 67,
    height: 110,
  },
  rowBacksave: {
    backgroundColor: '#F2B7C6',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 67,
    height: 110,
  },
  swipecontainer: {
    flex: 2,
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
    fontSize: 12,
    textAlign: 'center',
  },
});
