function Probability (obj) {
  this.obj = obj
}
  
// 获取几率总和
Probability.prototype.sum = function (key) {
  var obj = this.obj
  var sum = 0
  for (var i in obj) {
    sum += obj[i][key]
  }
  return sum
}

// 取得结果
Probability.prototype.init = function () {
  var result = ""
  var obj = this.obj
  var sum = this.sum('prob') // 几率总和
  for (var i in obj) {
    var rand = parseInt(Math.random() * sum)
    if (rand <= obj[i].prob && obj[i].num > 0) {
      result = obj[i]
      break
    } else {
      sum -= obj[i].prob
    }
  }
  return result
}
  
exports.Probability = Probability;
