import React, { useState } from 'react';

import { View, Text } from 'react-native';

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

const Stack = createNativeStackNavigator();

export const App: React.FC = () => {
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

  return(
    <>
      {
        loaded ? 
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer> :
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      }
    
    </>
  );
}
