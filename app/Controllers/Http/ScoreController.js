'use strict'

const User = use('App/Models/User')
const DateGenerator = use('App/Services/DateGenerator')

class ScoreController {
  async index ({auth}) {
    const user = await auth.getUser()
    const flow = await user.scores().orderBy('current', 'desc').fetch()
    return flow
  }

  async deal ({request, response}) {
    const {id, score} = request.all()
    let currentDate = DateGenerator.getNowFormatDate()
    const user = await User.findBy({'id': id})
    user.score += parseInt(score)
    user.save()
    return await Score.create({user_id: id, 'current': currentDate, value:parseInt(score) , info: '消费积分'})
  }
}

module.exports = ScoreController
