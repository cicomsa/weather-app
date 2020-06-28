const {
  mockGetDataOnLocationPerYear,
  mockGetDataOnLocation
} = require('../src/mockContent')

const mockDataOnLocationAllYears = require('../src/mockData/dataOxfordAllYears.json')
const mockDataOnLocationPerYear = require('../src/mockData/dataOxford2018.json')
const yearsMockData = require('../src/mockData/yearsOxford.json')

describe('mockGetDataOnLocationPerYear', () => {
  it('Returns error if testError value exists -> ', async () => {
    const test = true
    const year = 2000
    const testError = true
    const expected = { error: 'Data not found', statusCode: 404 }

    const result = mockGetDataOnLocationPerYear(year, test, testError)

    expect(result).toEqual(expected)
  })
  it('Returns mockDataOnLocationAllYears if test value exists -> ', async () => {
    const test = true
    const year = 2000

    const result = mockGetDataOnLocationPerYear(year, test)

    expect(result).toEqual(mockDataOnLocationAllYears[year])
  })
  it('Returns mockDataOnLocationPerYear if test value does not exist -> ', async () => {
    const year = 2000

    const result = mockGetDataOnLocationPerYear(year)

    expect(result).toEqual(mockDataOnLocationPerYear)
  })
})

describe('mockGetDataOnLocation', () => {
  it('Returns error if testError value exists -> ', async () => {
    const testError = true
    const expected = { error: 'Data not found', statusCode: 404 }

    const result = mockGetDataOnLocation(testError)

    expect(result).toEqual(expected)
  })
  it('Returns mockDataOnLocationAllYears if testError value does not exist -> ', async () => {
    const result = mockGetDataOnLocation()

    expect(result).toEqual(yearsMockData.result)
  })
})
