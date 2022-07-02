<template>
  <v-container>
    <v-row class="mb-8 pa-8" justify="center">
      <v-col lg="8">
        <v-container justify="center" class="d-flex justify-center">
          <h1>Forgot Password</h1>
        </v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          >
          </v-text-field>

          <div class="d-flex align-end flex-column" style="margin-top: -5px">
            <router-link :to="{ name: 'Login' }"> Back to login </router-link>
          </div>

          <v-container justify="center" class="d-flex justify-center my-12">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="resetPass"
            >
              Send Email
            </v-btn>
            <v-btn color="warning" @click="resetValidation">
              Reset Validation
            </v-btn>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      show4: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      message: {
        color: "",
        text: "",
      },
      user: {
        email: "",
      },
    };
  },
  methods: {
    ...mapActions("authentication", ["resetPassword"]),
    validate() {
      this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    resetPass() {
      this.resetPassword(this.user.email);
    },
  },
};
</script>

<style></style>
