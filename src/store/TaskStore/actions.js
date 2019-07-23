import { apiRequest } from '../../http/services'
export function doLogin (context, payload) { // faz requisições no BackEnd; Usar payload para enviar
  const token = apiRequest(payload)
  token.then((data) => {
    console.log(data)
    context.commit('saveToken', data.token) // primeiro é o nome do mutation e depois o que vai usar no payload
  })
  return token
}

export function doRegister (context, payload) {
  return apiRequest(payload)
}

export function recuperarTarefas (context, payload) {
  const tasks = apiRequest(payload)
  tasks.then((data) => {
    context.commit('SalvarLista', data)
  })
  return tasks
}

export function saveTask (context, payload) {
  const task = apiRequest(payload)
  task.then((data) => {
    context.commit('addTask', data)
  })
  return task
}
