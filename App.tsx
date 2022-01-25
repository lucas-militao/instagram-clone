import React, { useEffect, useState } from 'react';

import { View, Text } from 'react-native';

import * as firebaseApp from "firebase/app"
import * as firebaseAuth from "firebase/auth";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./src/redux/reducers";
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

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
import Main from './src/components/Main';
import Add from './src/components/main/Add';
import { Save } from './src/components/main/Save';


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
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
            <Stack.Screen name="Add" component={Add} />
            <Stack.Screen name="Save" component={Save} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    );
  }
}

