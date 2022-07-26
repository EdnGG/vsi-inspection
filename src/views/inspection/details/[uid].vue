<template>
  <div>
    <pre v-if="isLoading">
      <!-- spinner -->
      Loading
    </pre>
    <pre v-else-if="inspection">
    <!-- Tablas -->
      {{ JSON.stringify(inspection, null, 2) }}
    </pre>
    <pre v-else>
      <!-- Mensaje triste -->
      Not found
    </pre>
  </div>
</template>

<script>
import { db } from '@/firebase';
export default {
  name: 'Detail',
  data() {
    return {
      inspection: null,
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = true;
    db.collection('inspections')
      .doc(this.$route.params.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.inspection = doc.data().inspection;
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      }).finally(() => {
        this.isLoading = false;
      });
  },
};
</script>
