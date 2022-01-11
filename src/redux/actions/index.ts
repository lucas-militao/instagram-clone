import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
  const firestore = getFirestore();
  const auth = getAuth();

  return(async (dispatch) => {
    await getDoc(doc(firestore, "/users", auth.currentUser.uid))
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
        } else {
          console.log("does not exist");
        }
      })
  })
}