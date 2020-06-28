const { resultsArray } = require('./helpers')

const findValue = async (condition, getData, key, location, year, test) => {
  let result = 0

  if (condition) {
    const returnedData = year
      ? await getData(location, year)
      : await getData(location)

    const { data, error } = returnedData

    if (error) {
      if (test === undefined) {
        console.log(`Data not found for the requested values: location ${location} and year ${year}`)
      }
      return result
    }

    const results = resultsArray(data, key)

    switch (key) {
      case 'temperature_max':
        result = Math.max(...results)
        break
      case 'temperature_min':
        result = Math.min(...results)
        break
      case 'sun':
        const averages = results.length
          ? results.reduce((a, b) => a + b) / results.length
          : 0
        result = averages !== 0 ? Number(averages.toFixed(1)) : 0
        break
    }

    return result
  }

  if (test === undefined) {
    switch (true) {
      case location === '':
        console.log(`Location data is empty: location value is required.`)
        break
      case year === '':
        console.log(`Year data is empty: year value is required.`)
        break
      case year === undefined:
        console.log(`Invalid input data: location ${location}.`)
        break
      default:
        console.log(`Invalid input data: location ${location} and year ${year}.`)
    }
  }

  return result
}

module.exports = findValue