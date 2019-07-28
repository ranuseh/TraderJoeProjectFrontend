import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  Text,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct, Vote } from '../api/product.api';
import { CustomText } from '../components/CustomText';

interface State {
  recommended: Product[];
  added: boolean;
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
      added: false,
    };
  }

  public async componentDidMount() {
    try {
      const { navigation } = this.props;
      const compareUser = navigation.getParam('user', null);
      const loggedInUser = this.props.user;

      const recommededList: string[] = compareUser.like.filter(item => {
        return (
          !loggedInUser.like.includes(item) &&
          !loggedInUser.dislike.includes(item)
        );
      });

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
        <View style={styles.inforow}>
          <Text style={styles.nameTxt}>
            <Image
              source={{
                uri:
                  'https://i38.photobucket.com/albums/e124/ranuseh/heart_zpsmhbnee4n.png',
              }}
              style={styles.emojipic}
            />
            <CustomText> 9 Likes</CustomText>
          </Text>
          <Text style={styles.nameTxt}>
            <Image
              source={{
                uri:
                  'https://i38.photobucket.com/albums/e124/ranuseh/cancel_zpsjmgn1gym.png',
              }}
              style={styles.emojipic}
            />
            <CustomText> 2 Dislikes </CustomText>
          </Text>
          <Text style={styles.nameTxt}>
            <Image
              source={{
                uri:
                  'https://i38.photobucket.com/albums/e124/ranuseh/neutral_zpsun8ttyzo.png',
              }}
              style={styles.emojipic}
            />
            <CustomText> 15 Never Tried </CustomText>
          </Text>
        </View>
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
                'https://i38.photobucket.com/albums/e124/ranuseh/Pngtreemz%20%20shopping%20cart%20hover_253051_zpsxd2buyna.png?width=50&height=50&crop=1:1,smart',
            }}
            style={styles.piccart}
          />
          <CustomText> Add</CustomText>
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
    // margin: 24,
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
    width: 80,
    height: 80,
  },
  piccart: {
    width: 20,
    height: 20,
  },
  mblTxtbutton: {
    color: '#D21242',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  mblTxtbuttontrue: {
    backgroundColor: 'yellow',
  },
  picturerow: {
    flex: 3,
    flexDirection: 'row',
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
  inforow: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  infotxt: {
    paddingLeft: 30,
    paddingBottom: 5,
  },
  tinypic: {
    width: 15,
    height: 15,
    backgroundColor: 'green',
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    // color: '#222',
    fontSize: 14,
    width: 170,
  },
  emojipic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 12,
    height: 12,
    // backgroundColor: 'white',
    fontFamily: 'Chalkduster',
  },
});
