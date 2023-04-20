export default async function getWeather(req,res) {
    const key = process.env.WEATHER_API_KEY
    const { city } = req.query // get the city from the query string
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
}