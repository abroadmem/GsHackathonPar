<template lang="pug">
  v-app
    v-toolbar(
      color="transparent"
      flat
      fixed
      )
      v-spacer
      v-btn(
        flat
        icon
        to="/signage")
        v-icon(mx-3) view_quilt
    Login
</template>

<script>
import Login from '~/components/login';
export default {
  components:{
    Login,
  },
}
</script>

<style scope>

</style>
