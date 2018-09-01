<template lang="pug">
    v-dialog(v-model="dialog" width="80%" )
        v-card
          qrcode-reader(@decode="onDecode")
          v-container
            <p>{{ message }}</p>
            <video ref="video" id="video" width="320" height="240" autoplay></video>
            //- <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>             
            |ここにカメラ画像を表示、読み込み終わったらthis.dialog = falseにしてダイアログを閉じる
</template>

<script>
//ここでプラグイン読み込み
import QrcodeReader from 'vue-qrcode-reader'
export default {
    components:{
        'qrcode-reader': QrcodeReader
    },
            data() {
                return{
                    message: 'Hello Vue.js!',
                    video: {},
                    canvas: {},
                    captures: [],
                    dialog : false,
                }
        },
        methods: {
            open(){
                //親コンポーネントのButtonで開く
                this.dialog = true;
                //何らかの処理
                this.video = this.$refs.video;
                this.message = '起動中';                
                if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {                    
                    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                    this.message = '読み込み中';                  
                    this.video.src = window.URL.createObjectURL(stream);
                    this.video.play();
                    });
                }
                //VIDEOの起動についてはhttps://qiita.com/nkg/items/be89d8aebda6509ce2e1
                //QRコードの読み込みについてはhttps://qiita.com/TakenoriHirao/items/8906fb01e5bb542dd0f9
            },
            // capture: function () {
            //     this.canvas = this.$refs.canvas;
            //     var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
            //     this.captures.push(canvas.toDataURL("image/png"));
            // },
            onDecode (content) {
                this.paused = true;
                this.message = 'Find QRcode';
                console.log("aaa");
            }
        }

};
</script>

<style>

</style>
