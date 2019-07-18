import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct } from '../api/product.api';
import { Card } from 'react-native-elements';

interface OwnProps {
  user: User;
  onAddToCartCallback: (product: Product) => void;
}

interface State {
  recommended: Product[];
}

interface NavigationProps {
  navigation: NavigationScreenProp<{}, OwnProps>;
}

export type Props = OwnProps & NavigationProps;

export default class UserProduct extends Component<Props, State> {
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

  public render() {
    const listOfProducts = this.state.recommended.map((product: Product) => {
      return (
        <Text key={product.name} style={styles.title}>
          {product.name}
        </Text>
      );
    });

    const { navigation } = this.props;
    const compareUser = navigation.getParam('user', null);

    return (
      <View style={styles.rowContainer}>
        <View style={styles.rowText}>
          <Text
            style={styles.title}
            numberOfLines={2}
            ellipsizeMode={'tail'}
          ></Text>
          <Text style={styles.author} numberOfLines={1} ellipsizeMode={'tail'}>
            Name: {compareUser.name}
            Products User Recommends:{listOfProducts}
          </Text>
          <Button
            title="Add to Shopping List"
            onPress={() => this.props.navigation.navigate('Tabs')}

            // onPress={() => this.props.onAddToCartCallback({ listOfProducts })}
          />
          <Button
            title="Back To Matches"
            onPress={() => this.props.navigation.navigate('Tabs')}
          />
        </View>
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
