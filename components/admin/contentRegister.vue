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
                label="メールアドレス"
                v-model="email"
                type="email"
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
                color="#4DB6AC"
                style="display:flex;margin:auto;"
                @click="addUser"
            ) ユーザー登録

        <template v-if="userResisterFlg">
            <v-data-table :headers="user_headers" :items="users" :loading="true" class="elevation-1">
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                <template slot="items" slot-scope="row" >
                    <td>{{ row.item.name }}</td>
                    <td>{{ row.item.email }}</td>
                    <td class="text-xs-right">{{ row.item.type }}</td>
                    <td class="text-xs-right">{{ row.item.term }}</td>
                    <td class="text-xs-right">{{ row.item.allNightFlg }}</td>
                    <td class="text-xs-right">{{ row.item.attendFlg }}</td>
                    <td class="text-xs-right">{{ row.item.resisterTime }}</td>
                    <td class="text-xs-right">
                        v-btn(
                            color="#F57F17"
                            style="display:flex;margin:auto;"
                            @click="updateUser(row.item.id)"
                        ) {{ row.item.update }}
                    </td>
                    <td class="text-xs-right">
                        v-btn(
                            color="#2196F3"
                            style="display:flex;margin:auto;"
                            @click="deleteUser(row.item.id)"
                        ) {{ row.item.delete }}
                    </td>
                    <td class="text-xs-right">
                        v-btn(
                            color="#787496"
                            style="display:flex;margin:auto;"
                            @click="sendMail(row.item.id, row.item.email)"
                        ) {{ row.item.sendMail }}
                    </td>
                </template>
            </v-data-table>
        </template>
</template>

<script>

function unixTime2ymd(intTime){
    var d = new Date( intTime );
    var year  = d.getFullYear();
    var d = new Date( intTime );
    var y = new Date( intTime * 1000 );
    // var year  = y.getFullYear();
    var month = d.getMonth() + 1;
    var day  = d.getDate();
    var hour = ( '0' + d.getHours() ).slice(-2);
    var min  = ( '0' + d.getMinutes() ).slice(-2);
    var sec   = ( '0' + d.getSeconds() ).slice(-2);

    return( month + '/' + day + ' ' + hour + ':' + min + ':' + sec );
}

const ref = 'users/'
const userData = (name, email, type, term, allNightFlg, attendFlg, lifeFlg) => {
    const date = new Date()
    return  {
        name: name,
        email: email,
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
                { text: "メールアドレス", value: "email"},
                { text: "平日or週末", value: "type" },
                { text: "期", value: "term" },
                { text: "オールナイト", value: "allNightFlg" },
                { text: "出席", value: "attendFlg" },
                { text: "登録日", value: "resisterTime" },
                { text: "更新", value: "update"},
                { text: "削除", value: "delete"},
                { text: "メール", value: "sendMail"}
            ],
            users: [],
            users_keys: [],
            name:null,
            email:null,
            type:null,
            term:null,
            userResisterFlg: true,
            calendarFlg: false,
        };
    },
    methods:{
        readUsers() {
            this.$firebase.database().ref(ref).once('value', res => {
            const values = Object.values(res.val());
            const keys = Object.keys(res.val());
            let users = [];
            for (let i=0; i < values.length; i++) {
                users.push({
                    id: keys[i],
                    name: values[i].name,
                    email: values[i].email,
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
                    sendMail: "send mail"
                });
            }
            this.users = users;
            console.log(this.users)
            })
        },
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
            this.$firebase.database().ref(ref).push(userData(this.name, this.email, this.type, this.term, false, false, false), err => {
                if (err) return;
                this.readUsers()
            });
        },
        deleteUser(id) {
            this.$firebase.database().ref(ref).delete(userData(this.name, this.type, this.term, false, false, false), err => {
                if (err) return;
            });
        },
        updateUser(id) {
            console.log(id)
            // let time = moment()._d;
            // console.log(time);
        },
        sendMail(id, address) {
            console.log({id}, {address})
            // const sendMail = ff.httpsCallable('sendMail')
            let parent = this
            let sendMail = this.$firebase.functions().httpsCallable("sendMail");
            sendMail({destination: address, QRcode: id}).then(function (result) {
                parent.snackbar = true
            })
        }
    },
    mounted () {
        this.readUsers()
    }
};

</script>

<style>

</style>
