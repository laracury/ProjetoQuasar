export function SalvarLista (state, payload) { // usado para salvar
  state.lista = payload
}
export function saveToken (state, payload) { // usado para salvar
  state.user.token = payload
}

export function addTask (state, payload) { // usado para salvar
  state.lista.push(payload)
}
