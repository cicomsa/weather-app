const { resultsArray } = require('../src/helpers')
const dataOnLocationPerYear = require('../src/mockData/dataOxford2018.json')
const dataOnLocation = require('../src/mockData/dataOxford')

describe('resultsArray', () => {
  it('Successfully returns the results array based on matching key - 1D array', async () => {
    const key = 'temperature_max'
    const expectedResult = [
      8.9, 6.4, 9.1, 14.2,
      19.9, 22.8, 27.4, 23.4,
      20.4, 15.6, 11.7, 10.2
    ]

    const data = dataOnLocationPerYear.result
    const result = resultsArray(data, key)

    expect(result).toEqual(expectedResult)
  })
  it('Successfully returns the results array based on matching key - 2D array', async () => {
    const key = 'temperature_min'
    const data2 = dataOnLocation.slice(0, 2)
    const expectedResult = [
      3, 0.9, 1.2, 6.1, 6.5, 9.6,
      13.1, 13, 8.6, 6.6, 3.6, 0.8,
      -2, 4.7, 3.9, 5.6, 8.2, 10.8,
      12.8, 11.7, 11.5, 8, 4.4, 2.5
    ]

    const result = resultsArray(data2, key)

    expect(result).toEqual(expectedResult)
  })
  it('Successfully returns the results array based on matching key and excludes null values', async () => {
    const key = 'temperature_max'
    const expectedResult = [
      6.4, 9.1, 14.2,
      19.9, 22.8, 27.4, 23.4,
      20.4, 15.6, 11.7, 10.2
    ]

    const data = dataOnLocationPerYear.result
    data[0][key] = null
    const result = resultsArray(data, key)

    expect(result).toEqual(expectedResult)
  })
  it('Successfully returns the results array based on matching key and excludes undefined values', async () => {
    const key = 'temperature_max'
    const expectedResult = [
      6.4, 9.1, 14.2,
      19.9, 22.8, 27.4, 23.4,
      20.4, 15.6, 11.7, 10.2
    ]

    const data = dataOnLocationPerYear.result
    delete data[0][key]
    const result = resultsArray(data, key)

    expect(result).toEqual(expectedResult)
  })
})
