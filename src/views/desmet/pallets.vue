<template>
  <v-container v-if="!palletsPBFNO.length > 0">
    <NoContent :message="message"></NoContent>

    <v-container v-else v-if="palletsPBFNO.length > 0" class="card-container">
      <Card
        v-for="(pallet, i) in palletsPBFNO"
        :key="i"
        :pallet="pallet"
        :index="i"
        :temporalUrl="temporalUrl"
      />
    </v-container>
  </v-container>
</template>

<script>
import { storage, firebase, db } from "@/firebase";
import { mapState, mapActions } from "vuex";
// import CardShow from "./CardShow.vue";
import NoContent from "@/components/Tools/NoContent.vue";
import Card from "@/components/Desmet/Card.vue";

export default {
  components: { Card, NoContent },
  data() {
    return {
      imageDefault: "https://lenguajejs.com/javascript/logo.svg",
      image: null,
      message: null,
      temporalUrl: "",
      message: "No Pallets Added",
    };
  },
  created() {
    this.getPalletsPBFNO();
  },
  computed: {
    ...mapState(["palletsPBFNO"]),
  },
  methods: {
    ...mapActions(["guardarUsuario", "updateImageUsuario", "getPalletsPBFNO"]),
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
