'use strict'

const Article = use('App/Models/Article')
const Env = use('Env')

class ArticleController {
  async index ({ request }) {
    const {count, shop} = request.all()
    const articles = await Article.query().where({'shop': shop}).limit(count).fetch()
    return articles
  }

  async create ({ auth, request }) {
    let user = await auth.getUser()
    const { shop, title, avatar, description, href, time, rate, status } = request.all()
    if (user.openid == Env.get('ADMIN')) {
      await Article.create({
        shop,
        title,
        avatar,
        description,
        href,
        time,
        rate,
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

module.exports = ArticleController
