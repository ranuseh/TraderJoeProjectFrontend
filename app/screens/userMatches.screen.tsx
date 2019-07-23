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
    <TouchableOpacity>
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
    // const items = this.state.allUsers.map((singleUserDate: [User, number]) => {
    //   const user = singleUserDate[0];
    //   const score = singleUserDate[1];

    //   return (
    //     <Text
    //       key={user.name}
    //       style={styles.paragraph}
    //       onPress={() =>
    //         this.props.navigation.navigate('UserProduct', { user })
    //       }
    //     >
    //       <CustomText style={styles.score}>{score.toFixed(0)}%</CustomText>

    //       <CustomText>{user.name}</CustomText>
    //     </Text>
    //   );
    // });

    if (this.state.allUsers.length === 0) {
      return (
        <View style={styles.container}>
          <NavigationEvents onWillFocus={() => this.loadScores()} />

          <Text>Play to get your matches</Text>
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
    padding: 40,
    backgroundColor: '#fffff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00000',
  },
  score: {
    color: '#B31100',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
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
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  thumbnail: {
    flex: 1,
    height: 75,
    width: 75,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
