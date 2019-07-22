import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct, Vote } from '../api/product.api';

interface State {
  recommended: Product[];
}

interface NavigationProps {
  user: User;
}
interface Props {
  navigation: NavigationScreenProp<{}, NavigationProps>;
  user: User;
  updateShoppingListCallback: (product: Product, action: Vote) => void;
}

export default class ProductMatchesScreen extends Component<Props, State> {
  private constructor(props: Props) {
    super(props);

    this.state = {
      recommended: [],
    };
  }

  public async componentDidMount() {
    try {
      const { navigation } = this.props;
      const compareUser = navigation.getParam('user', null);
      const loggedInUser = this.props.user;

      const recommededList: string[] = loggedInUser.like.filter(
        items => !compareUser.like.includes(items),
      );

      const actualProduct: Promise<Product>[] = recommededList.map(productid =>
        getProduct(productid),
      );

      const allProducts: Product[] = await Promise.all(actualProduct);

      this.setState({ recommended: allProducts });
    } catch (error) {
      console.log(error.message);
    }
  }

  private _renderItem = (listRenderItemInfo: ListRenderItemInfo<Product>) => (
    <TouchableOpacity>
      <View style={styles.rowContainer}>
        <View style={styles.rowText}>
          <Text style={styles.title}>{listRenderItemInfo.item.name}</Text>
          <Button
            title="Add to Shopping List"
            onPress={() =>
              this.props.updateShoppingListCallback(
                listRenderItemInfo.item,
                'shoppingList',
              )
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
    const { navigation } = this.props;
    const compareUser = navigation.getParam('user', null);

    return (
      <View>
        <Text>{compareUser.name}</Text>
        <FlatList
          data={this.state.recommended}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Button
          title="Go to Shopping List"
          onPress={() => this.props.navigation.navigate('Shopping List')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  author: {
    paddingLeft: 10,
    marginTop: 5,
    fontSize: 14,
    color: '#777',
  },
  thumbnail: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  rowText: {
    flex: 4,
    flexDirection: 'column',
  },
});
