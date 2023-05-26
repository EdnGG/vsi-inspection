import axios from 'axios';

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
    console.error(error.message);
  }
};
