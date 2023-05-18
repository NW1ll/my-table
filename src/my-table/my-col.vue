<template>
  <div>{{props.field}}</div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  field: {
    type: String,
    required: true
  },
})
</script>

<script>
export default {
  name: "my-col"
}
</script>

<style scoped>

</style>
