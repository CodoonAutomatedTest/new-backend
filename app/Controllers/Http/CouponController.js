'use strict'

const Coupon = use('App/Models/Coupon')
const User = use('App/Models/User')
const PrizePool = use('App/Models/PrizePool')
const DateGenerator = use('App/Services/DateGenerator')

class CouponController {
  async index({auth}){
    const user = await auth.getUser()
    let currentDate = DateGenerator.getNowFormatDate()
    await user.coupons().where('deadline', '<=', currentDate).andWhere('status', 0).update({ status: '2' })
    return {
      unused: await user.coupons().where('status', 0).whereNot('name', '继续加油').fetch(),
      used: await user.coupons().where('status', 1).whereNot('name', '继续加油').fetch(),
      expired: await user.coupons().where('status', 2).whereNot('name', '继续加油').fetch()
    }
  }

  async query({ request, response }){
    const { coupon_id } = request.all()
    let currentDate = DateGenerator.getNowFormatDate()
    const coupon = await Coupon.query().where('number', coupon_id).andWhere('deadline', '>=', currentDate).fetch()
    if(coupon.length == 0){
      return response.status(404).json({
        message: 'invaild id, check it please!'
      })
    }
    return coupon.length
    // const user = await User.findBy({'id': coupon.user_id})
    // return response.status(200).json({
    //   'id': user.id,
    //   'user_id': user.user_id,
    //   'card_id': user.card_id,
    //   'nickName': user.nickName,
    //   'phone': user.phone,
    //   'type': user.type,
    //   'coupon': coupon
    // })
  }

  async create({auth, request, response}){
    const user = await auth.getUser()
    const {name, avatar, head, code, timestamp} = request.all()
    const coupon = new Coupon();
    let number = ''
    switch(code){
      case 1:
        number = '10' + timestamp
        break
      case 2:
        number = '00' + timestamp
        break
      case 3:
        number = '85' + timestamp
        break
      case 5:
        number = '50' + timestamp
        break
      case 7:
        number = '20' + timestamp
        break
      default:
        number = '00' + timestamp
    }
    let deadline = DateGenerator.generateFormatDate(15)
    coupon.fill({name, avatar, head, number, deadline});
    await user.coupons().save(coupon)
    var pool = await PrizePool.findBy({code: code})
    pool.num -= 1
    pool.save()
    return coupon
  }
}

module.exports = CouponController
