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
    <View style={styles.row}>
      <View style={styles.picturerow}>
        <Image
          source={{ uri: listRenderItemInfo.item.imageUrl }}
          style={styles.pic}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          this.props.updateShoppingListCallback(
            listRenderItemInfo.item,
            'shoppingList',
          )
        }
      >
        <View style={styles.checkoutrow}>
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/Pngtreemz%20%20shopping%20cart%20hover_253051_zpsxd2buyna.png',
            }}
            style={styles.piccart}
          />
          <CustomText> Add to List</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
    return (
      <View>
        <CustomText
          style={styles.mblTxtbutton}
          onPress={() => this.props.navigation.navigate('Shopping List')}
        >
          Go To Shopping List
        </CustomText>
        <FlatList
          data={this.state.recommended}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  row: {
    flex: 2,
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
  piccart: {
    width: 30,
    height: 30,
  },
  mblTxtbutton: {
    color: '#D21242',
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
    backgroundColor: 'white',
  },
  picturerow: {
    backgroundColor: 'white',
    padding: 20,
  },
  checkoutrow: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
});
