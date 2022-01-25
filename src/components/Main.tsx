import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";
import MaterialCommmunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feed } from "./main/Feed";
import { Profile } from "./main/Profile";

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {null}

class Main extends Component {
  componentDidMount(): void {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render(): React.ReactNode {
    return (
      <Tab.Navigator initialRouteName="Feed">
        <Tab.Screen 
          name="Feed" 
          component={Feed} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommmunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen 
          name="MainAdd" 
          component={EmptyScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommmunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate("Add");
            }
          })}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommmunityIcons name="account-circle" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});

const mapDispatchProps = (dispatch) => bindActionCreators(
  {fetchUser}, 
  dispatch
);

export default connect(mapStateToProps, mapDispatchProps)(Main);