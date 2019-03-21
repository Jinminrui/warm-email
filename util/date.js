function getDate() {
  var htmlData = {}

  let today = new Date()
  let todaystr =
    today.getFullYear() +
    ' / ' +
    (today.getMonth() + 1) +
    ' / ' +
    today.getDate()
  return todaystr
}

module.exports = {
  getDate
}
