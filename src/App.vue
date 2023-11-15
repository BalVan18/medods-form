<template>
  <div class="container flex">
    <newForm />
  </div>
</template>

<script>
import newForm from "@/components/newForm";

export default {
  name: 'App',
  components: {
    newForm,
  }
}
</script>

<style lang="sass">
  @import '@/assets/style/main'
</style>