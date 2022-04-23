<template>
  <v-container justify="center" class="justify-center py-12 my-12 text-center">
    <v-card class="text-center mx-auto" max-width="500">
      <v-img :src="imageDefault" height="400px" width="500px"></v-img>

      <v-container>
        <v-card-title class="justify-center">
          <h1>
            {{ "test" }}
          </h1>
        </v-card-title>
      </v-container>

      <v-card-subtitle>
        {{ "test" }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="orange lighten-2" text> More </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <!-- Poner elementos en flexbox -->
          <v-card-text class="text-subtitle-2">
            <v-col class="pb-5">
              <v-row class="d-flex justify-space-around">
                <h2 class="m">
                  {{ "test" }}
                </h2>
                <h2>
                  {{ "test" }}
                </h2>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-col class="pt-5">
              <v-row class="d-flex justify-space-around">
                <h2>Tasks Completed: {{ "allDoneTasks" }}</h2>
                <h2>Pending Tasks: {{ "pendingTasks" }}</h2>
                <h2 class="pt-4">DueDate Tasks: {{ "duedateTasks" }}</h2>
              </v-row>
            </v-col>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-container class="py-12 my-12">
      <div>
        <h2>
          Date
          <!-- Member since: {{ moment("dddd, MMMM Do YYYY, h:mm:ss a") }} -->
        </h2>
      </div>
    </v-container>

    <v-container class="py-12 my-12">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
          >
            <v-text-field
              v-model="name"
              :counter="10"
              :error-messages="errors"
              label="Pallet Name"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="phoneNumber"
            :rules="{
              required: true,
              digits: 7,
              regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$',
            }"
          >
            <v-text-field
              v-model="phoneNumber"
              :counter="7"
              :error-messages="errors"
              label="Phone Number"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="E-mail"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="select"
            rules="required"
          >
            <v-select
              v-model="select"
              :items="items"
              :error-messages="errors"
              label="Select"
              data-vv-name="select"
              required
            ></v-select>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="checkbox"
          >
            <v-checkbox
              v-model="checkbox"
              :error-messages="errors"
              value="1"
              label="Option"
              type="checkbox"
              required
            ></v-checkbox>
          </validation-provider>

          <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </form>
      </validation-observer>
    </v-container>

    <v-container
      justify="center"
      class="justify-center text-center"
      style="width: 80%"
    >
      <v-file-input small-chips multiple label="Select files"></v-file-input>

      <v-btn elevation="5" color="orange lighten-2" text @click="upload">
        Upload Image
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { mapState, mapActions } from "vuex";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      show: false,
      imageDefault: "https://lenguajejs.com/javascript/logo.svg",
      image: null,
      message: null,
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      // vee validate
      name: "",
      phoneNumber: "",
      email: "",
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: null,
    };
  },
  computed: {
    ...mapState(["userDB", "allTasks"]),
    allDoneTasks() {
      const nameTasks = this.allTasks.filter((task) => task.done);
      return nameTasks.length;
    },
    pendingTasks() {
      const nameTasks = this.allTasks.filter((task) => !task.done);
      return nameTasks.length;
    },
    duedateTasks() {
      const nameTasks = this.allTasks.filter((task) => task.dueDate !== null);
      return nameTasks.length;
    },
  },
  created() {},
  methods: {
    ...mapActions(["guardarUsuario", "updateImageUsuario"]),

    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = "";
      this.phoneNumber = "";
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.observer.reset();
    },
    upload() {
      // console.log(this.image)
      let formData = new FormData();
      formData.append("image", this.image);

      this.axios
        .put(`/upload/${this.userDB._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.updateImageUsuario(res.data.userDB);
          this.$store.commit(
            "showSnackbar",
            `Hey ${res.data.userDB.name} image was updated successfully`
          );
        })
        .catch((e) => {
          // console.log("Error: ", e.response.data.err.message);
          this.message = e.response.data.err.message;
        });
    },
  },
};
</script>

<style scoped>
.home__date--member {
  display: flex;
  margin-left: 20px;
  padding-top: 7%;
  font-weight: bold;
}

p,
table,
form,
button {
  color: hsl(246, 4%, 53%);
  font-weight: 800;
}
ul {
  list-style: none;
}

.form-group .formdata--div {
  background-color: #76949f;
  color: hsl(249, 92%, 64%);
  font-weight: 800;
}
</style>
