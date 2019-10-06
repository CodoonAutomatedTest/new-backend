'use strict'

const PrizePool = use('App/Models/PrizePool')

class PrizePoolController {
  async create({auth, request}) {
    const user = await auth.getUser()
    const {code, name, avatar, head, prob, num} = request.all()
    return await PrizePool.create({
      code,
      name,
      avatar,
      head,
      prob,
      num
    })
  }
}

module.exports = PrizePoolController
