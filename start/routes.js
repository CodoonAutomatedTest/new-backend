'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  // Login
  Route.post('auth/login', 'UserController.login')
  Route.get('auth/token', 'UserController.token')
  // User
  Route.post('user/query', 'UserController.query')
  Route.post('user/create', 'UserController.create').middleware('auth')
  Route.post('user/verify', 'UserController.verify').middleware('auth')
  // WheelUser
  Route.post('wheel/join', 'WheelUserController.join').middleware('auth')
  Route.post('wheel/lottery', 'WheelUserController.lottery').middleware('auth')
  Route.get('wheel/prize', 'WheelUserController.prize').middleware('auth')
  // Banner
  Route.get('banners', 'BannerController.index')
  Route.post('banners/create', 'BannerController.create').middleware('auth')
  // Category
  Route.get('categories', 'CategoryController.index')
  Route.post('category/create', 'CategoryController.create').middleware('auth')
  // Activity
  Route.get('activities', 'ActivityController.index')
  Route.post('activity/create', 'ActivityController.create').middleware('auth')
  // Article
  Route.get('articles', 'ArticleController.index')
  Route.post('article/create', 'ArticleController.create').middleware('auth')
  // Coupon
  Route.get('coupon/query', 'CouponController.query')
  Route.get('coupon/index', 'CouponController.index').middleware('auth')
  Route.post('coupon/create', 'CouponController.create').middleware('auth')
  // Collection
  Route.get('collection/index', 'CollectionController.index').middleware('auth')
  Route.post('collection/create', 'CollectionController.create').middleware('auth')
  Route.post('collection/destroy', 'CollectionController.destroy').middleware('auth')
  // PrizePool
  Route.post('prize/create', 'PrizePoolController.create').middleware('auth')
  // Feed
  Route.post('feed/create', 'FeedController.create').middleware('auth')
  Route.post('feed/type', 'FeedController.type').middleware('auth')
  // Score
  Route.get('score/info', 'ScoreController.index').middleware('auth')
  // Helper
  Route.post('helper/add', 'HelperController.create').middleware('auth')
}).prefix('api')
