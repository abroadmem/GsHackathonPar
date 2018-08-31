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
    v-layout(row wrap grid-list-sm)
        v-flex(
            v-for="(flex,index) in contents"
            :class="flex.layout.col"
            ) 
            v-img(
                v-if="flex.layout.media"
                :src="flex.layout.media"
                )
            v-card-text(
                v-if="!flex.layout.media"
                :style="`${flex.layout.style}`"
                ) {{ flex.body }}
            .qrcode(v-if="flex.qrvalue")
                qrcode(:value="flex.qrvalue" :options="{ size: 80 }")
            .alert(v-if="flex.alert") {{ flex.alert }}
</template>

<script>
import onCamera from "~/components/onCamera.vue";
import VueQrcode from '@xkeshi/vue-qrcode';

export default {
	components: {
        qrcode:VueQrcode,
		onCamera
    },
    data(){
        return{
            contents:[
                {
                    body:'row1,col1,aaaaaa',
                    layout:{
                        col: 'xs12 px-0',
                        media: require('~/assets/dummy/dummy1.png'),
                        style: 'background:#eee',
                    },
                    qrvalue:'http://google.com',
                    alert:"満員御礼！第二弾開催予定"
                },
                {
                    body:'row2,col1,BBBBBB',
                    layout:{
                        col:'xs6 px-0',
                        media: require('~/assets/dummy/dummy2.jpg'),
                        style:'background:#eee',
                    },
                    qrvalue:'http://example.com',
                    alert:'残りわずか'
                },
                {
                    body:'世界を変えるGEEKになろう',
                    layout:{
                        col:'xs6 px-0',
                        style:'background:#78b7dc;color:#fff;font-size: 42px;'
                    },
                },
            ]
        }
    },
    methods:{
        parentOpenRef(){
            this.$refs.cameraDialogOpen.open()
        }
    }
    
}
</script>

<style scope>
.v-image,
.layout,
.v-card{
    height: 100%;
}
.layout{
    padding: 8px;
}
.flex{
    padding: 4px;
    position: relative;
}
.v-card__text{
    height: 100%;
}
.qrcode{
    position: absolute;
    bottom: 8px;
    right: 8px;
}
.alert{
    position: absolute;
    top:30px;
    left:0;
    transform: rotate(-10deg);
    background:red;
    color:white;
    padding: 0.5em 2em;
    font-weight: bold;
    font-size: 20px;
}
</style>
