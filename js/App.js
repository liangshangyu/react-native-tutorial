/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ListItem,
  Button,
  ScrollView,
} from 'react-native';
import { DrawerNavigator, StackNavigator, DrawerItems } from 'react-navigation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { asyncAction } from './actions';

import UserContainer from './user/UserContainer';
import MessageContainer from './message/MessageContainer';
import UserDrawer from './user/UserDrawer';
import MyWalletView from './user/MyWalletView';
import MyVoucherView from './user/MyVoucherView';

const stateToProps = (state) => {
  var { test } = state;
  return {
    test
  }
};

const dispatchToProps = (dispatch) => {
  return { actions: bindActionCreators({ asyncAction }, dispatch) }
}

class App extends Component {
  // static navigationOptions = {
  //   title: 'Home',
  //   headerRight: (<Button title={'Right'} onPress={() => {this._toggleDrawer()} }/>),
  //   headerLeft: (<Button title={'Left'} onPress={(e) => {console.log('hello left button clicked');}} />)
  // }

  constructor(props) {
    super(props);

    this._drawerOpen = false;
    this._toggleDrawer = this._toggleDrawer.bind(this);
  }

  _toggleDrawer() {
    if (this._drawerOpen) {
      this.props.navigation.navigate('DrawerClose');
      this._drawerOpen = false;
    } else {
      this.props.navigation.navigate('DrawerOpen');
      this._drawerOpen = true;
    }
  }

  _startAsyncAction = () => {
    this.props.actions.asyncAction();
    console.log('===>hello world async actions')
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text> */}
        <View style={styles.welcome}>
          <Text key="1">Hello</Text>
          <Text key="2">{this.props.test.loadDone ? 'DONE' : 'NOT YET'}</Text>
          <Button
            onPress={() => {
              //               this.props.actions.asyncAction();
              this._startAsyncAction();
              console.log('click a button');
            }}
            title="click hello world" />
        </View>
        {/* <FlatList
          style={{flex: 1, backgroundColor: 'yellow'}}
          contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          data={[{title: 'title 1', key: 'item1'}, {title: 'title 2', key: 'item2'}]}
          renderItem={({item}) => (<Text style={styles.row} key={item.key}>{item.title}</Text>)} /> */}
      </View>
    );
  }
}

const AppContainer = connect(stateToProps, dispatchToProps)(App);

// const NavHome = StackNavigator({
//     Home: {
//       screen: App,
//       navigationOptions: ({navigation}) => ({
//         title: 'Home',
//         headerLeft: (<Button onPress={() => navigation.navigate('DrawerToggle')} title={'User'} />),
//         headerRight: (<Button onPress={() => navigation.navigate('Message')} title={'Message'} />),
//       })
//     },
//     User: {
//       screen: UserContainer,
//       navigationOptions: ({navigation}) => ({
//         title: 'User',
//         headerLeft: (<Button title='Back' onPress={() => {navigation.goBack();}} />)
//       })
//     },
//     Message: {
//       screen: MessageContainer,
//       navigationOptions: ({navigation}) => ({
//         title: "Message",
//         headerLeft: (<Button title='Back' onPress={() => {navigation.goBack();}} />)
//       })
//     },
//   });

const NavHome = StackNavigator({
  Home: {
    screen: AppContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: (<Button onPress={() => navigation.navigate('DrawerToggle')} title={'User'} />),
      headerRight: (<Button onPress={() => navigation.navigate('Message')} title={'Message'} />),
    })
  },
  User: {
    screen: UserContainer,
    navigationOptions: ({ navigation }) => ({
      title: 'User',
      headerLeft: (<Button title='Back' onPress={() => { navigation.goBack(); }} />)
    })
  },
  Message: {
    screen: MessageContainer,
    navigationOptions: ({ navigation }) => ({
      title: "Message",
      headerLeft: (<Button title='Back' onPress={() => { navigation.goBack(); }} />)
    })
  },
});

export default NavApp = DrawerNavigator({
  Home: {
    screen: NavHome,
  },
  User: {
    screen: UserContainer,
  },
  MyWallet: {
    screen: MyWalletView,
  },
  MyVoucher: {
    screen: MyVoucherView,
  }
}, {
    contentComponent: props => (<UserDrawer items={props} />)
  });

// export default NavApp = DrawerNavigator({
//   Home: {
//     screen: NavHome,
//   },
//   User: {
//     screen: UserContainer,
//   },
//   MyWallet: {
//     screen: MyWalletView,
//   },
//   MyVoucher: {
//     screen: MyVoucherView,
//   }
// }, {
//   // contentComponent: props => (<ScrollView><DrawerItems {...props}/></ScrollView>)
//    contentComponent: props => (<UserDrawer items={props} />)
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'red',
  },
  welcome: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  row: {
    elevation: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'blue',
  }
});
