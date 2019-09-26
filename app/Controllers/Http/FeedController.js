'use strict'

const Feed = use('App/Models/Feed')

class FeedController {
  async type ({ auth, request, response }) {
    const user = await auth.getUser()
    const { type, page } = request.all()
    const feeds = await Feed.query().where('type', type).offset(20*(page - 1)).limit(20).fetch()
    return feeds
  }

  async create ({ request, response }) {
    const {type, avatar, like, description} = request.all()
    return await Feed.create({
      type,
      avatar,
      like,
      description
    })
  }
}

module.exports = FeedController
