import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct, Vote } from '../api/product.api';
import { CustomText } from '../components/CustomText';

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
    console.log('in product matches');
    try {
      const { navigation } = this.props;
      const compareUser = navigation.getParam('user', null);
      const loggedInUser = this.props.user;

      const recommededList: string[] = compareUser.like.filter(
        items => !loggedInUser.like.includes(items),
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
          <CustomText style={styles.title}>
            <Image
              source={{ uri: listRenderItemInfo.item.imageUrl }}
              style={styles.thumbnail}
              resizeMode="contain"
            />
            <Text
              onPress={() =>
                this.props.updateShoppingListCallback(
                  listRenderItemInfo.item,
                  'shoppingList',
                )
              }
            >
              Add to My Shopping List
            </Text>
          </CustomText>

          <Image
            source={{ uri: listRenderItemInfo.item.imageUrl }}
            style={styles.thumbnail}
            resizeMode="contain"
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
        <CustomText>{compareUser.name} recommedations for you.</CustomText>

        <FlatList
          data={this.state.recommended}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <CustomText
          onPress={() => this.props.navigation.navigate('Shopping List')}
        >
          <Text> Go to Shopping List</Text>
        </CustomText>
      </View>
    );
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
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
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
    height: 100,
    width: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rowText: {
    flex: 4,
    flexDirection: 'column',
  },
});
