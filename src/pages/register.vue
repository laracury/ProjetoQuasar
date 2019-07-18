<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        repassword: ''
      }
    }
  },
  methods: {
    ...mapActions(['TaksStore/doRegistro']),
    doRegistro () {
      const DATA = this.login
      const URL = 'user/register'
      const ID = ''
      const ACTION = 'save'
      this['TaskStore']({ DATA, URL, ID, ACTION })
        .then((data) => {
          this.$router.push('/login')
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
              v-model="register.name"
              label="Nome"
            />
            <q-input
              outlined
              dense
              v-model="register.email"
              label="Email"
            />
            <q-input
              outlined
              dense
              v-model="register.password"
              label="Senha"
              type="password"
            />
            <q-input
              outlined
              dense
              v-model="register.repassword"
              label="Repita a senha"
              type="password"
            />
            <q-btn @click="doRegistro()" class="full-width" color="primary">Registrar</q-btn>
          </div>
          <router-link to="/login">Fazer login</router-link>
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
