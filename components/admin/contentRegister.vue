<template lang="pug">
    v-container
        v-btn(
            @click="addCalendar"
        ) カレンダー追加
        v-btn(
            @click="addUser"
        ) ユーザー追加

</template>

<script>
export default {
    methods:{
        addCalendar(){
            alert('CSVデータを読み込める')
        },
        addUser() {
           console.log(process.env.apiKey)
           const usersRef = this.$firebase.database().ref('/users')
           console.log(usersRef)
        }
    },
    data() {
        return {
            users: [],
        }
    }
}
</script>

<style>

</style>
