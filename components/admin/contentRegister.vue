<template lang="pug">
    v-container
        v-btn(
            @click="addCalendar"
        ) カレンダー追加欄表示
        v-btn(
            @click="toggleUser"
        ) ユーザー追加欄表示
        div(v-if="userResisterFlg" style="width:400px;margin:50px auto;")
            v-text-field(
                label="名前"
                v-model="name"
                type="name"
            )
            v-text-field(
                label="週末 or 平日"
                v-model="type"
                type="type"
            )
            v-text-field(
                label="何期ですか"
                v-model="term"
                type="term"
            )
            v-btn(
                depressed
                color="info"
                style="display:flex;margin:auto;"
                @click="addUser"
            ) ユーザー登録
        div(v-if="userResisterFlg" style="width:1000px;margin:50px auto;")
            <v-data-table :headers="user_headers" :items="users">
                <template slot="items" slot-scope="row" >
                    <td>{{ row.item.name }}</td>
                    <td>{{ row.item.type }}</td>
                    <td>{{ row.item.term }}</td>
                    <td>{{ row.item.allNightFlg }}</td>
                    <td>{{ row.item.attendFlg }}</td>
                    <td>{{ row.item.resisterTime }}</td>
                </template>
            </v-data-table>
</template>

<script>
import unixToDateTime from "~/components/utils/dataFormat"

const ref = 'users/'
const userData = (name, type, term, allNightFlg, attendFlg, lifeFlg) => {
    const date = new Date()
    return  {
        name: name,
        type: type,
        term: term,
        allNightFlg: allNightFlg,
        attendFlg: attendFlg,
        lifeFlg: lifeFlg,
        resisterTime: date.getTime(),
        updateTime: null,
        deleteTime: null
    }
}
export default {
    data() {
        return {
            user_headers: [
                { text: "名前", value: "name" },
                { text: "種類", value: "type" },
                { text: "期", value: "term" },
                { text: "オールナイト", value: "allNightFlg" },
                { text: "出席", value: "attendFlg" },
                { text: "登録日", value: "resisterTime" },
            ],
            users: [],
            users_keys: [],
            name:null,
            type:null,
            term:null,
            userResisterFlg: true,
        };
    },
    methods:{
        toggleCalendar() {

        },
        addCalendar(){
            alert('CSVデータを読み込める');
        },
        toggleUser() {
            this.userResisterFlg = !this.userResisterFlg;
        },
        addUser() {
            this.$firebase.database().ref(ref).push(userData(this.name, this.type, this.term, false, false, false), err => {
                console.log(err);
            });
        },
        readUser() {
            this.$firebase.database().ref(ref).once('value', snap => {
            });
        },
        deleteUser() {

        },
        updateUser() {

        }
    },
    mounted () {
        this.$firebase.database().ref(ref).once('value', res => {
            this.users = Object.values(res.val());
            this.users_keys = Object.keys(res.val());
        });
    }
};
</script>

<style>

</style>
