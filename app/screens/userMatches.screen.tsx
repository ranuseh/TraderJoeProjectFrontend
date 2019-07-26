import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListRenderItemInfo,
  TouchableOpacity,
  Image,
  FlatList,
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
              {listRenderItemInfo.item[1].toFixed(0)}%
            </CustomText>
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
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.loadScores()} />
          <CustomText style={styles.paragraph}>No Matches yet. </CustomText>

          <CustomText style={styles.paragraph}>
            Play to get your matches!
          </CustomText>
        </View>
      );
    } else {
      return (
        <View>
          <CustomText style={styles.welcome}>Here are your matches!</CustomText>

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
    backgroundColor: 'white',
    padding: 5,
  },
  paragraph: {
    flex: 1,
    flexDirection: 'column',
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black ',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
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
    color: '#222',
    fontSize: 16,
    width: 170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#D21242',
    fontSize: 20,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
  welcome: {
    color: 'black',
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 16,
  },
});
