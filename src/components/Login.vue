<template>
  <v-container class="px-12">
    <p class="display-3 font-weight-light text-center pa-4">SIGN IN</p>
    <v-row justify="center">
      <v-col cols="6">
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
        <p class="error--text">
          {{ message }}
        </p>
          <v-btn class="mb-5" style="width: 100%" @click="doLogin()"
            >SIGN IN</v-btn
          >
        </v-form>
        <div class="w-full text-center p-t-5">
          <span class="txt2">Not a member?</span>

          <a href="#" class="txt2 bo1">Sign up now</a>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      usernameRules: [
        (v) => !!v || "Username is required",
        v => (v && v.length >= 6) || 'Username must be more than 5 characters',
        (v) =>
          (v && v.length <= 50) || "Username must be less than 50 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        v => (v && v.length >= 6) || 'Password must be more than 5 characters',
        v => (v && v.length <= 50) || 'Password must be more than 50 characters',
      ],
      message: "",
    };
  },
  mounted() {
    // console.log('this.user', this.user)
  },
  methods: {
    ...mapActions("auth", ["_login"]),
    doLogin() {
      const valid = this.$refs.form.validate();
      if (valid) {
        if (this.user.username && this.user.password) {
          this._login(this.user).then(
            (response) => {
              this.$router.push("/");
            },
            (error) => {
              this.user.username = "";
              this.user.password = "";
              this.message = "Username or Password invalid!";
              console.log("error", error);
            }
          );
        } // end this.user.username && this.user.password
      } // end valid
    },
  },
};
</script>

<style scoped>
.v-form {
  width: 100%;
}
</style>
