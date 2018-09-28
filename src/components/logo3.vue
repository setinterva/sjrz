<template>
    <div class="logo3" style="display:flex;flex-direction: column;">
        <div class="header1" v-if="showtime"> 
            <van-icon name="arrow-left" @click="back()"/>
            <span>入驻协议</span>
        </div>
        <div style="flex: 1;overflow-y: auto;width: 100%;">
            <div v-html="html"></div>
        </div>
    </div>
</template>
<script>
import $ from "jquery"
export default {
    name : "Logo",
    data(){
        return{
            html:"",
            showtime:false
        }
    },
    methods:{
        back(){
            this.$router.push("/personage")
        }
    },
    mounted(){
        var _this = this;
        (function(){
            $.ajax({
                type:"get",
                url:"http://ht.yhbapp.com/api.php/Active_Rule/index.html?type_id=7",
                dataType:"json",
                success:function(data){
                    _this.html = data.data.content
                }
            })
        })()
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
.logo3>div .content p span{
    display: inline;
}
</style>

<style scoped>
.logo3{
    width:100%;
    height: 100%;
    overflow-y: auto;
}
.logo3>div{
    width: 100%;
}
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
</style>
