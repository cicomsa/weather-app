const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const { getDataOnLocationPerYear, getDataOnLocation } = require('../src/getWeatherData')
const dataOnLocationPerYear = require('../src/mockData/dataOxford2018.json')
const dataOnLocation = require('../src/mockData/dataOxford')
const yearsOxford = require('../src/mockData/yearsOxford.json')

const mock = new MockAdapter(axios)

jest.setTimeout(60000)

const error = {
  error: 'Location oxfor not found'
}

beforeEach(() => {
  mock.restore()
})

describe('getDataOnLocationPerYear', () => {
  it('Successfully gets data per location and year', async done => {
    const location = 'oxford'
    const year = 2018

    const returnedData = {}
    returnedData.data = dataOnLocationPerYear.result
    returnedData.statusCode = 200
    mock.onGet(`${process.env.API_URL}/${location}/year/${year}`).reply(200, dataOnLocationPerYear)

    const result = await getDataOnLocationPerYear(location, year)

    expect(result).toEqual(returnedData)

    expect(result).toHaveProperty('data')
    expect(result.data.length).toEqual(12)
    expect(result.data[0]).toHaveProperty('temperature_max')
    expect(result.data[0]).toHaveProperty('temperature_min')
    expect(result.data[0]).toHaveProperty('sun')

    expect(result).toHaveProperty('statusCode')
    expect(result.statusCode).toEqual(200)

    expect(result).not.toHaveProperty('error')

    done()
  })
  it('Does not get data per location - year not found', async done => {
    const location = 'oxford'
    const year = 1800

    mock.onGet(`${process.env.API_URL}/${location}/year/${location}}`).reply(404, error)

    const result = await getDataOnLocationPerYear(location, year, true, true)

    expect(result).not.toHaveProperty('data')

    expect(result).toHaveProperty('statusCode')
    expect(result.statusCode).not.toEqual(200)

    expect(result).toHaveProperty('error')
    done()
  })
})

describe('getDataOnLocation', () => {
  it('Successfully gets data per location', async done => {
    const location = 'oxford'
    const year = 2018

    const returnedData = {}
    returnedData.data = dataOnLocation
    returnedData.statusCode = 200
    mock.onGet(`${process.env.API_URL}/${location}/years}`).reply(200, yearsOxford)

    const result = await getDataOnLocation(location, true)
    expect(result).toEqual(returnedData)

    expect(result.data.length).toEqual(9)
    expect(result.data[0][0].year).toEqual(1944)
    expect(result.data[0][0]).toHaveProperty('temperature_max')
    expect(result.data[0][0]).toHaveProperty('temperature_min')
    expect(result.data[0][0]).toHaveProperty('sun')

    expect(result).toHaveProperty('statusCode')
    expect(result.statusCode).toEqual(200)

    expect(result).not.toHaveProperty('error')
    done()
  })
  it('Does not get data per location - location not found', async done => {
    const location = 'oxfor'
    const year = 2018

    mock.onGet(`${process.env.API_URL}/${location}/years}`).reply(404, error)

    const result = await getDataOnLocation(location, true, true)

    expect(result).not.toHaveProperty('data')

    expect(result).toHaveProperty('statusCode')
    expect(result.statusCode).not.toEqual(200)

    expect(result).toHaveProperty('error')

    done()
  })
})