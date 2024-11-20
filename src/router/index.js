import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/Views/Home.vue'
import Login from '@/Views/Login.vue'
import Reader from '@/Views/Reader.vue'
import Publisher from '@/Views/Publisher/Publisher.vue'
import NotFound from '@/Views/NotFound.vue'
import Staff from '@/Views/Staff/Staff.vue'
import BorrowedBookTracking from '@/Views/BorrowedBookTracking.vue'
import AddPublisher from '@/Views/Publisher/AddPublisher.vue'
import store from '@/store'
import EditPublisher from '@/Views/Publisher/EditPublisher.vue'
import AddStaff from '@/Views/Staff/AddStaff.vue'
import AddBook from '@/Views/Book/AddBook.vue'
import EditBook from '@/Views/Book/EditBook.vue'
import InfoStaff from '@/Views/PersonalInfo/InfoStaff.vue'
import ChangePasswordStaff from '@/Views/PersonalInfo/ChangePasswordStaff.vue'
import SignUp from '@/Views/SignUp.vue'
import BorrowBookCustomer from '@/Views/BorrowBookCustomer.vue'
import InfoCustomer from '@/Views/PersonalInfo/InfoCustomer.vue'
import BorrowBookHistory from '@/Views/BorrowBookHistory/BorrowBookHistory.vue'

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/reader',
    name: 'reader',
    component: Reader,
  },
  {
    path: '/publisher',
    name: 'publisher',
    component: Publisher,
  },
  {
    path: '/publisher/add',
    name: 'add-publisher',
    component: AddPublisher,
  },
  {
    path: '/publisher/edit/:id',
    name: 'edit-publisher',
    component: EditPublisher,
    props: true,
  },
  {
    path: '/publisher/add',
    name: 'add-publisher',
    component: AddPublisher,
  },
  {
    path: '/borrow-book',
    name: 'borrow-book',
    component: BorrowBookCustomer,
    props: true,
  },
  {
    path: '/borrow-book-history/:id',
    name: 'borrow-book-history',
    component: BorrowBookHistory,
    props: true,
  },
  {
    path: '/staff',
    name: 'staff',
    component: Staff,
  },
  {
    path: '/staff/add',
    name: 'add-staff',
    component: AddStaff,
  },
  {
    path: '/book/add',
    name: 'add-book',
    component: AddBook,
  },
  {
    path: '/book/edit/:id',
    name: 'edit-book',
    component: EditBook,
    props: true,
  },
  {
    path: '/detail-info-staff/password/:id',
    name: 'change-password-staff',
    component: ChangePasswordStaff,
    props: true,
  },
  {
    path: '/detail-info-staff/:id',
    name: 'detail-info-staff',
    component: InfoStaff,
    props: true,
  },
  {
    path: '/detail-info-reader/:id',
    name: 'detail-info-reader',
    component: InfoCustomer,
    props: true,
  },
  {
    path: '/borrowed-book-tracking',
    name: 'borrowed-book-tracking',
    component: BorrowedBookTracking,
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp,
  },
  {
    path: '/:pathMatch(.*)*', // Sửa lại `patchMatch` thành `pathMatch`
    name: 'not_found',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = store.getters.isAuthenticated

  if (isLogin) {
    return next()
  } else {
    if (to.name == 'login' || to.name == 'home-page' || to.name == 'sign-up') {
      return next()
    } else {
      alert('Bạn cần đăng nhập để sử dụng chức năng này')
      return next('/login')
    }
  }
})

export default router
