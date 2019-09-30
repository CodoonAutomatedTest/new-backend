'use strict'

const User = use('App/Models/User');
const Score = use('App/Models/Score');
const DateGenerator = use('App/Services/DateGenerator')
const DateJudger = use('App/Services/DateJudger')

const Env = use('Env')
const appid = Env.get('APP_ID')
const secret = Env.get('APP_SECRET')

class UserController {
  async token({ auth, request, response }) {
    const res = await AccessToken(appid, secret)
    return res
  }

  async login({ auth, request, response }) {
    const { code, timestamp, shop } = request.all()
    var res = await OpenidCreater(appid, secret, code)
    let openid = res.openid
    let password = openid
    let session_key = res.session_key
    var user = await User.findBy({'openid': openid})
    let user_id = ''
    let card_id = shop + timestamp
    const last_login = DateGenerator.getNowFormatDate()
    if(!user){
      var UUID = require('uuid')
      user_id = UUID.v1()
      user = await User.create({user_id, card_id, openid, password, last_login})
    } else {
      user_id = user.user_id
      password = user.openid
      let flag = DateJudger.compare(user.last_login, last_login)
      if(flag){
        user.score += 1
        user.last_login = last_login
        user.save()
        await Score.create({user_id: user.id, 'current': last_login, value:1, info: '打卡签到'})
      }
    }
    const token = await auth.attempt(user_id, password)
    user.token = token
    return response.status(200).json({
      data: user,
      session_key: session_key
    })
  }

  async create({ auth, request, response }) {
    const user = await auth.getUser();
    const { openid, nickName, avatarUrl, gender, city } = request.all()
    if (user.openid !== openid) {
      return response.status(403);
    }
    const account = await User.findBy({'openid': openid})
    if(account.nickName !== nickName || account.avatarUrl !== avatarUrl || account.gender !== gender || account.city !== city){
      account.nickName = nickName
      account.avatarUrl = avatarUrl
      account.gender = gender
      account.city = city
      account.save()
    }
    return account;
  }

  async verify ({auth, request, response}) {
    var WXBizDataCrypt = require('../../Services/WXBizDataCrypt')
    const appId = Env.get('APP_ID')
    let user = await auth.getUser()
    const {encryptedData, iv, session_key, account} = request.all()
    if (user.openid == account.openid && !account.phone) {
      var pc = new WXBizDataCrypt(appId, session_key)
      var data = pc.decryptData(encryptedData , iv)
      var member = await User.findBy({'openid': account.openid})
      member.phone = data.phoneNumber
      member.type = 1
      member.score = 10
      member.save()
      const current = DateGenerator.getNowFormatDate()
      await Score.create({user_id: user.id, current:current, value:10, info: '绑定用户'})
      return response.status(200).json({
        data: member
      })
    }
    return response.status(401).json({
      message: 'invaild user'
    })
  }
}

function OpenidCreater(appid, secret, code) {
  var request = require('request');
  return new Promise(function (resolve, reject) {
    var option = {
      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    }
    request.get(option, function (err, response, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    })
  })
}

function AccessToken(appid, secret) {
  var request = require('request');
  return new Promise(function (resolve, reject) {
    var option = {
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    }
    request.get(option, function (err, response, body) {
      if (err) reject(err);
      resolve(JSON.parse(body));
    })
  })
}

module.exports = UserController
