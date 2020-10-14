<template>
      <v-container class="px-12">
          <v-form ref="form" lazy-validation>
            <v-text-field
              ref="username"
              v-model="user.username"
              :counter="50"
              :rules="usernameRules"
              label="Username"
              outlined
              clearable
              required
              placeholder="Username.."
            ></v-text-field>
            <v-text-field
              ref="password"
              v-model="user.password"
              :rules="passwordRules"
              label="Password"
              type="password"
              outlined
              clearable
              required
              placeholder="Password.."
            ></v-text-field>
            <v-btn class="mr-4 login100-form-btn" @click="doLogin()">SIGN IN</v-btn>
          </v-form>
          {{ message}}
          <div class="w-full text-center p-t-5">
            <span class="txt2">Not a member?</span>

            <a href="#" class="txt2 bo1">Sign up now</a>
          </div>
      </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      usernameRules: [
        v => !!v || 'Username is required',
        // v => (v && v.length >= 8) || 'Username must be more than 8 characters',
        v => (v && v.length < 50) || 'Username must be less than 50 characters'
      ],
      passwordRules: [v => !!v || 'Password is required'
        // v => (v && v.length >= 8) || 'Username must be more than 8 characters'
      ],
      message: ''
    }
  },
  mounted () {
    // console.log('this.user', this.user)
  },
  methods: {
    ...mapActions('auth', ['_login']),
    doLogin () {
      const valid = this.$refs.form.validate()
      if (valid) {
        if (this.user.username && this.user.password) {
          this._login(this.user).then(
            response => {
              this.$router.push('home')
            },
            error => {
              this.user.username = ''
              this.user.password = ''
              this.message = 'username or password invalid!'
              console.log('error', error)
            }
          )
        } // end this.user.username && this.user.password
      } // end valid
    },
    signInWithGoogle () {
      const self = this
      const provider = new firebase.auth.GoogleAuthProvider()
      console.log(provider)
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
            console.log('this.token', idToken)
            // Send token to your backend via HTTPS
            self._loginWithGoogle(idToken).then(
              response => {
                console.log('this.result', result)
                self.$router.push('admin')
              },
              error => {
                console.log('error', error)
              }
            )
            // ...
          }).catch(function (error) {
            // Handle error
            console.log('error: ', error)
          })
        })
        .catch(err => {
          console.log('this.err', err)
        })
    }
  }
}
</script>

<style scoped>
.v-form {
  width: 100%;
}
</style>
