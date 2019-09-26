'use strict'
const Env = use('Env')
const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request }) {
    const { shop } = request.all()
    const categories = await Category.query().where({'shop': shop}).fetch()
    return categories
  }

  async create ({ auth, request }) {
    const user = await auth.getUser()
    if (user.openid == Env.get('ADMIN')){
      const { shop, name, tag, icon } = request.all()
      await Category.create({
        shop,
        name,
        tag,
        icon
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

module.exports = CategoryController
