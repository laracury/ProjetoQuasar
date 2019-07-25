<script>
import { mapActions } from 'vuex'
import { SessionStorage } from 'quasar'
export default {
  name: 'login',
  data () {
    return {
      url: '',
      id: '',
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['TaskStore/doLogin']), // passa o nome do módulo(TaskStore) mais o nome que colocou no action
    doLogin () { // cria um método pra este action e passa os campos que vai usar
      const DATA = this.login
      const URL = '/user/login'
      const ID = ''
      const ACTION = 'save'
      this['TaskStore/doLogin']({ DATA, URL, ID, ACTION })
        .then((data) => {
          // console.log(data) => usado só pra ver se tava funcionando
          SessionStorage.set('token', data) // o token faz parte do backEnd
          this.$router.push('/')
        })
    }
  }
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="container">
        <div class="content">
          <div class="registro">
            <q-img src="https://unfuddle.com/assets/product-summary-tasks-5a6d6625ed37fb42e18a61c2c24087ee.png"
             style="height: 140px; max-width: 150px"
             />
            <q-input
              outlined
              dense
              v-model="login.email"
              label="Email"
            />
            <q-input
              outlined
              dense
              v-model="login.password"
              label="Senha"
              type="password"
            />
            <q-btn @click="doLogin()" class="full-width" color="primary">Login</q-btn> <!-- evento de click para funcionar o botão e ir prara outra tela -->
          </div>
          <router-link to="/register">Não tem uma conta? Clique aqui e faça ja!!</router-link>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="stylus">
  .container
    background-color $primary
    display flex
    flex-direction column
    align-items center
    justify-content center
    .content
      display flex
      flex-direction column
      align-items center
      width auto
      height auto
      a
        color white
        text-decoration none
        text-align center
        margin-top 20px
        font-style italic
      .registro
        display flex
        flex-direction column
        align-items center
        background-color white
        padding 20px 30px 10px 30px
        border-radius 5px
        width 300px
        .q-input
          width 100%
          margin-top 10px
        .q-btn
          margin-top 40px
</style>
