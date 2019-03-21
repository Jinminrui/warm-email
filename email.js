const nodemailer = require('nodemailer') //发送邮件的node插件
const ejs = require('ejs') //ejs模版引擎
const fs = require('fs') //文件读写
const path = require('path') //路径配置
const schedule = require('node-schedule') //定时器任务库
const date = require('./util/date')
const weather = require('./spider/weather')
const one = require('./spider/one')

/**
 * 发送邮件
 * @param {*} data
 */
function sendEmail(htmlData) {
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, 'views/index.ejs'), 'utf8')
  )
  const html = template(htmlData)

  let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secureConnection: true,
    auth: {
      user: '969172689@qq.com',
      pass: 'kfddcwvwoglrbeii'
    }
  })

  let mailOptions = {
    from: '"Keen King" <969172689@qq.com>',
    to:
      'woshitxbc@163.com, 1461886758@qq.com, 925740536@qq.com, 1768347569@qq.com',
    subject: '一封暖暖的小邮件(来自老金）',
    html: html
  }

  transporter.sendMail(mailOptions, (error, info = {}) => {
    if (error) {
      //   console.log(error)
    }
    // console.log('邮件发送成功', info.messageId)
  })
}

function getAllDataAndsendEmail() {
  let htmlData = {}
  htmlData.todaystr = date.getDate()

  Promise.all([
    one.getOneData(),
    weather.getWeatherTips(),
    weather.getWeatherData()
  ])
    .then(function(data) {
      htmlData['todayOneData'] = data[0]
      htmlData['weatherTip'] = data[1]
      htmlData['threeDaysData'] = data[2]
      sendEmail(htmlData)
    })
    .catch(function(err) {
      //   console.log('获取数据失败： ', err)
    })
}

let rule = new schedule.RecurrenceRule()
rule.dayOfWeek = [0, new schedule.Range(1, 6)]
rule.hour = 8
rule.minute = 30

schedule.scheduleJob(rule, function() {
  getAllDataAndsendEmail()
})
