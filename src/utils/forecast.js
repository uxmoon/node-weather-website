const request = require("request");

const forecast = (latitude, longitude, callback) => {

  const url = `http://api.weatherstack.com/current?access_key=487d2a6e27f88441ffb7673320386ce1&query=${latitude},${longitude}&units=m`;

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback("Unable to connect to services", undefined)
    } else if(body.error) {
      callback("Unable to find location")
    } else {
      console.log(body.current)
      callback(undefined, `${body.current.weather_descriptions[0]}. current temperature is ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`)
    }
  })

}

module.exports = forecast;