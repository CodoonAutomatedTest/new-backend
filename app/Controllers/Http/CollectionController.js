'use strict'

const Collection = use('App/Models/Collection')
const Feed = use('App/Models/Feed')

class CollectionController {
  async index({auth, request}){
    const user = await auth.getUser()
    const {page} = request.all()
    if (page > 0){
      return await user.collections().offset(20*(page - 1)).limit(20).fetch()
    }
    return await user.collections().fetch()
  }

  async create({ auth, request }){
    const user = await auth.getUser()
    const feed = request.all()
    await Collection.create({
      user_id: user.id,
      feed_id: feed.id,
      avatar: feed.avatar, 
      desc: feed.description,
      type: feed.type
    })
    await Feed.query().where('id', feed.id).increment('like', 1)
    return await user.collections().fetch()
  }

  async destroy({ auth, request }){
    const user = await auth.getUser()
    const feed = request.all()
    await user.collections().where('feed_id', feed.id).delete()
    await Feed.query().where('id', feed.id).decrement('like', 1)
    return await user.collections().fetch()
  }
}

module.exports = CollectionController
