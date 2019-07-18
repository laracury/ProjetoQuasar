<script>
import _ from 'lodash'
export default {
  name: 'Tarefas',
  data () {
    return {
      tarefa: {
        titulo: '',
        descricao: '',
        data: '',
        hora: '',
        feito: false
      },
      tarefaID: null,
      lista: [],
      prompt: false
    }
  },
  computed: {
    filtro () {
      var filtrarLista = _.filter(this.getLista, (o) => {
        return o.feito === false
      })
      return filtrarLista
    },
    getLista () {
      return this.$store.getters['TaskStore/PegarLista'] // pega o conteúdo do state
    }
  },
  methods: {
    adicionarTarefa () {
      // não adiciona tarefa se estiver em branco
      if (this.tarefaID === null) {
        /* o commit salva, está recenbendo como parâmetro */
        /* o nome do Store com o nome dado no mutation e depois um objeto */
        this.$store.commit('TaskStore/SalvarLista', { titulo: this.tarefa.titulo, descricao: this.tarefa.descricao, data: this.tarefa.data, hora: this.tarefa.hora, feito: this.tarefa.feito })
        this.$q.localStorage.set('tarefas', this.lista)
        this.tarefa = {}
        this.prompt = false
      } else {
        const listUpdated = {
          titulo: this.tarefa.titulo,
          descricao: this.tarefa.descricao,
          data: this.tarefa.data,
          hora: this.tarefa.hora,
          feito: this.tarefa.feito
        }
        this.lista[this.tarefaID] = listUpdated
        this.tarefa = {
          titulo: '',
          descricao: '',
          data: '',
          hora: '',
          feito: false
        }
        this.tarefaID = null
        this.prompt = false
      }
    },
    // edita a tarefa assim que clicar nela
    editarTarefa (index) {
      let l = []
      l = this.getLista
      this.prompt = true
      this.tarefa.titulo = l[index].titulo
      /* foi criado uma variável pra armagenar o getLista */
      this.tarefa.descricao = l[index].descricao
      this.tarefa.data = l[index].data
      this.tarefaID = index
    },
    pegarLista () {
      if (!this.$q.localStorage.getItem('tarefas')) {
        return
      }
      this.lista = this.$q.localStorage.getItem('tarefas')
    },
    abrirJanela () {
      this.prompt = !this.prompt
      this.tarefaID = null
      this.tarefa = {
        titulo: '',
        descricao: '',
        data: '',
        hora: '',
        feito: false
      }
    }
  },
  created () {
    this.pegarLista()
  }
}
</script>

<template>
  <div class="corpo">
    <div class="list">
      <ul>
        <li v-for="(i, index) in filtro" :key="index">
          <q-checkbox v-model="i.feito" />
          <span @click="editarTarefa(index)">{{i.titulo}}</span>
        </li>
      </ul>
    </div>
    <div class="abrirJanela"> <!-- botão com sinal de + no canto direito -->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="abrirJanela" fab icon="add" color="accent" />
      </q-page-sticky>
      <q-dialog v-model="prompt" >
        <q-card style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">Adicionar Tarefa</div>
          </q-card-section>
          <q-card-section>
            <q-input v-model="tarefa.titulo" autofocus @keyup.enter="prompt = false" label="Título" />
            <q-input v-model="tarefa.descricao" @keyup.enter="prompt = false" label="Descrição" />
            <q-input filled v-model="tarefa.data">
              <template v-slot:prepend> <!-- calendario -->
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="tarefa.data" mask="YYYY-MM-DD HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append> <!-- insere data -->
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="tarefa.data" mask="YYYY-MM-DD HH:mm" format24h />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-card-section> <!-- botões de cancelar e adicionar tarefa -->
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn @click="adicionarTarefa()" flat label="Adicionar" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

  </div>
</template>

<style lang="stylus">
  .corpo
    padding 10px
    .list
      margin-top 30px
      ul
        margin 0
        padding 0
        li
          margin 0
          padding 0
          list-style none
</style>
