const { getDataOnLocationPerYear, getDataOnLocation } = require('./getWeatherData')
const { validateInput } = require('./helpers')
const findValue = require('./findValue')

// Get maximum temperate for a year - Must return a number
exports.getMaxTemperature = async ({ location, year }) => {
  const condition = validateInput(location, year)
  const maxTemperature = await findValue(
    condition,
    getDataOnLocationPerYear,
    'temperature_max',
    location,
    year
  )

  return maxTemperature
}

// Get minimum temperature for a year - Must return a number
exports.getMinTemperate = async ({ location, year }) => {
  const condition = validateInput(location, year)
  const minTemperature = await findValue(
    condition,
    getDataOnLocationPerYear,
    'temperature_min',
    location,
    year
  )

  return minTemperature
}

// Get maximum temperate for all years - Must return a number
exports.getMaxTemperatureForLocation = async ({ location }) => {
  const condition = validateInput(location)
  const maxTemperature = await findValue(
    condition,
    getDataOnLocation,
    'temperature_max',
    location
  )

  return maxTemperature
}

// Get minimum temperature for all years - Must return a number
exports.getMinTemperateForLocation = async ({ location }) => {
  const condition = validateInput(location)
  const minTemperature = await findValue(
    condition,
    getDataOnLocation,
    'temperature_min',
    location
  )

  return minTemperature
}

// Get average sun hours for a year - Must return a number
exports.getAverageSunHours = async ({ location, year }) => {
  const condition = validateInput(location, year)
  const averageSunHours = await findValue(
    condition,
    getDataOnLocationPerYear,
    'sun',
    location,
    year
  )

  return averageSunHours
}

// Get average sun hours for all years - Must return a number
exports.getAverageSunHoursForLocation = async ({ location }) => {
  const condition = validateInput(location)
  const averageSunHours = await findValue(
    condition,
    getDataOnLocation,
    'sun',
    location
  )

  return averageSunHours
}
