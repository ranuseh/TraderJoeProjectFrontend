import React, { Component } from 'react';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';
import { SwipeListView, RowMap } from 'react-native-swipe-list-view';

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
    <View style={styles.row}>
      <View style={styles.picturerow}>
        <Image
          source={{ uri: listRenderItemInfo.item.imageUrl }}
          style={styles.pic}
        />
      </View>
      {/* <TouchableOpacity
        onPress={() =>
          this.props.updateShoppingListCallback(listRenderItemInfo.item, 'like')
        }
      >
        <View style={styles.checkoutrow}>
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/heart_zpsmhbnee4n.png',
            }}
            style={styles.piccart}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          this.props.updateShoppingListCallback(
            listRenderItemInfo.item,
            'delete',
          )
        }
      >
        <View style={styles.checkoutrow}>
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/cancel_zpsjmgn1gym.png',
            }}
            style={styles.piccart}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          this.props.updateShoppingListCallback(
            listRenderItemInfo.item,
            'dislike',
          )
        }
      >
        <View style={styles.checkoutrow}>
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/neutral_zpsun8ttyzo.png',
            }}
            style={styles.piccart}
          />
        </View>
      </TouchableOpacity> */}
    </View>
  );

  private _keyExtractor = (product: Product) => product.productId.toString();

  public render() {
    console.log('IN CART', this.state.cart);
    if (this.state.cart.length === 0) {
      return (
        <View>
          <NavigationEvents onWillFocus={() => this.loadShoppingList()} />
          <CustomText style={styles.paragraph}>Nothing here</CustomText>

          <CustomText style={styles.paragraph}>
            Play to start adding items!
          </CustomText>
        </View>
      );
    } else {
      return (
        <View>
          <NavigationEvents onWillFocus={() => this.loadShoppingList()} />
          <SwipeListView
            data={this.state.cart}
            renderItem={this._renderItem}
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
                  Disliked it!
                </CustomText>
                <CustomText
                  style={styles.rowBackright}
                  onPress={() =>
                    this.props.updateShoppingListCallback(rowData.item, 'like')
                  }
                >
                  Liked it!
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
                  Delete it!
                </CustomText>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-150}
          />
          {/* <FlatList
            data={this.state.cart}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          /> */}
        </View>
      );
    }
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
  rowBackleft: {
    backgroundColor: 'pink',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 110,
  },
  rowBackright: {
    backgroundColor: 'yellow',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 110,
  },
  rowBackdelete: {
    backgroundColor: 'red',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 110,
  },
  swipecontainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
// import React, { Component } from 'react';
// import { ListView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';

// import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// import 'prop-types';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//     this.state = {
//       basic: true,
//       listViewData: Array(20).fill('').map((_, i) => `item #${i}`),
//     };
//   }

//   deleteRow(secId, rowId, rowMap) {
//     rowMap[`${secId}${rowId}`].closeRow();
//     const newData = [...this.state.listViewData];
//     newData.splice(rowId, 1);
//     this.setState({ listViewData: newData });
//   }

//   render() {
//     return (
//       <View style={styles.container}>

//         <View style={styles.standalone}>
//           <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
//             <View style={styles.standaloneRowBack}>
//               <Text style={styles.backTextWhite}>Left</Text>
//               <Text style={styles.backTextWhite}>Right</Text>
//             </View>
//             <View style={styles.standaloneRowFront}>
//               <Text>I am a standalone SwipeRow</Text>
//             </View>
//           </SwipeRow>
//         </View>

//         <View style={styles.controls}>
//           <View style={styles.switchContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.switch,
//                 { backgroundColor: this.state.basic ? 'grey' : 'white' },
//               ]}
//               onPress={_ => this.setState({ basic: true })}>
//               <Text>Basic</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[
//                 styles.switch,
//                 { backgroundColor: this.state.basic ? 'white' : 'grey' },
//               ]}
//               onPress={_ => this.setState({ basic: false })}>
//               <Text>Advanced</Text>
//             </TouchableOpacity>

//           </View>
//           {!this.state.basic && <Text>(per row behavior)</Text>}
//         </View>

//         {this.state.basic &&
//           <SwipeListView
//             dataSource={this.ds.cloneWithRows(this.state.listViewData)}
//             renderRow={data => (
//               <TouchableHighlight
//                 onPress={_ => console.log('You touched me')}
//                 style={styles.rowFront}
//                 underlayColor={'#AAA'}>
//                 <View>
//                   <Text>I am {data} in a SwipeListView</Text>
//                 </View>
//               </TouchableHighlight>
//             )}
//             renderHiddenRow={(data, secId, rowId, rowMap) => (
//               <View style={styles.rowBack}>
//                 <Text>Left</Text>
//                 <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
//                   <Text style={styles.backTextWhite}>Right</Text>
//                 </View>
//                 <TouchableOpacity
//                   style={[styles.backRightBtn, styles.backRightBtnRight]}
//                   onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
//                   <Text style={styles.backTextWhite}>Delete</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             leftOpenValue={75}
//             rightOpenValue={-150}
//           />}

//         {!this.state.basic &&
//           <SwipeListView
//             dataSource={this.ds.cloneWithRows(this.state.listViewData)}
//             renderRow={(data, secId, rowId, rowMap) => (
//               <SwipeRow
//                 disableLeftSwipe={parseInt(rowId) % 2 === 0}
//                 leftOpenValue={20 + Math.random() * 150}
//                 rightOpenValue={-150}>
//                 <View style={styles.rowBack}>
//                   <Text>Left</Text>
//                   <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
//                     <Text style={styles.backTextWhite}>Right</Text>
//                   </View>
//                   <TouchableOpacity
//                     style={[styles.backRightBtn, styles.backRightBtnRight]}
//                     onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
//                     <Text style={styles.backTextWhite}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <TouchableHighlight
//                   onPress={_ => console.log('You touched me')}
//                   style={styles.rowFront}
//                   underlayColor={'#AAA'}>
//                   <View>
//                     <Text>I am {data} in a SwipeListView</Text>
//                   </View>
//                 </TouchableHighlight>
//               </SwipeRow>
//             )}
//           />}

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     flex: 1,
//   },
//   standalone: {
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   standaloneRowFront: {
//     alignItems: 'center',
//     backgroundColor: '#CCC',
//     justifyContent: 'center',
//     height: 50,
//   },
//   standaloneRowBack: {
//     alignItems: 'center',
//     backgroundColor: '#8BC645',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   backTextWhite: {
//     color: '#FFF',
//   },
//   rowFront: {
//     alignItems: 'center',
//     backgroundColor: '#CCC',
//     borderBottomColor: 'black',
//     borderBottomWidth: 1,
//     justifyContent: 'center',
//     height: 50,
//   },
//   rowBack: {
//     alignItems: 'center',
//     backgroundColor: '#DDD',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 15,
//   },
//   backRightBtn: {
//     alignItems: 'center',
//     bottom: 0,
//     justifyContent: 'center',
//     position: 'absolute',
//     top: 0,
//     width: 75,
//   },
//   backRightBtnLeft: {
//     backgroundColor: 'blue',
//     right: 75,
//   },
//   backRightBtnRight: {
//     backgroundColor: 'red',
//     right: 0,
//   },
//   controls: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   switchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 5,
//   },
//   switch: {
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'black',
//     paddingVertical: 10,
//     width: 100,
//   },
// });

// export default App;
