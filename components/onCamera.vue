<template lang="pug">
    v-dialog(v-model="dialog" width="80%" )
        v-card: v-container ここにカメラ画像を表示、読み込み終わったらthis.dialog = falseにしてダイアログを閉じる
</template>

<script>
//ここでプラグイン読み込み
export default {
    data(){
        return{
            //ダイアログの開閉
            dialog : false
        };
    },
    methods:{
        open(){
            //親コンポーネントのButtonで開く
            this.dialog = true;
            //何らかの処理
            //VIDEOの起動についてはhttps://qiita.com/nkg/items/be89d8aebda6509ce2e1
            //QRコードの読み込みについてはhttps://qiita.com/TakenoriHirao/items/8906fb01e5bb542dd0f9
        },
    }
};
</script>

<style>

</style>
