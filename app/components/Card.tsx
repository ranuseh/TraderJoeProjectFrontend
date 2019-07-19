import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { NoMoreCards } from './NoMoreCards';
import Product from '../model/product.model';

interface Props {
  product: Product;
}

export class Card extends React.Component<Props, {}> {
  public render() {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: this.props.product.imageURL }}
          style={styles.thumbnail}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  thumbnail: {
    flex: 1,
    height: 300,
    width: 300,
    padding: 10,
  },
});
