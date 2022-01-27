import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { getStorage, getBlob, ref, uploadBytes } from "firebase/storage";
import * as firebaseAuth from "firebase/auth";



export const Save: React.FC = (props) => {
  const [caption, setCaption] = useState("");
  const auth = firebaseAuth.getAuth();
  const storage = getStorage();

  const path = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;

  const uri = props.route.params.image;

  const uploadImage = async () => {
    const response = await (await fetch(uri)).blob();
    
    const storageRef = ref(storage, path);
    uploadBytes(storageRef, response).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    // try {
    //   await setDoc(doc(firestore, "post", `${auth.currentUser.uid}/${new Date().getTime()}/${caption === "" ? "caption" : caption}`), {
    //     url
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    // const taskProgress = snapshot => {
    //   console.log(`transferred: ${snapshot.bytesTransferred}`);
    // }

    // const taskCompleted = snapshot => {
    //   snapshot.ref.getDownloadURL().then((snapshot) => {
    //     console.log(snapshot);
    //   })
    // }

    // const taskError = snapshot => {
    //   console.log(snapshot);
    // }

    // task.on("state_change");
  }

  return (
    <View style={{flex: 1}}>
      <Image source={{uri: uri}}/>
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={setCaption}
        value={caption}
      />
      <Button
        title="Save"
        onPress={() => uploadImage()}
      />
    </View>
  )
}