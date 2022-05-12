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
          <v-row>
            <v-col
              ><v-btn elevation="5" type="submit" color="orange lighten-2" text>
                Submit
              </v-btn></v-col
            >
            <v-col><v-btn @click="clear"> Clear </v-btn></v-col>
          </v-row>
        </v-container>

      </form>
    </v-container>
<!--  -->
    <v-container v-if="palletsPBFNO.length > 0" class="card-container">
    <!-- <template class="card-container"> -->
     <Card 
        v-for="(pallet, i) in palletsPBFNO" :key="i"
        :pallet="pallet"
        :index="i"
        :temporalUrl="temporalUrl"
      />
      <!-- </template> -->
    </v-container>
<!--  -->
  </v-container>
</template>

<script>
import { storage, firebase, db } from "../../firebase";
import { mapState, mapActions } from "vuex";
// import CardShow from "./CardShow.vue";
import Card from "./Card.vue";

export default {
  components: { Card },
  data() {
    return {
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

    // showCard2(index) {
    //   console.log("index", index);
    //   this.show = true;
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
      console.log("event: ", event);
      const reader = new FileReader();
      reader.readAsDataURL(this.files[0]);
      reader.onload = (e) => {
        console.log(`temporal url: ${e.target.result}`);
        this.temporalUrl = e.target.result;
      };
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
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* position: absolute; */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

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
