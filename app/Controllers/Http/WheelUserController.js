'use strict'

const WheelUser = use('App/Models/WheelUser')
const PrizePool = use('App/Models/PrizePool')
const DateGenerator = use('App/Services/DateGenerator')
const DateJudger = use('App/Services/DateJudger')

class WheelUserController {
  async join({ auth, request }) {
    const { nickName, avatarUrl } = request.all()
    const user = await auth.getUser()
    const wheelUser = await WheelUser.findBy({'user_id': user.id})
    const last_login = DateGenerator.getNowFormatDate()
    if (!wheelUser) {
      return await WheelUser.create({
        user_id: user.id,
        openid: user.openid,
        nickName: nickName,
        avatarUrl: avatarUrl,
        count: 2,
        last_login: last_login
      })
    }
    let flag = DateJudger.compare(wheelUser.last_login, last_login)
    if(flag){
      wheelUser.count = 2
      wheelUser.last_login = last_login
      wheelUser.save()
    }
    return wheelUser
  }

  async lottery({ auth, request }) {
    const user = await auth.getUser()
    const account = request.all()
    if (user.id !== account.user_id) {
      return {
        message: 'invaild user'
      }
    }
    const wheelUser = await WheelUser.findBy({'user_id': user.id})
    wheelUser.count -= 1
    wheelUser.save()
    return wheelUser
  }

  async prize({ auth, request, response }) {
    const {Probability} = require('../../Services/Probability')
    const user = await auth.getUser()
    const pools = await PrizePool.all()
    var probability = new Probability(pools.toJSON())
    return probability.init()
  }
}

module.exports = WheelUserController
