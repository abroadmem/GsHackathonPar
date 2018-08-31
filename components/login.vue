<template lang="pug">
    v-container
        div(style="width:300px;margin:50px auto;")
            v-text-field(
                label="メールアドレス"
                v-model="email"
                type="email"
                )
            v-text-field(
                label="パスワード"
                v-model="password"
                type="password"
                )
            v-btn(
                depressed
                color="info"
                @click="onClick"
            ) ログイン
</template>

<script>
export default {
    data(){
        return{
            email:null,
            password:null
        }
    },
    methods:{
        onClick(){
            const email = this.email;
            const password = this.password;
            this.$firebase.auth().signInWithEmailAndPassword(email, password)
                .then(()=>location.href="/admin")
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage)
                });
        }
    }
}
</script>

<style>

</style>
