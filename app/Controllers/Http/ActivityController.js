'use strict'

const Activity = use('App/Models/Activity')
const Env = use('Env')

class ActivityController {
  async index ({ request }) {
    const {count, shop} = request.all()
    const activities = await Activity.query().where({'shop': shop}).limit(count).fetch()
    return activities
  }

  async create ({ auth, request }) {
    let user = await auth.getUser()
    const { shop, title, avatar, href, status } = request.all()
    if (user.openid == Env.get('ADMIN')) {
      await Activity.create({
        shop,
        title,
        avatar,
        href,
        status
      })
      return {
        message: "it's created"
      }
    }
    return {
      message: "invaild user"
    }
  }
}

module.exports = ActivityController
