import axios from 'axios';
import { db, storage, auth } from '../firebase';

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

export const getAllDocuments = async (collection) => {
  const documents = await db.collection(collection).get();
  const data = documents.docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
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
