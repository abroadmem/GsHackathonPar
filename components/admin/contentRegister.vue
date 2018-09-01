<template lang="pug">
    v-container
        v-btn(
            @click="toggleCalendar"
            v-if="calendarFlg"
        ) カレンダー追加欄非表示
        v-btn(
            @click="toggleCalendar"
            v-else
        ) カレンダー追加欄表示
        v-btn(
            @click="toggleUser"
            v-if="userResisterFlg"
        ) ユーザー追加欄非表示
        v-btn(
            @click="toggleUser"
            v-else
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
                    <td>
                        v-btn(
                            depressed
                            color="primary"
                            style="display:flex;margin:auto;"
                            @click="updateUser(row.item.id)"
                        ) {{ row.item.update }}
                    </td>
                    <td>
                        v-btn(
                            depressed
                            color="info"
                            style="display:flex;margin:auto;"
                            @click="deleteUser(row.item.id)"
                        ) {{ row.item.delete }}
                    </td>
                </template>
            </v-data-table>
</template>

<script>

function unixTime2ymd(intTime){
    var d = new Date( intTime );
    var year  = d.getFullYear();
    var d = new Date( intTime );
    var y = new Date( intTime * 1000 );
    var year  = y.getFullYear();
    var month = d.getMonth() + 1;
    var day  = d.getDate();
    var hour = ( '0' + d.getHours() ).slice(-2);
    var min  = ( '0' + d.getMinutes() ).slice(-2);
    var sec   = ( '0' + d.getSeconds() ).slice(-2);

    return( year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec );

}
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
        resisterTime: unixTime2ymd(date),
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
                { text: "削除", value: "delete"},
                { text: "更新", value: "update"},
            ],
            users: [],
            users_keys: [],
            name:null,
            type:null,
            term:null,
            userResisterFlg: true,
            calendarFlg: false,
        };
    },
    methods:{
        toggleCalendar() {
            this.calendarFlg = !this.calendarFlg;
            this.userResisterFlg = false
        },
        addCalendar(){
            alert('CSVデータを読み込める');
        },
        toggleUser() {
            this.userResisterFlg = !this.userResisterFlg;
            this.calendarFlg = false
        },
        addUser() {
            this.$firebase.database().ref(ref).push(userData(this.name, this.type, this.term, false, false, false), err => {
                if (err) console.log(err);
            });
        },
        deleteUser(id) {
            this.$firebase.database().ref(ref).delete(userData(this.name, this.type, this.term, false, false, false), err => {
                if (err) console.log(err);
            });
        },
        updateUser(id) {
            console.log(id)
            // let time = moment()._d;
            // console.log(time);
        }
    },
    mounted () {
        this.$firebase.database().ref(ref).once('value', res => {
            const values = Object.values(res.val());
            const keys = Object.keys(res.val());
            let users = [];
            for (let i=0; i < values.length; i++) {
                users.push({
                    id: keys[i],
                    name: values[i].name,
                    type: values[i].type,
                    term: values[i].term,
                    allNightFlg: values[i].allNightFlg,
                    attendFlg: values[i].attendFlg,
                    lifeFlg: values[i].lifeFlg,
                    resisterTime: values[i].resisterTime,
                    updateTime: values[i].updateTime,
                    deleteTime: values[i].deleteTime,
                    delete: "delete",
                    update: "update",
                });
            }
            this.users = users;
        });
    }
};

</script>

<style>

</style>