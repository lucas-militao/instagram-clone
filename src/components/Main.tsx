import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { Button, Text, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions/index";

export const Main: React.FC = () => {
  function componentDidMount() {
    
  }

  function logout() {
    getAuth().signOut();
  }

  useEffect(() => {
    componentDidMount();
  }, [])

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>User is logged in!</Text>
      <Button
        title="Logout"
        onPress={logout}
      />
    </View>
  )
}

const mapDispatchProps = (dispatch) => bindActionCreators(
  {fetchUser}, 
  dispatch
);

export default connect(null, mapDispatchProps)(Main);