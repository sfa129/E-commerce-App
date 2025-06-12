import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const registerUserAPI = async ({ firstName, lastName, email, password }) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;
  const userInfo = {
    uid: user.uid,
    email: user.email,
    firstName,
    lastName,
  };
  await setDoc(doc(db, "users", user.uid), userInfo);
  return userInfo;
};

export const loginUserAPI = async ({ email, password }) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const user = userCred.user;
  const docSnap = await getDoc(doc(db, "users", user.uid));
  if (!docSnap.exists()) throw new Error("User data not found");
  return docSnap.data();
};

export const logoutUserAPI = async () => {
  await signOut(auth); // ✅ Use real Firebase logout
};
