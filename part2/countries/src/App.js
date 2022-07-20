import { useState, useEffect } from 'react'
import axios from 'axios'

const Input = ({ text, value, onChange }) => <div>{text}: <input value={value} onChange={onChange}/></div>

const Flag = ({ country }) => (
  <img 
    src={country.flags.svg} 
    alt={country.flag}
    style={{width: '100px', border: '1px solid black'}}
  />
)

const WeatherIcon = ({ code, description }) => (
  <img 
    src={`https://openweathermap.org/img/wn/${code}@2x.png`} 
    alt={description}
    style={{width: '50px', marginBottom: '-15px', filter: 'drop-shadow(2px 2px 2px gray)'}}
  />
)

const Languages = ({ languages }) => (
  <ul>
    {Object.keys(languages).map(lang => <li key={lang}>{languages[`${lang}`]}</li>)}
  </ul>
)

const CountryWeather = ({ country }) => {
  const [weatherData, setWeatherData] = useState({})
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.cca2}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => { setWeatherData(response.data) })
  }, [])
  if (weatherData.main === undefined) {
    return <div>Loading weather...</div>
  } else {
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>
          temperature: {(weatherData.main.temp - 273.15).toFixed(2)} &#8451;
          <WeatherIcon code={weatherData.weather[0].icon} description={weatherData.weather[0].description} />
        </p>
        <p>humidity: {weatherData.main.humidity}%</p>
        <p>wind: {(weatherData.wind.speed).toFixed(2)} m/s</p>
      </div>
    )
  }
}

const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name.common} {country.flag}</h2>
    <p>
      capital: {country.capital}
    <br />
      area: {country.area} km<sup>2</sup>
    </p>
    <h3>languages:</h3>
    <Languages languages={country.languages} />
    <Flag country={country} />
    <CountryWeather country={country} />
  </div>
)

const CountryListItem = ({ country, setQuery }) => (
  <div>
    {country.name.common}
    &nbsp;
    <button onClick={() => setQuery(country.name.common)}>show</button>
  </div>
)


const QueryCountry = ({ countryData, query, setQuery }) => {
  if (Object.keys(countryData).length === 0) {
    return <div>Loading...</div>
  } else if (query === '') {
    return <div>Search for a country</div>
  } else {
    const filtered_countries = countryData.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
    if (Object.keys(filtered_countries).length === 0) {
      return <div>No countries found</div>
    } else if (Object.keys(filtered_countries).length > 10) {
      return <div>Too many matches, specify another filter</div>
    } else if (Object.keys(filtered_countries).length === 1) {
      return <CountryInfo country={filtered_countries[0]} />
    } else {
      return filtered_countries.map(country => <CountryListItem key={country.name.common} country={country} setQuery={setQuery} />)
    }
  }
}

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const handleSearchCountryChange = (event) => {
    setSearchCountry(event.target.value)
  }
  const [countryData, setCountryData] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  return (
    <div>
      <Input text="find countries" value={searchCountry} onChange={handleSearchCountryChange} />
      <QueryCountry countryData={countryData} query={searchCountry} setQuery={setSearchCountry} />
    </div>
  )
}


export default App
