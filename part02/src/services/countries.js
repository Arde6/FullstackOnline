import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    return axios.get(baseUrl + '/all')
} 

const getOne = (name) => {
    console.log('fetching from: ' + baseUrl + '/name/' + name)
    return axios.get(baseUrl + '/name/' + name)
}

const getWeather = (lat, lon) => {
    return axios.get('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto')
}

export default {
    getAll,
    getOne,
    getWeather
}