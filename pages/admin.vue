<template lang="pug">
  div
    v-toolbar(
      color="blue"
      flat
      dark
      )
      v-spacer
      v-toolbar-items
        v-btn(
           flat
           exact
            to="/admin")
            v-icon(mx-3) queue
        v-btn(
           flat
           exact
            to="/admin/alive")
            v-icon(mx-3) perm_identity
        v-btn(
            flat
            target="_blank"
            to="/signage")
            v-icon(mx-3) view_quilt
        v-btn(
            flat
            @click="logout")
            v-icon(mx-3) logout
    nuxt-child
</template>

<script>
export default {
  middleware: ['auth'],
  methods: {
    logout() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('ログアウト成功');
          location.href = '/';
        });
    }
  }
};
</script>

<style>
</style>
