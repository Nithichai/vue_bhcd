<template>
  <card>
    <h5>Logout</h5>
    <base-button type="danger" fill>Logout</base-button>
  </card>
</template>
<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
