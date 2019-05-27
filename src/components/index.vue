<template>
    <div class="index">
        <div class="header" v-if="flage">
            商家入驻申请表
        </div>
            <h3>账户类别</h3>
          <!-- <router-link to="/enterprise"><h4>企业商户</h4></router-link>   -->
          <router-link to="/individual"><h4>个体户</h4></router-link>
          <!-- <router-link to="/personage"><h4>个人收款</h4></router-link> -->
    </div>
</template>
<script>
export default {
    name : "Index",
    data(){
        return{
            flage:true
        }
    },
    mounted(){
    //   console.log(this.$route.query.id);
    //     console.log(this.flage)
         this.$store.commit('change', this.$route.query.id)
             var u = navigator.userAgent;

                if (u.indexOf('iPhone') > -1) {//苹果手机
                    this.flage = false
                }else{
                    this.flage = true
                }


    }
}
</script>
<style scoped>
.header{
    height: 45px;
    background: #Fad211;
    width: 100%;
    line-height: 45px;
    text-align: center;
    color: #fff;
}
.index{
    width: 100%;
    height: 100%;
}
h3,h4{
    margin: 0 auto;
    width: 40%;
    height: 60px;
    text-align: center;
    line-height: 60px;
}
h3{
    margin-top: 70px;
    font-size: 25px;
    font-weight: 100;
}
h4{
    margin-top: 25px;
    background: #03dacb;
    font-size: 25px;
    color: #fff;
}
</style>


