import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
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
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('ProductMatches', {
          user: listRenderItemInfo.item[0],
        })
      }
    >
      <View style={styles.rowContainer}>
        <View style={styles.rowText}>
          <CustomText style={styles.title}>
            <Image
              source={{ uri: listRenderItemInfo.item[0].image }}
              style={styles.thumbnail}
              resizeMode="contain"
            />
            {listRenderItemInfo.item[0].name}
            {listRenderItemInfo.item[1].toFixed(0)}%
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );

  private _keyExtractor = (UserWithScore: UserWithScore) =>
    UserWithScore[0].facebookId.toString();

  public render() {
    if (this.state.allUsers.length === 0) {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.loadScores()} />
          <CustomText style={styles.paragraph}>No Matches yet</CustomText>

          <CustomText style={styles.paragraph}>
            Play to get your matches!
          </CustomText>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
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
    flex: 1,
    justifyContent: 'center',
    // padding: 10,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  score: {
    color: '#B31100',
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
  rowText: {
    flex: 4,
    flexDirection: 'column',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  thumbnail: {
    flex: 1,
    height: 50,
    width: 50,
    padding: 0,
  },
});
