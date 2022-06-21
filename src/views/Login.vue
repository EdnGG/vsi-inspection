<template>
  <v-container>
    <v-row class="mb-8 pa-8" justify="center">
      <v-col lg="8">
        <v-container justify="center" class="d-flex justify-center">
          <h1>Login</h1>
        </v-container>
        <v-form 
          ref="form" 
          lazy-validation 
          @submit.prevent="loginUser({email: userLogin.email, password: userLogin.password})">
          <v-text-field
            v-model="userLogin.email"
            :rules="emailRules"
            label="E-mail"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="userLogin.password"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            @keyup.enter="login"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            required
          ></v-text-field>

          <div class="d-flex align-end flex-column" style="margin-top: -5px">
            <router-link :to="{ name: 'ForgotPassword' }">
              Forgot Password?
            </router-link>
          </div>

          <v-container justify="center" class="d-flex justify-center my-12">
            <v-btn
              color="success"
              class="mr-4"
              type="submit"
            >
              Login
            </v-btn>
            <v-btn color="warning" @click="resetValidation">
              Clean Form
            </v-btn>
          </v-container>
        </v-form>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      show4: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      userLogin: {
        email: "gresseden@gmail.com",
        password: "123123123",
      },
    };
  },
  computed: {
    ...mapState("authentication", ["user"]),
  },
  methods: {
    ...mapActions("authentication", ["loginUser"]),
    validate() {
      return this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      console.log("login");
    },
  },
};
</script>
