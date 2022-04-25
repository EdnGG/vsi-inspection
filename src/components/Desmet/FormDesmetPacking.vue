<template>
  <v-container class="justify-center py-12 my-12 text-center">
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
        <h2>Date</h2>
      </div>
    </v-container>

    <v-container fluid class="py-12 my-12">
      <form @submit.prevent="submit">
        <v-text-field
          v-model="palletNumber"
          label="Pallet Number"
        ></v-text-field>

        <div v-for="i in item" :key=item.length>
        <v-row cols="12" md="6">
          <v-col>
            <v-select
              v-model="selectValveType1"
              :items="items"
              label="Select valve type"
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              v-model="selectQuantityType1"
              label="Quantity"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn @click="addRow">
          Add row
        </v-btn>
        </div>
        <!--  -->
       
        <v-container
          justify="center"
          class="justify-center text-center"
          style="width: 80%"
        >
          <v-file-input
            v-model="files"
            small-chips
            multiple
            label="Select files"
          ></v-file-input>

          <v-row>
            <v-col
              ><v-btn
                elevation="5"
                type="submit"
                color="orange lighten-2"
                text
                @click="submit"
              >
                Submit
              </v-btn></v-col
            >
            <v-col><v-btn @click="clear"> Clear </v-btn></v-col>
          </v-row>
        </v-container>

        <!-- <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn> -->
      </form>
    </v-container>
  </v-container>
</template>

<script>
import { storage, firebase } from "../../firebase";

import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      show: false,
      imageDefault: "https://lenguajejs.com/javascript/logo.svg",
      image: null,
      message: null,

      // vee validate
      palletNumber: "",
      selectValveType1: "",
      // selectValveType2: "",
      // selectValveType3: "",
      // selectValveType4: "",
      selectQuantityType1: "",
      // selectQuantityType2: "",
      // selectQuantityType3: "",
      // selectQuantityType4: "",
      files: null,
      item: [{ selectQuantityType1: "" }],
      items: [
        '50"S7215-S1',
        '50"S7400-C1',
        '50"S7402-C1',
        '75"S7402-C3',
        '50"S7402-S1',
        '75"S7215-S1',
        '75"S7402-C1',
        '1"S7215-S1',
        '1"S7402-C1',
        '1"S7402-S1',
        '1.5"S7402-C1',
        '1.5"S7402-C3',
        '1.5"S7402-S1',
        '2"S7215-C3',
        '2"S7215-C1',
        '3"S7215-C3',
        '3"S7215-C3',
        '3"S7215-C1/FMYB-5120',
        '3"S7215-S1',
        '4"S7215-S1',
        '6"S9015-S1',
        '8"S9015-S1',
      ],
    };
  },
  computed: {
    ...mapState(["userDB", "allTasks"]),
  },
  created() {},
  methods: {
    ...mapActions(["guardarUsuario", "updateImageUsuario"]),

    addRow() {
      this.item.push({ quantity: "" });
    },
    clear() {
      console.log("clear");
    },
    async submit(e) {
      try {
        const refFiles = storage.ref("files");

        const res = await refFiles.put(this.files);

        console.log("res: ", res);

        let formData = new FormData();
        formData.append("files", this.files);

        // let data = {
        //   palletNumber: this.palletNumber,
        //   selectValve: this.selectValve,
        //   selectQuantity: this.selectQuantity,
        // };

        console.log("data ", data);

        // this.$store.commit("savePallet", {
        //   palletNumber: this.palletNumber,
        //   selectValve: this.selectValve,
        //   selectQuantity: this.selectQuantity,
        //   files: this.files,
        // });

        // this.files = e.target.files;
        console.log("this.files:", this.files);
      } catch (err) {
        console.log("err:", err);
      }

      // this.$refs.observer.validate();
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
