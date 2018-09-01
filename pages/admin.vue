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
            to="/signage")
            v-icon(mx-3) view_quilt
        v-btn(
            flat
            @click="logout")
            v-icon(mx-3) logout
    nuxt-child
    content-register

</template>

<script>
import contentRegister from '~/components/admin/contentRegister';

export default {
  middleware: ['auth'],
  components: {
    contentRegister
  },
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
