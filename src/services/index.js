import axios from "axios";
import { db, storage, auth } from "../firebase";

const WEATHER_API_KEY = process.env.VUE_APP_WEATHER_API_KEY;

export const getLocalWeather = async ({ lat, lng }) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=imperial`;

  try {
    const { data } = await axios.get(url);
    return {
      name: data.name,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      country: data.sys.country,
    };
  } catch (error) {
    console.error(error);
  }
};

export const getPaginationLength = async (collection) => {
  const querySnapshot = await db.collection(collection).get();
  console.log("size: ", querySnapshot.size);
  return querySnapshot.size;
};

export const getAllDocuments = async (collection) => {
  const documents = await db.collection(collection).get();
  const data = documents.docs.map((doc) => {
    return { ...doc.data(), uid: doc.id, };
  });
  return data;
};

export const createDocument = async (collection, data) => {
  const newDoc = await db.collection(collection).add(data);
  return newDoc.id;
};

export const updateDocument = async (collection, id, data) => {
  await db.collection(collection).doc(id).update(data);
};

// Authentication

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
    user.password
  );
  const userCreated = {
    uid: res.user.uid,
    email: res.user.email,
    role: "USER",
  };
  return userCreated;
};
