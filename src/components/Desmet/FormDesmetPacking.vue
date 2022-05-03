<template>
  <v-container class="justify-center py-2 my-2 text-center">
    <v-container fluid class="py-2 my-2">
      <form @submit.prevent="sendForm">
        <v-text-field
          v-model="palletNumber"
          label="Pallet Number"
        ></v-text-field>

        <div v-for="(options, i) in item" :key="i">
          <v-row cols="12" md="6">
            <v-col>
              <v-select
                v-model="options.items"
                :items="selectItems"
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
          <v-btn @click="deleteRow" :disabled="item.length === 1">
            Delete Row
          </v-btn>
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
              ><v-btn elevation="5" type="submit" color="orange lighten-2" text>
                Submit
              </v-btn></v-col
            >
            <v-col><v-btn @click="clear"> Clear </v-btn></v-col>
          </v-row>
        </v-container>

        <!-- <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn> -->
      </form>
    </v-container>

    <!-- <v-container> -->

    <v-container v-if="palletsPBFNO" class="d-flex flex-wrap">
      <!--  card 1 -->

      <!-- end card 1 -->
      <v-card
        v-for="(pallet, i) in palletsPBFNO"
        :key="i"
        class="text-center my-6 mx-auto"
        max-width="500"
      >
        <v-img
          class="text-center mx-auto"
          :src="temporalUrl ? temporalUrl : imageDefault"
          height="300px"
          width="300px"
        ></v-img>

        <v-container>
          <v-card-title class="justify-center">
            <h1>Pallet # {{ pallet.palletNumber }}</h1>
          </v-card-title>
        </v-container>

        <!-- <v-card-subtitle>
          {{ pallet.items }}
        </v-card-subtitle> -->

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
              <v-col v-for="(pal, i) in pallet.items" :key="i" class="pb-5">
                <v-row class="d-flex justify-space-around">
                  <h2 class="mt2">
                    Assembly: {{ pal.items }} Quantity: {{ pal.quantity }}
                  </h2>
                </v-row>
              </v-col>
              <v-divider></v-divider>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-container>
    <!-- </v-container> -->
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
      palletNumber: "",
      files: null,
      item: [{ items: this.selectItems, quantity: "" }],
      selectItems: [
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
    ...mapState(["user", "palletsPBFNO"]),
    // checkingDataLength() {
    //   return this.pbfnoPallets2.length > 0;
    // },
  },
  methods: {
    ...mapActions(["guardarUsuario", "updateImageUsuario"]),

    // reader(e) {
    //   // Funcion que tengo como ejemplo
    //   const reader = new FileReader();
    //   reader.readAsDataURL(this.file);
    //   reader.onLoad = (e) => {
    //     console.log("e.target.result: ", e.target.result);
    //     this.temporalUrl = e.target.result;
    //   };
    // },
    deleteRow() {
      this.item.pop();
    },
    addRow() {
      this.item.push({ quantity: "" });
    },
    clearOnSubmitted() {
      this.palletNumber = "";
      this.item = [{ items: this.selectItems, quantity: "" }];
      this.files = null;
    },
    clear() {
      this.item = [{ items: this.selectItems, quantity: "" }];
      this.temporalUrl = "";
      this.files = null;
      this.palletNumber = "";
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
    async sendFiles(file) {
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
      } catch (error) {
        console.log(error);
      }
    },

    sendForm() {
      try {
        this.files.forEach((file) => {
          console.log("file: ", file);
          this.sendFiles(file);
        });
        this.$store.dispatch("savePallet", {
          palletNumber: this.palletNumber,
          items: this.item,
          image: this.temporalUrl,
        });
        this.clearOnSubmitted();
      } catch (err) {
        // cae en el catch al enviar el form en la segunda vez
        console.log("error: ", err);
      }
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
