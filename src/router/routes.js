/* alterei as rotas originais para parecer primeiro o login depois a parte da tarefa
  criei um novo Layout e tbm um novo componente mais não aparece mais NADA!!
*/
const routes = [
  {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/tarefas.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('pages/register.vue')
  },
  {
    path: '/login',
    component: () => import('pages/login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
