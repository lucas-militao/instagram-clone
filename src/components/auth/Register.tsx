import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";

import * as firebaseAuth from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const firestore = getFirestore();

  function onSignUp() {
    const auth = firebaseAuth.getAuth();
    firebaseAuth.createUserWithEmailAndPassword(auth, email, password)
    .then(async (result) => {
      await setDoc(doc(firestore, "users", auth.currentUser.uid), {
        name,
        email,
      });
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return(
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
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
        title="Sign Up"
        onPress={() => onSignUp()}
      />
    </View>
  );
}