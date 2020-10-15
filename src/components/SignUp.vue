<template>
  <v-container class="px-12">
    <p class="display-3 font-weight-light text-center pa-4">SIGN UP</p>
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
          <v-text-field
            ref="passwordConfirm"
            v-model="user.passwordConfirm"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            outlined
            clearable
            required
            placeholder="Confirm Password.."
          ></v-text-field>
          <v-text-field
            ref="fullname"
            v-model="user.fullname"
            :rules="requiredRules"
            label="Fullname"
            type="text"
            outlined
            clearable
            required
            placeholder="Fullname.."
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="user.email"
            :rules="requiredRules"
            label="Email"
            type="text"
            outlined
            clearable
            required
            placeholder="Email.."
          ></v-text-field>
          <p class="error--text">
            {{ message }}
          </p>
          <v-btn class="mb-5" style="width: 100%" @click="doSignUp()"
            >SIGN UP</v-btn
          >
        </v-form>
        <div class="w-full text-center p-t-5">
          <span class="txt2">Already have an account?</span>

          <a @click="signIn" class="txt2 bo1">Sign in now</a>
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
        passwordConfirm: "",
        fullname: "",
        email: "",
      },
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) =>
          (v && v.length >= 6) || "Username must be more than 5 characters",
        (v) =>
          (v && v.length <= 50) || "Username must be less than 50 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 5 characters",
        (v) =>
          (v && v.length <= 50) || "Password must be more than 50 characters",
      ],
      confirmPasswordRules: [
        (v) =>
          (v && v === this.user.password) ||
          "Confirm Password must match with Password",
      ],
      requiredRules: [(v) => !!v || "This field is required"],
      message: "",
    };
  },
  methods: {
    ...mapActions("auth", ["_register"]),
    doSignUp() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this._register(this.user).then(
          (response) => {
            this.$router.push("/");
          },
          (error) => {
            console.log("error", error);
          }
        );
      } // end valid
    },
    signIn() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.v-form {
  width: 100%;
}
</style>
