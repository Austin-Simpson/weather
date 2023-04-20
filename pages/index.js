import styled from 'styled-components'
import { useState } from "react"
import Forecast from '../components/Forecast'
import useSWR, { SWRConfig } from 'swr'
import Spinner from '../components/Spinner'

const cities = [
  'Los Angeles',
  'London',
  'New York City',
  'Paris',
  'Buenos Aires'
]

const fetcher = url => fetch(url).then(r => r.json())

export default function Home({ fallback }) {
  const [city, setCity] = useState("Los Angeles")
  const { data, error } = useSWR(`/api/weather/${city}`, fetcher)  
  return (
    <SWRConfig value={{ fallback }}>
      <Wrapper>
      <Cities>
        { cities.map(c => (
          <Button selected={c === city} key={c} onClick={() => setCity(c)}>{c}</Button>
        ))}
      </Cities>
      <ForecastWrapper>
        <Forecast data={data}/>
      </ForecastWrapper>
      </Wrapper>
    </SWRConfig>)
}

export async function getServerSideProps(context) {
  // get api key from .env.local
  const key = process.env.WEATHER_API_KEY
  const city = cities[0]
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
  // wait for the fetch to resolve and then return the data
  // this will be a response object
  const response = await fetch(url)
  // turn the resopnse into JSON
  const data = await response.json()
  return {
    props: {data}
  }
}

const Cities = styled.div`
  padding-top: 25px;
  display: flex;
  gap: 10px;
  justify-content: center;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ForecastWrapper = styled.div`
  flex: 1;
  margin: 50px;
  margin-top: 25px;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 5px;
  border-bottom: 2px solid ${(p) => p.selected? 'black' : 'transparent'} ;
`