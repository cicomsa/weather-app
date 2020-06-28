const findValue = require('../src/findValue')
const dataOnLocationPerYear = require('../src/mockData/dataOxford2018.json')

const validateInput = jest.spyOn(require('../src/helpers'), 'validateInput')
const getDataOnLocationPerYear = jest.spyOn(require('../src/getWeatherData'), 'getDataOnLocationPerYear')

const returnedData = {}
returnedData.data = dataOnLocationPerYear.result

const test = true

beforeEach(() => {
  validateInput.mockClear()
  getDataOnLocationPerYear.mockClear()
})

describe('findValue', () => {
  it('Successfully finds value based on key - temperature_max - oxford 2018', async () => {
    const location = 'oxford'
    const year = 2018

    const mockValidateInput = validateInput.mockImplementation((location, year) => true)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => returnedData)
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'temperature_max',
      location,
      year,
    )

    expect(result).toEqual(27.4)
  })
  it('Successfully finds value based on key - temperature_in - oxford 2018', async () => {
    const location = 'oxford'
    const year = 2018

    const mockValidateInput = validateInput.mockImplementation((location, year) => true)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => returnedData)
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'temperature_min',
      location,
      year
    )

    expect(result).toEqual(0.3)
  })
  it('Successfully finds value based on key - sun - oxford 2018', async () => {
    const location = 'oxford'
    const year = 2018

    const mockValidateInput = validateInput.mockImplementation((location, year) => true)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => returnedData)
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'sun',
      location,
      year,
      test
    )

    expect(result).toEqual(147.9)
  })
  it('Returns 0 if location data is not found', async () => {
    const location = 'oxfor'
    const year = 2018

    const mockValidateInput = validateInput.mockImplementation((location, year) => true)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => ({ error: 'Location oxfor not found', statusCode: 404 }))
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'sun',
      location,
      year,
      test
    )

    expect(result).toEqual(0)
  })
  it('Returns 0 if location value is empty string', async () => {
    const location = ''
    const year = 2018

    const mockValidateInput = validateInput.mockImplementation((location, year) => false)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => { })
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'sun',
      location,
      year,
      test
    )

    expect(result).toEqual(0)
  })
  it('Returns 0 if year value is empty string', async () => {
    const location = 'oxford'
    const year = ''

    const mockValidateInput = validateInput.mockImplementation((location, year) => false)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => { })
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'sun',
      location,
      year,
      test
    )

    expect(result).toEqual(0)
  })
  it('Returns 0 if year value is undefined', async () => {
    const location = 'oxford'
    const year = undefined

    const mockValidateInput = validateInput.mockImplementation((location, year) => false)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => { })
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'sun',
      location,
      year,
      test
    )

    expect(result).toEqual(0)
  })
  it('Returns 0 if location and year values are invalid', async () => {
    const location = 'oxfor'
    const year = 'qwe'

    const mockValidateInput = validateInput.mockImplementation((location, year) => false)
    const getMockDataOnLocationPerYear = getDataOnLocationPerYear.mockImplementation(() => { })
    const condition = mockValidateInput(location, year)

    const result = await findValue(
      condition,
      getMockDataOnLocationPerYear,
      'sun',
      location,
      year,
      test
    )

    expect(result).toEqual(0)
  })
})
