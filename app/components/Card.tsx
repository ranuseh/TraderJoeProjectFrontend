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
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/cancel_zpsjmgn1gym.png?width=50&height=50&crop=1:1,smart',
            }}
            style={styles.emojipic}
          />
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/neutral_zpsun8ttyzo.png?width=50&height=50&crop=1:1,smart',
            }}
            style={styles.emojipic}
          />
          <Image
            source={{
              uri:
                'https://i38.photobucket.com/albums/e124/ranuseh/kisspng-youtube-facebook-f8-like-button-emoticon-smiley-hieroglyphs-5b4232d2717767.8674841515310650424648_zpsetqotwfc.png?width=50&height=50&crop=1:1,smart',
            }}
            style={styles.emojipic}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    // flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: 'white',
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
    padding: 10,
  },
  vote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },
  welcome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 100,
    backgroundColor: 'white',
    fontSize: 30,
  },
  emojipic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 40,
    width: 50,
    height: 50,
  },
  welcometxt: {
    fontSize: 18,
    paddingTop: 20,
  },
});
