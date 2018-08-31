<template lang="pug">
  v-app
    v-toolbar(
      color="transparent"
      flat
      fixed
      )
      v-btn(
        color="#eee" 
        flat
        icon
        to="/")
        v-icon(mx-3) home
      v-spacer
      v-btn(
        flat
        icon
        @click="parentOpenRef"
        )
        v-icon camera_front
    onCamera(ref="cameraDialogOpen")
    v-container ここにサイネージ
</template>

<script>
import onCamera from "~/components/onCamera.vue";
export default {
	components: {
		onCamera
    },
    methods:{
        parentOpenRef(){
            this.$refs.cameraDialogOpen.open()
        }
    }
    
}
</script>

<style>

</style>
