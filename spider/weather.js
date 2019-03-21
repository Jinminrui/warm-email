const superagent = require('superagent')
const cheerio = require('cheerio')

const LOCAL = 'jiangsu/nanjing'
const URL = 'https://tianqi.moji.com/weather/china/' + LOCAL

/**
 * 获取天气提醒
 */
function getWeatherTips() {
  let p = new Promise((resolve, reject) => {
    superagent
      .get(URL)
      .then(res => {
        let weatherTip = ''
        let $ = cheerio.load(res.text)
        $('.wea_tips').each(function(i, el) {
          weatherTip = $(el)
            .find('em')
            .text()
        })
        resolve(weatherTip)
      })
      .catch(err => {
        // console.log(err.message)
      })
  })
  return p
}

/**
 * 获取天气数据
 */
function getWeatherData() {
  let p = new Promise((resolve, reject) => {
    superagent
      .get(URL)
      .then(res => {
        let $ = cheerio.load(res.text)
        let threeDaysWeather = []
        $('.forecast .days').each((i, el) => {
          const day = $(el).find('li')
          const singleDayData = {}
          singleDayData.whichDay = $(day[0])
            .text()
            .trim()
          singleDayData.weatherImgUrl = $(day[1])
            .find('img')
            .attr('src')
          singleDayData.weather = $(day[1])
            .text()
            .trim()
          singleDayData.temperature = $(day[2])
            .text()
            .trim()
          singleDayData.windDirection = $(day[3])
            .find('em')
            .text()
            .trim()
          singleDayData.windLevel = $(day[3])
            .find('b')
            .text()
            .trim()
          singleDayData.pollution = $(day[4])
            .text()
            .trim()
          threeDaysWeather.push(singleDayData)
        })
        resolve(threeDaysWeather)
      })
      .catch(err => {
        // console.log(err.message)
      })
  })
  return p
}

module.exports = {
  getWeatherData,
  getWeatherTips
}
