const mockDataOnLocationAllYears = require('./mockData/dataOxfordAllYears.json')
const mockDataOnLocationPerYear = require('./mockData/dataOxford2018.json')
const yearsMockData = require('./mockData/yearsOxford.json')

const mockGetDataOnLocationPerYear = (year, test, testError) => {
  if (testError !== undefined) {
    return ({ error: 'Data not found', statusCode: 404 })
  }

  return test !== undefined
    ? mockDataOnLocationAllYears[year]
    : mockDataOnLocationPerYear
}

const mockGetDataOnLocation = testError => {
  if (testError !== undefined) {
    return ({ error: 'Data not found', statusCode: 404 })
  }

  return yearsMockData.result
}

module.exports = {
  mockGetDataOnLocationPerYear,
  mockGetDataOnLocation
}