<template>
  <div>
    <h1>Inspection</h1>
    <h2>Inspection page</h2>
    <form-actuators />
    <!-- <actuator /> -->
  </div>
</template>

<script>
// import FormActuators from '../components/FormActuators.vue'
export default {
  components: {
    'actuator': require('@/components/Actuator.vue').default,
    'form-actuators': require('@/components/FormActuators.vue').default
  }

}
</script>

<style>

</style>