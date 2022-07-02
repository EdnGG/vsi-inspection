import { auth } from '../firebase';

export const signOut = async () => {
  await auth.signOut();
};

export const login = async (user) => {
  const res = await auth.signInWithEmailAndPassword(user.email, user.password);
  const userLogged = {
    uid: res.user.uid,
    email: res.user.email,
  };
  return userLogged;
};

export const newUser = async (user) => {
  const res = await auth.createUserWithEmailAndPassword(
    user.email,
    user.password,
  );
  const userCreated = {
    uid: res.user.uid,
    email: res.user.email,
    role: 'USER',
  };
  return userCreated;
};

export const resetPass = async (email) => { 
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (error) {
    console.log(error);
  }

}
  