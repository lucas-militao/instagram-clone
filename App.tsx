import React, { useEffect, useState } from 'react';

import { View, Text, Button } from 'react-native';

import * as firebaseApp from "firebase/app"
import * as firebaseAuth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBx6SqjBm947BFYsQKl879EqutHDE3F1_w",
  authDomain: "instagram-dev-bc3ae.firebaseapp.com",
  projectId: "instagram-dev-bc3ae",
  storageBucket: "instagram-dev-bc3ae.appspot.com",
  messagingSenderId: "458598264603",
  appId: "1:458598264603:web:6face9d04aa5ac8f68edbe",
  measurementId: "G-GS26LDKNCB"
};

firebaseApp.initializeApp(firebaseConfig);

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Landing } from './src/components/auth/Landing';
import { Register } from './src/components/auth/Register';
import { Login } from './src/components/auth/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function componentDidMount() {
    const auth = firebaseAuth.getAuth();
    firebaseAuth.onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }

  function logout() {
    firebaseAuth.getAuth().signOut();
  }

  useEffect(() => {
    componentDidMount()
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    )
  }
  else if(!loggedIn) {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing'>
          <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User is loggedIn</Text>
        <Button
          title="Logout"
          onPress={logout}
        />
      </View>
    );
  }
}

