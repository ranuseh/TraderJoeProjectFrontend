import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListRenderItemInfo,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native';

import User from '../model/user.model';
import { getRecommendedUsers } from '../api/user.api';
import { NavigationScreenProp, NavigationEvents } from 'react-navigation';
import { CustomText } from '../components/CustomText';

type UserWithScore = [User, number];

export interface Props {
  user: User;
  navigation: NavigationScreenProp<{}, {}>;
}

interface State {
  allUsers: [User, number][];
}

export default class UserMatchesScreen extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.state = {
      allUsers: [],
    };
  }

  private async loadScores() {
    if (
      this.props.user.like.length !== 0 ||
      this.props.user.dislike.length !== 0
    ) {
      try {
        const allAppUsers: [User, number][] = await getRecommendedUsers(
          this.props.user.facebookId,
        );

        this.setState({ allUsers: allAppUsers });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  private _renderItem = (
    listRenderItemInfo: ListRenderItemInfo<UserWithScore>,
  ) => (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ProductMatches', {
            user: listRenderItemInfo.item[0],
          })
        }
        style={styles.container}
      >
        <Image
          source={{ uri: listRenderItemInfo.item[0].image }}
          style={styles.pic}
        />
        <View>
          <View style={styles.nameContainer}>
            <CustomText style={styles.nameTxt}>
              {listRenderItemInfo.item[0].name}
            </CustomText>
            <CustomText style={styles.mblTxt}>
              {listRenderItemInfo.item[1].toFixed(0)}% Match
            </CustomText>
          </View>
          <View style={styles.inforow}>
            <Text style={styles.nameTxt}>
              <Image
                source={{
                  uri:
                    'https://i38.photobucket.com/albums/e124/ranuseh/kisspng-world-emoji-day-earth-globe-emojipedia-world-emoji-meaning-with-pictures-from-a-to-z-5cb9cd5b1e7ad2.2002949515556806_zps1j94myx4.png',
                }}
                style={styles.emojipic}
              />
              <CustomText>Seattle, WA</CustomText>
            </Text>
            <Text style={styles.nameTxt}>
              <Image
                source={{
                  uri:
                    'https://i38.photobucket.com/albums/e124/ranuseh/PinClipart.com_free-emoji-clipart_453763_zpsa6twl54m.png',
                }}
                style={styles.emojipic}
              />
              <CustomText>Shops at: Capitol Hill </CustomText>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  private _keyExtractor = (UserWithScore: UserWithScore) =>
    UserWithScore[0].facebookId.toString();

  public render() {
    if (this.state.allUsers.length === 0) {
      return (
        <View style={styles.emptycontainer}>
          <NavigationEvents onWillFocus={() => this.loadScores()} />
          <CustomText style={styles.paragraph}>No Matches yet. </CustomText>

          <CustomText style={styles.paragraph1}>
            Play to get your matches!
          </CustomText>
        </View>
      );
    } else {
      return (
        <View>
          <CustomText style={styles.welcome}>Top 5 Matches</CustomText>

          <NavigationEvents onWillFocus={() => this.loadScores()} />
          <FlatList
            data={this.state.allUsers}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptycontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  paragraph: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 18,
  },
  paragraph1: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingTop: 22,
    paddingBottom: 5,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    fontSize: 14,
    width: 170,
  },
  mblTxt: {
    // fontWeight: '200',
    color: '#D21242',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  msgTxt: {
    fontSize: 12,
    marginLeft: 15,
  },
  welcome: {
    color: 'black',
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 18,
  },
  inforow: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    padding: 10,
  },
  emojipic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 12,
    height: 12,
    fontFamily: 'Chalkduster',
  },
});
