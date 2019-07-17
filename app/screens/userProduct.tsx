import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import User from '../model/user.model';
import Product from '../model/product.model';
import { getProduct } from '../api/product.api';

interface OwnProps {
  user: User;
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
      const user = navigation.getParam('user', null);

      const recommededList: string[] = this.props.user.like.filter(
        items => !user.like.includes(items),
      );

      const actualProduct: Promise<Product>[] = await recommededList.map(
        productid => getProduct(productid),
      );

      const allProducts: Product[] = await Promise.all(actualProduct);

      this.setState({ recommended: allProducts });
    } catch (error) {
      console.log(error.message);
    }
  }

  public render() {
    console.log('RECOMMENDED', this.state.recommended);
    const singleProduct = this.state.recommended.map(product => product.name);

    const { navigation } = this.props;
    const user = navigation.getParam('user', null);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Username #{user.name}</Text>
        <Text style={styles.title}>Recommendations #{singleProduct}</Text>
        <Text style={styles.title}>User Dislikes #{user.dislike}</Text>

        <Button
          title="Back To Matches"
          onPress={() => this.props.navigation.navigate('Tabs')}
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
});
