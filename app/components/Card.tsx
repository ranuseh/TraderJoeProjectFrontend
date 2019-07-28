import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Product from '../model/product.model';
import { CustomText } from './CustomText';

interface Props {
  product: Product;
}

export class Card extends React.Component<Props, {}> {
  public render() {
    return (
      <View style={styles.container}>
        <CustomText style={styles.nevertried}>Never Tried</CustomText>

        <View style={styles.welcome}>
          <CustomText style={styles.welcometxt}>Swipe to play!</CustomText>
        </View>
        <View style={styles.card}>
          <Image
            source={{ uri: this.props.product.imageUrl }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
        </View>
        <View style={styles.vote}>
          <CustomText style={styles.dislike}>Dislike</CustomText>
          <CustomText style={styles.like}>Like</CustomText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 300,
    height: 300,
    // backgroundColor: 'white',
  },
  container: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'white',
  },
  thumbnail: {
    flex: 1,
    height: 300,
    width: 300,
    // padding: 10,
  },
  vote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maringTop: 50,
    width: 300,
    height: 100,
    // backgroundColor: 'white',
  },
  welcome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    fontSize: 30,
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    color: '#32CD32',
    marginLeft: 100,
    fontSize: 16,
  },
  dislike: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    color: '#D21242',
    marginRight: 100,
    backgroundColor: 'white',
    fontSize: 16,
  },
  nevertried: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#b48a01',
    marginRight: 200,
    backgroundColor: 'white',
    fontSize: 16,
  },
  welcometxt: {
    fontSize: 20,
    paddingTop: 20,
  },
});
