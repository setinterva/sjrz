<template>
    <div class="logo1"  style="display:flex;flex-direction: column;">
        <div class="header1" v-if="showtime"> 
            <van-icon name="arrow-left" @click="back()"/>
            <span>审核中</span>
        </div>
        <div>
            <img src="public/static/api/static/img/act_shenhe.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name : "Logo1",
    data(){
        return{
        showtime : false
        }
    },
    methods:{
        back(){
            this.$router.push("/index")
        }
    },
    mounted(){
        var _this = this;
        ;(function(){
            var u = navigator.userAgent;
                if (u.indexOf('iPhone') > -1) {//苹果手机
                    _this.showtime = false
                }else{
                    _this.showtime = true
                }
        })()
    }
}
</script>
<style>

</style>
<style scoped>
.header1{
    height: 45px;
    background: #Fad211;
    width: 100%;
    line-height: 45px;
    text-align: center;
    color: #fff;
    display: flex;
    align-items: center
}
.header1>i{
    display: inline-block;
    padding: 0 10px;
}
.header1>span{
    flex: 1;
}
.logo1{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #eee;
}
img{
    display: block;
    margin: 0 auto;
    margin-top: 50%; 
}
</style>
