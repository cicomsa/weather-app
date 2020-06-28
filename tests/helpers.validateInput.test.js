const { validateInput } = require('../src/helpers')

describe('validateInput', () => {
  it('Successfully validates location and year inputs values -> ', async () => {
    const location = 'oxford'
    const year = 2018

    const result = validateInput(location, year)

    expect(result).toEqual(true)
  })
  it('Successfully validates location input value when year value equals empty string and is not used -> ', async () => {
    const location = 'oxford'
    const year = ''

    const result = validateInput(location)

    expect(result).toEqual(true)
  })
  it('Does not validate location and year inputs values succesfully - year invalid value', async () => {
    const location = 'oxford'
    const year = '2s018'

    const result = validateInput(location, year)

    expect(result).toEqual(false)
  })
  it('Does not validate location and year inputs value succesfully - location invalid value', async () => {
    const location = '123j'
    const year = 2018

    const result = validateInput(location, year)

    expect(result).toEqual(false)
  })
  it('Does not validate location and year inputs values succesfully - location value is empty', async () => {
    const location = ''
    const year = 2018

    const result = validateInput(location, year)

    expect(result).toEqual(false)
  })
  it('Does not validate location and year inputs values succesfully - year value is empty', async () => {
    const location = 'oxford'
    const year = ''

    const result = validateInput(location, year)

    expect(result).toEqual(false)
  })
})
