<script setup>
const { httpCount } = storeToRefs(store.useLayout());
// http.get(['/api/inner/common/test']);
</script>

<template>
  <div>
    <h1>This is an home page</h1>
    <h2>{{ httpCount }}</h2>
  </div>
</template>

<style lang="scss" scoped>

</style>
