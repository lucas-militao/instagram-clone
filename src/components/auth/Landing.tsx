import React from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Landing: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}> 
      <Button 
        title="Register"
        onPress={() => { navigation.navigate("Register") }}
      />
      <Button 
        title="Login"
        onPress={() => { navigation.navigate("Login") }}
      />
    </View>
  );
}