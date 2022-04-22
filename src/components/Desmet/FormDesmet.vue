<template>
  <v-container fluid mt-5 pa-5>
    <v-form @submit.prevent="submit" ref="form">
      <v-container v-show="!show">
        <v-row class="d-flex justify-space-around">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="project.projectName"
             
              label="Project Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="project.orderNumber"
              
              label="Order Number"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-container class="d-flex justify-space-around">
          <v-col cols="12" md="4">
            <v-row>
              <v-btn @click="show = !show" block elevation="2"> Next </v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-container>

      <!-- <v-container class="d-flex justify-space-around"> -->
      <!-- <v-col cols="12" md="4">
          <v-row>
            <v-btn @click="show = !show" block elevation="2"> Next </v-btn>
          </v-row>
        </v-col> -->
      <!-- </v-container> -->

      <v-container v-show="show">
        <v-row class="d-flex justify-space-around">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="project.assemblyType"
              
              label="Assembly Type"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="project.serialValve"
              
              label="Serial Number"
              required
            ></v-text-field>
          </v-col>
        </v-row>

      <v-container class="d-flex justify-space-between">
        <v-col cols="6" md="6">
          <v-row class="pr-3">
            <v-btn @click="add" block elevation="2"> Add </v-btn>
          </v-row>
        </v-col>
        <v-col cols="6" md="6">
          <v-row class="pl-3">
            <v-btn @click="submit" block elevation="2"> Submit </v-btn>
          </v-row>
        </v-col>
      </v-container>

      </v-container>

    </v-form>
    <v-container>
      <h3>Local: {{ finalProject }}</h3>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: false,
    finalProject: [],

    project: {
      // projectName: "DANA-5",
      // orderNumber: "SO77747",
      // assemblyType: '.75"/s7402-s1/c-083/sr-8',
      // serialValve: "18nov-123",
      projectName: "",
      orderNumber: "",
      assemblyType: "",
      serialValve: "",
    },

    // rules: [
    //   (v) => !!v || "Name is required",
    //   (v) => v.length >= 30 || "execeeded 30 characters",
    // ],
  }),
  methods: {
    add() {
      console.log("add");
      this.finalProject.push(this.project);
      this.$refs.form.reset();
      // this.project.assemblyType = "";
      // this.project.serialValve = "";
      // if (!this.finalProject.length) {
      //   this.finalProject.push(this.project);
      //   this.project.assemblyType = "";
      //   this.project.serialValve = "";

      // } else {
      //   // Error
      //   this.finalProject.push(this.project);
      //   this.project.assemblyType = "";
      //   this.project.serialValve = "";
      // }
    },
    submit() {
      console.log("submit");
      this.$store.dispatch("addDesmetOrder", this.finalProject);
    },
  },
};
</script>
