import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import * as firebaseAuth from "firebase/auth";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSignIn() {
    const auth = firebaseAuth.getAuth();
    firebaseAuth.signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return(
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />

      <Button
        title="Sign In"
        onPress={() => onSignIn()}
      />
    </View>
  );
}