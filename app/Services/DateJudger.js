class DateJudger{
  compare(date1, date2) {
    var dateStart = new Date(date1);
    var dateEnd = new Date(date2);
    var difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
    return difValue > 0 ? true : false
  }
}

module.exports = new DateJudger();