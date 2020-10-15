import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Product from '@/components/Product'
import Blog from '@/components/Blog'
import Post from '@/components/Post'
import Cart from '@/components/Cart'
import Layout from '@/components/Layout'
import CheckOut from '@/components/CheckOut'
import WishList from '@/components/Wishlist'
import History from '@/components/History'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Profile from '@/components/Profile'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home,
        name: 'Home'
      },
      {
        path: '/login',
        component: Login,
        name: 'Login'
      },
      {
        path: '/signup',
        component: SignUp,
        name: 'SignUp'
      },
      {
        path: '/profile',
        component: Profile,
        name: 'Profile'
      },
      {
        path: '/shop',
        component: Shop,
        name: 'Shop'
      },
      {
        path: '/product',
        component: Product,
        name: 'Product'
      },
      {
        path: '/blog',
        component: Blog,
        name: 'Blog'
      },
      {
        path: '/post',
        component: Post,
        name: 'Post'
      },
      {
        path: '/cart',
        component: Cart,
        name: 'Cart'
      },
      {
        path: '/wishlist',
        component: WishList,
        name: 'WishList'
      },
      {
        path: '/history',
        component: History,
        name: 'History'
      },
      {
        path: '/checkOut',
        component: CheckOut,
        name: 'CheckOut'
      }
    ]

  }
]

const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['Login', 'SignUp']
  const authRequired = !publicPages.includes(to.name)
  const user = JSON.parse(localStorage.getItem('UserInfo'))
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (user === null) {
    // chưa đăng nhập
    if (authRequired) {
      next('/login')
    } else {
      next()
    }
  } else {
    // đã đăng nhập
    if (!authRequired) {
      next('/')
    } else {
      next()
    }
  }
})

export default router