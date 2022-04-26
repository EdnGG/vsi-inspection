<template>
  <v-container>
    <v-row class="mb-8 pa-8" justify="center">
      <v-col lg="8">
        <v-container justify="center" class="d-flex justify-center">
          <h1>Sign up</h1>
        </v-container>
        <v-form 
          ref="form" 
          v-model="valid"  
          lazy-validation 
          @submit.prevent="createUser({email: userRegister.email, password: userRegister.password})">
          <v-text-field
            v-model="userRegister.email"
            :rules="emailRules"
            label="E-mail"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="userRegister.password"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            @keyup.enter="login"
            name="input-10-2"
            label="Password"
            hint="At least 8 characters"
            required
          ></v-text-field>
          <v-text-field
            v-model="userRegister.repeatPassword"
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            name="input-10-2"
            label="Repeat Password"
            required
          ></v-text-field>

          <!-- <div class="d-flex align-end flex-column" style="margin-top: -5px">
            <router-link :to="{ name: 'ForgotPassword' }">
              Forgot Password?
            </router-link>
          </div> -->

          <v-container justify="center" class="d-flex justify-center my-12">
            <v-btn
              :disabled="!disabledButton"
              color="success"
              class="mr-4"
              type="submit"
            >
              Register
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
      valid: true,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length > 5 || "Min 6 characters",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      // email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      userRegister: {
        email: "",
        password: "",
        repeatPassword: "",
      },
    };
  },
  computed: {
    ...mapState(["user", "error"]),
    disabledButton() {
      return (
        this.userRegister.password === this.userRegister.repeatPassword &&
        this.userRegister.password.trim() !== "" &&
        this.userRegister.password.length > 5
      );
    },
  },
  methods: {
    ...mapActions(["createUser"]),
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
