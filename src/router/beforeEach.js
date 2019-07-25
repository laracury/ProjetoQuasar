import { SessionStorage } from 'quasar'
import _ from 'lodash' // lugar onde possui funções e métodos de verificação entre outros

export default (to, from, next) => {
  var islogged = _.isEmpty(SessionStorage.getItem('token'))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!islogged) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
}
