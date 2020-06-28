const validLocationInput = location =>
  /oxford/.test(location.toLowerCase()) || /heathrow/.test(location.toLowerCase())

const validYearInput = year => year === '' ? false : /^\d+$/.test(year)

const validateInput = (location, year) =>
  year === undefined
    ? validLocationInput(location)
    : validLocationInput(location) && validYearInput(year)

const resultsArray = (data, key) => data.reduce((array, el) => {
  const condition = el => el[key] !== null && el[key] !== undefined
  const yearsData = []

  if (el.length) {
    el.map(e => {
      if (condition(e)) yearsData.push(e[key])
    })
  } else {
    if (condition(el)) return [...array, el[key]]
  }

  return [...array, ...yearsData]
}, [])

module.exports = {
  validateInput,
  resultsArray
}