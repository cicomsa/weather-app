

const axios = require('axios')
const dotenv = require('dotenv')

const {
  mockGetDataOnLocationPerYear,
  mockGetDataOnLocation
} = require('./mockContent')

dotenv.config()

const headers = {
  'x-api-key': process.env.API_KEY
}

const getDataOnLocationPerYear = async (location, year, jest, jestError) => {
  const url = `${process.env.API_URL}/${location}/year/${year}`

  try {
    // API DATA CONTENT - uncomment lines 22 - 30 and comment line 33
    // const response = await axios.get(url, { headers })
    // const { result, error } = response.data

    // if (error) {
    //   console.log(
    //     `Error retrieving data on location ${location} and year ${year}: ${error}`
    //   )
    //   return ({ error, statusCode: 404 })
    // }

    // MOCK DATA CONTENT - uncomment line 33 and comment lines 22 - 30
    const { result } = mockGetDataOnLocationPerYear(year, jest, jestError)

    const returnData = result
      ? ({ data: result, statusCode: 200 })
      : ({ error, statusCode: 404 })

    return returnData
  } catch (error) {
    if (jest === undefined) {
      console.log(
        `Error retrieving data on location ${location} and year ${year}: ${error}`
      )
    }

    return ({ error, statusCode: 400 })
  }
}

const getDataOnLocation = async (location, jest, jestError) => {
  const url = `${process.env.API_URL}/${location}/years`
  let results = []

  try {
    // API DATA CONTENT - uncomment lines 57 - 63 and 68, and comment lines 71 (see lines 65-67 notes first)
    // const response = await axios.get(url, { headers })
    // const { result, error } = response.data

    // if (error) {
    //   console.log(`Error retrieving data on location ${location}: ${error}`)
    //   return ({ error, statusCode: 404 })
    // }

    // For tests to pass OR to avoid making too many calls for data per year, 
    // use { startYear, endYear } from MOCK DATA CONTENT instead:
    // Action: uncomment line 71 and keep line 68 commented
    // const { startYear, endYear } = result

    // MOCK DATA CONTENT - uncomment line 71 and comment lines 57 - 63 and 68
    const { startYear, endYear, dataJest } = mockGetDataOnLocation(jestError)

    for (let i = startYear; i <= endYear; i++) {
      // API DATA - uncomment line 75 and comment line 77
      // const { data, error } = await getDataOnLocationPerYear(location, i, jest)
      // MOCK DATA - uncomment line 77 and comment line 75
      const { data, error } = await getDataOnLocationPerYear(location, i, dataJest)
      if (!error) results.push(data)
    }

    const returnData = results.length
      ? ({ data: results, statusCode: 200 })
      : ({ error: 'Data not found', statusCode: 404 })

    return returnData
  } catch (error) {
    if (test === undefined) {
      console.log(`Error retrieving data on location ${location}: ${error}`)
    }
    return ({ error, statusCode: 400 })
  }
}

module.exports = {
  getDataOnLocationPerYear,
  getDataOnLocation
}