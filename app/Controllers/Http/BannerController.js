'use strict'

const Banner = use('App/Models/Banner')
const Env = use('Env')

class BannerController {
  async index ({ request }) {
    const { shop } = request.all()
    const banners = await Banner.query().where({'shop': shop}).fetch()
    return banners
  }

  async create ({ auth, request }) {
    let user = await auth.getUser()
    const { shop, avatar, href, description } = request.all()
    if (user.openid == Env.get('ADMIN')) {
      await Banner.create({
        shop,
        avatar,
        href,
        description
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

module.exports = BannerController
