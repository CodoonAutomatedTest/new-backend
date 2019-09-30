'use strict'

const Helper = use('App/Models/Helper')
const User = use('App/Models/User')
const Score = use('App/Models/Score')
const DateGenerator = use('App/Services/DateGenerator')

class HelperController {
  async create({auth, request}) {
    const user = await auth.getUser()
    const {toUser, fromUser } = request.all()
    const current = DateGenerator.getNowFormatDate()
    const helper = await Helper.findBy({
      'to_user': toUser,
      'from_user': fromUser,
      'date': current
    })
    if(!helper) {
      await Helper.create({
        'to_user': toUser,
        'from_user': fromUser,
        'date': current
      })
      const account = await User.findBy({'user_id': toUser})
      account.score += 1
      account.save()
      await Score.create({user_id: account.id, 'current': current, value:1, info: '好友助力'})
      return {
        message: '助力成功！'
      }
    }
    return {
      message: '你今天已经助力过了～'
    }
  } 
}

module.exports = HelperController
