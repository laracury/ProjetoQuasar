<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Task
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <div class="header">
        <q-avatar size="75px">
          <img src="/statics/icons/DollifyLara.jpg">
        </q-avatar>
        <h1>{{getUser.name}}</h1>
        <p>{{getUser.email}}</p>
      </div>
      <q-list>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tarefas</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="done_all" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Concluídas</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="delete" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Lixeira</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    ...mapActions(['TaskStore/recuperarTarefas']), // passa o nome do módulo(TaskStore) mais o nome que colocou no action
    getTasks () { // cria um método pra este action e passa os campos que vai usar
      const URL = '/task'
      const ID = ''
      const ACTION = 'get'
      this['TaskStore/recuperarTarefas']({ URL, ID, ACTION })
        .then((data) => {
        })
    }
  },
  mounted () {
    this.getTasks()
  },
  computed: {
    getUser () {
      return this.$store.getters['TaskStore/getUser']
    }
  }
}
</script>

<style lang="stylus">
  .header
    background-color $primary
    height 150px
    display flex
    flex-direction column
    align-items center
    justify-content center
    img
      border solid 3px black
    h1, p
      margin 0
      padding 0
      color white
    h1
      margin-top 10px
      font-size 22px
      line-height 22px
      font-font-weight 400
    p
      margin-top 4px
      font-size 14px
      line-height 14px
</style>
