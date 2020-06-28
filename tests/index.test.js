
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const {
  getMaxTemperature,
  getMinTemperate,
  getMaxTemperatureForLocation,
  getMinTemperateForLocation,
  getAverageSunHours,
  getAverageSunHoursForLocation
} = require('../src/index')
const dataOnLocationPerYear = require('../src/mockData/dataOxford2018.json')
const yearsMockData = require('../src/mockData/yearsOxford.json')

const mock = new MockAdapter(axios)

const location = 'oxford'
const year = 2018

beforeEach(() => {
  mock.restore()
})

jest.setTimeout(60000)

describe('getMaxTemperature', () => {
  it('Successfully gets the max temperature for oxford 2018', async done => {
    const data = dataOnLocationPerYear
    mock.onGet(`${process.env.API_URL}/${location}/year/${year}`).reply(200, data)

    const result = await getMaxTemperature({ location, year })
    expect(result).toEqual(27.4)
    done()
  })
})

describe('getMinTemperature', () => {
  it('Successfully gets the min temperature for oxford 2018', async done => {
    const data = dataOnLocationPerYear
    mock.onGet(`${process.env.API_URL}/${location}/year/${year}`).reply(200, data)

    const result = await getMinTemperate({ location, year })
    expect(result).toEqual(0.3)
    done()
  })
})

describe('getMaxTemperatureForLocation', () => {
  it('Successfully gets the max temperature for oxford - all years', async done => {
    yearsMockData.result.test = true
    const data = yearsMockData.result
    mock.onGet(`${process.env.API_URL}/${location}/years`).reply(200, data)

    const result = await getMaxTemperatureForLocation({ location, year })
    expect(result).toEqual(25.8) // years: 1944 - 1952
    // expect(result).toEqual(27.4) // years: 1853 - 2018
    done()
  })
})

describe('getMinTemperateForLocation', () => {
  it('Successfully gets the min temperature for oxford - all years', async done => {
    const data = yearsMockData.result
    mock.onGet(`${process.env.API_URL}/${location}/years`).reply(200, data)

    const result = await getMinTemperateForLocation({ location, year })
    expect(result).toEqual(-4.4) // years: 1944 - 1952
    // expect(result).toEqual(-5.8) // years: 1853 - 2018
    done()
  })
})

describe('getAverageSunHours', () => {
  it('Successfully gets the average sun hours for oxford 2018', async done => {
    const data = dataOnLocationPerYear
    mock.onGet(`${process.env.API_URL}/${location}/year/${year}`).reply(200, data)

    const result = await getAverageSunHours({ location, year })
    expect(result).toEqual(147.9)
    done()
  })
})

describe('getAverageSunHoursForLocation', () => {
  it('Successfully gets the average sun hours for oxford - all years', async done => {
    const data = yearsMockData.result
    mock.onGet(`${process.env.API_URL}/${location}/years`).reply(200, data)

    const result = await getAverageSunHoursForLocation({ location, year })

    expect(result).toEqual(127.2) // years: 1944 - 1952
    // expect(result).toEqual(128.1) // years: 1853 - 2018
    done()
  })
})
