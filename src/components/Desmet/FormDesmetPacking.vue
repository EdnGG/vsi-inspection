<template>
  <v-container class="justify-center py-2 my-2 text-center">
    <v-container>
      <div>
        <h2>Date</h2>
      </div>
    </v-container>

    <v-container fluid class="py-2 my-2">
      <form @submit.prevent="savePhotoStorage">
        <v-text-field
          v-model="palletNumber"
          label="Pallet Number"
        ></v-text-field>

        <div v-for="(options, i) in item" :key="i">
          <v-row cols="12" md="6">
            <v-col>
              <v-select
                v-model="options.items"
                :items="items"
                label="Select valve type"
              ></v-select>
            </v-col>
            <v-col>
              <v-text-field
                v-model="options.quantity"
                label="Quantity"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <v-container class="d-flex justify-space-around">
          <v-btn @click="addRow"> Add row </v-btn>
          <v-btn @click="deleteRow"> Delete Row </v-btn>
        </v-container>

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
            @change="preloadImage($event)"
          ></v-file-input>
          <!-- @change="savePhotoStorage($event)" -->
          <v-row>
            <v-col
              ><v-btn
                elevation="5"
                type="submit"
                color="orange lighten-2"
                text
                @click="savePhotoStorage"
              >
                <!-- @click="submit" -->
                Submit
              </v-btn></v-col
            >
            <v-col><v-btn @click="clear"> Clear </v-btn></v-col>
          </v-row>
        </v-container>

        <!-- <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn> -->
      </form>
    </v-container>

    <v-container v-for="(dato, i) in datos" :key="i">
    <div class="d-flex justify-space-between">
    <!--  card 1 -->
    
    <!-- end card 1 -->
      <v-card class="text-center mx-auto" max-width="300">
        <v-img
          class="text-center mx-auto"
          :src="temporalUrl ? temporalUrl : imageDefault"
          height="300px"
          width="300px"
        ></v-img>

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
                  <h2 class="mt2">
                    <!-- {{ temporalUrl ? files[0].name : "test2" }} -->
                    {{ temporalUrl ? fileName : "test2" }}
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
                </v-row>
              </v-col>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { storage, firebase, db } from "../../firebase";
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      temporalUrl: "",
      show: false,
      imageDefault: "https://lenguajejs.com/javascript/logo.svg",
      image: null,
      message: null,
      temporalUrl: "",
      datos: {
        pallet1: {
          palletNumber: "",
          item: [{ items: this.items, quantity: "" }],
        },
        pallet2: {
          palletNumber: "",
          item: [{ items: this.items, quantity: "" }],
        },
        pallet3: {
          palletNumber: "",
          item: [{ items: this.items, quantity: "" }],
        },
      },
      palletNumber: "",
      files: null,
      item: [{ items: this.items, quantity: "" }],
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
  created() {},
  computed: {
    ...mapState(["user"]),
    fileName() {
      if (this.files) {
        return this.files[0].name;
      }
      return console.log("x");
      // return temporalUrl ? files[0].name : "test2"
    },
    filesToUpload() {
      return console.log(this.files);
    },
  },
  created() {},
  methods: {
    ...mapActions(["guardarUsuario", "updateImageUsuario"]),

    reader(e) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onLoad = (e) => {
        console.log("e.target.result: ", e.target.result);
        this.temporalUrl = e.target.result;
      };
    },
    deleteRow() {
      this.item.pop();
    },
    addRow() {
      this.item.push({ quantity: "" });
      console.log("this.item: ", this.item);
    },
    clear() {
      console.log("clear");
    },
    preloadImage(event) {
      if (event.length === 0) {
        return console.log("no event");
      }
      // else {
      console.log("event: ", event);
      const reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
      reader.onload = (e) => {
        console.log(`temporal url: ${e.target.result}`);
        this.temporalUrl = e.target.result;
      };
      // }
    },
    async uploadFiles(file) {
      const metaData = {
        contentType: "image/jpeg",
      };
      try {
        let filesRef = storage
          .ref()
          .child("images")
          .child(`${this.user.email}/desmet/${Date.now()}`);
        const res = await filesRef.put(file, metaData);
        const url = await filesRef.getDownloadURL();
        console.log("res file and url: ", res, url);
        // this.savePhotoFirestore(file, url);
      } catch (error) {
        console.log(error);
      }
    },

    savePhotoStorage() {
      this.files.forEach((file) => {
        console.log("file: ", file);
        this.uploadFiles(file);
        this.$store.dispatch("savePallet", {
          palletNumber: this.palletNumber,
          items: this.item,
          image: this.temporalUrl,
        });

        this.palletNumber = "";
        this.item = [{ items: this.items, quantity: "" }];
        this.temporalUrl = "";
        this.files = [];
      });
    },
    // async submit() {
    //   try {
    //     const metaData = {
    //       contentType: "image/jpeg",
    //     };
    //     // Path
    //     const refFiles = storage
    //       .ref()
    //       .child(`${this.user.email}/desmet/${Date.now()}`)
    //       .child("photo");

    //     const res = await refFiles.put(this.files[0], metaData);
    //     console.log("res: ", res);
    //   } catch (err) {
    //     console.log("err:", err);
    //   }
    // },

    upload() {
      let formData = new FormData();
      formData.append("image", this.image);
      this.$store.commit(
        "showSnackbar",
        `Hey Foo. Image was updated successfully`
      );
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
