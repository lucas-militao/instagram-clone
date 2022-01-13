import { getAuth } from "firebase/auth";
import React, { Component, useEffect } from "react";
import { Button, Text, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

// export const Main: React.FC = (props) => {
//   function componentDidMount() {
    
//   }

//   function logout() {
//     getAuth().signOut();
//   }

//   useEffect(() => {
//     componentDidMount();
//   }, [])

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>User is logged in!</Text>
//       <Button
//         title="Logout"
//         onPress={logout}
//       />
//     </View>
//   )
// }

class Main extends Component {
  componentDidMount(): void {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render(): React.ReactNode {
    const { currentUser } = this.props;

    if (currentUser == undefined) {
      return(
        <View></View>
      )
    }
    
    function logout() {
      getAuth().signOut();
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{currentUser.name} is logged in!</Text>
        <Button
          title="Logout"
          onPress={logout}
        />
      </View>
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