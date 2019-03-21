const superagent = require('superagent')
const cheerio = require('cheerio')

const URL = 'http://wufazhuce.com/'

/**
 * 获取《One·一个》的每日图文
 */
function getOneData() {
  let p = new Promise((resolve, reject) => {
    superagent
      .get(URL)
      .then(res => {
        let $ = cheerio.load(res.text)
        let selectItem = $('#carousel-one .carousel-inner .item')
        let todayOne = selectItem[0]
        let todayOneData = {
          imgUrl: $(todayOne)
            .find('.fp-one-imagen')
            .attr('src'),
          type: $(todayOne)
            .find('.fp-one-imagen-footer')
            .text()
            .replace(/(^\s*)|(\s*$)/g, ''),
          text: $(todayOne)
            .find('.fp-one-cita')
            .text()
            .replace(/(^\s*)|(\s*$)/g, '')
        }
        resolve(todayOneData)
      })
      .catch(err => {
        // console.log(err)
      })
  })
  return p
}

module.exports = {
  getOneData
}
