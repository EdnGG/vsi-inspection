<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="inspection"
            :rules="inspectionRules"
            :counter="10"
            label="Inspection #"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="date"
            :rules="inspectionRules"
            :counter="10"
            label="Date"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="technical"
            :rules="inspectionRules"
            label="Technical Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

<!--  -->

<custom-field />

<!-- <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
          Custom items
        </v-subheader>
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="select"
          :hint="`${select.state}, ${select.abbr}`"
          :items="items"
          item-text="state"
          item-value="abbr"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
  </v-container> -->

<!--  -->

  </v-form>
</template>

<script>
  export default {
    components: {
      'custom-field': require('@/components/CustomField.vue').default,
    },
    data: () => ({

      // select: { state: 'Florida', abbr: 'FL' },
      //   items: [
      //     { state: 'Florida', abbr: 'FL' },
      //     { state: 'Georgia', abbr: 'GA' },
      //     { state: 'Nebraska', abbr: 'NE' },
      //     { state: 'California', abbr: 'CA' },
      //     { state: 'New York', abbr: 'NY' },
      //   ],


      valid: false,
      inspection: '',
      date: '',
      inspectionRules: [
        v => !!v || 'Field is required',
        v => v.length <= 10 || 'Field must be less than 10 characters',
      ],
      technical: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),
  }
</script>