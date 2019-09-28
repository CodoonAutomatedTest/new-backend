'use strict'

class ScoreController {
  async index ({auth}) {
    const user = await auth.getUser()
    const flow = await user.scores().fetch()
    return flow
  }
}

module.exports = ScoreController
