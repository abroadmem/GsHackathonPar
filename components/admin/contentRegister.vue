<template lang="pug">
    v-container
        v-btn(
            @click="onclick"
        ) カレンダー追加
</template>

<script>
export default {
    methods:{
        onclick(){
            alert('CSVデータを読み込める')
        }
    }
}
</script>

<style>

</style>
