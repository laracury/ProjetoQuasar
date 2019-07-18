import { apiRequest } from '../../http/services'
export function doLogin (context, payload) { // faz requisições; Usar payload para enviar
  return apiRequest(payload)
}

export function doRegister (context, payload) {
  return apiRequest(payload)
}
