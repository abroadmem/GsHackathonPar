<template lang="pug">
div
    v-container.text-xs-center {{ activeCount }} 名 / {{ usersCount }} 名中
    v-layout(row wrap)
        v-flex.text-xs-center(
            v-for="(key,i) in users"
            xs2
            py-1
            )
            v-progress-circular(
                size="50"
                :value="key.value"
                :width="5"
                :color="key.color"
                ) {{key.id}}
</template>

<script>
export default {
  data() {
    return {
        users:null,
        usersCount:40,
        activeCount:0
    };
  },
  mounted(){
    const users = [];
    let activeCount = 0;
    for( let i = 1; i < this.usersCount; i++ ){
        let blom = Math.round((Math.random() * 1) + 0) === 0;
        let color = (blom) ? 'green' : "grey lighten-2";
        if(blom) activeCount++
        // console.log(color)
        users.push({
            id:i,
            value:Math.floor( Math.random() * 100 ),
            color:color
        });
    }
    this.users = users
    this.activeCount = activeCount
  },
  methods:{
  }
};
</script>

<style>
</style>
