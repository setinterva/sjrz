<template>
    <div class="enterprise" style="display:flex;flex-direction: column;">
            <div class="header1" v-if="showtime"> 
                <van-icon name="arrow-left" @click="back()"/>
                <span>企业商户</span>
            </div>
<div style="flex: 1;overflow-y: auto;width: 100%;">
            <p class="header">
                <span>基本信息</span>
            </p>
            <!-- header 结束 -->

            <!-- 主要内容 -->
            <van-cell-group>
                <van-field v-model="dianpu" clearable label="店铺名称" placeholder="请输入店铺名" />
                <van-field v-model="phoneNumber" clearable label="电话" placeholder="请输入电话" oninput="if(value.length > 11)value = value.slice(0, 11)"/>
                <van-field v-model="username" clearable label="姓名" placeholder="请输入姓名" />
                <van-field v-model="cardid" clearable label="身份证号" placeholder="请输入身份证号" oninput="if(value.length > 18)value = value.slice(0, 18)"/>
                <van-field v-model="industry" clearable label="店铺类型" placeholder="请选择行业" @click="popupVisible = true"/>
                <van-field v-model="point" clearable label="扣点" placeholder="请输入扣点(平台扣款比例0~1)" v-on:blur="change1(point)"/>
                <van-field v-model="postcode" clearable label="邮政编码" placeholder="请输入邮编" oninput="if(value.length > 6)value = value.slice(0, 6)"/>
                <van-field v-model="email" clearable label="邮箱" placeholder="请输入邮箱" v-on:blur="changeCount(email)"/>
                <van-field v-model="bankNumber" clearable label="结算卡联行号" placeholder="请输入结算卡联行号" oninput="if(value.length > 12)value = value.slice(0, 12)"/>
                <van-field v-model="opennumber" clearable label="营业执照号码" placeholder="" oninput="if(value.length > 18)value = value.slice(0, 18)"/>
            </van-cell-group>
            <!-- 店铺类型 -->
            <div class="radiotask" style="border-bottom: 1px solid #ebebeb;padding-bottom: 10px;">
                <span class="span" style="left: 15px;">店铺类型</span>
                <van-radio-group v-model="radiotask" style="margin-left: 10px;">
                    <van-radio name="1">非任务店</van-radio>
                    <van-radio name="2">任务店</van-radio>
                </van-radio-group>
            </div>  
            <!-- 店铺类型 end -->



            <!-- 行业类型 start -->
                <div class="businesstask" style="border-bottom: 1px solid #ebebeb;">
                    <div style="display: flex;padding: 5px 0 5px 15px;color: #333;font-size: 15px;"><span>行业分类</span><span @click="show = true" v-text="ipt1" style="display: inline-block;flex: 1;text-indent: 15px;"></span></div>
                    <van-picker v-if="show" class="positi" :columns="columns" value-key="industry_name" show-toolbar title="行业分类" @cancel="show = false" @confirm="onConfirm"/>
                </div>
            <!-- 行业类型  end -->


            <!-- 商户类型 start -->
                <div class="businesstype" style="border-bottom: 1px solid #ebebeb;padding-bottom: 10px;padding-top: 5px;">
                    <span class="span" style="margin-left: 15px;color: #333;">商户类型</span>
                    <span @click="showtime1 = true" style="width: 70%;display: inline-block;margin-left: 10px;height: 20px;font-size: 14px;">{{showtime2}}</span>
                    <van-actionsheet v-model="showtime1" :actions="listarr" @select="onselte"/>
                </div>
            <!-- 商户类型 end -->


            <!-- 商家地址 start -->
                    <div class="address">
                        <div style="display: flex;padding: 5px 0 5px 15px;color: #666;font-size: 15px;"><span style="color: #333;">商家地址</span><span @click="shenglist = true" v-text="address" style="display: inline-block;flex: 1;text-indent: 15px;"></span></div>
                        <vue-area :props-show="shenglist" :props-result="result" v-on:result="areaResult"></vue-area>
                        <van-field v-model="address1" clearable label="" placeholder="请输入详细地址" class="tit"/>
                    </div>
            <!-- 商家地址 end -->

        <!-- 营业时间  start -->
            <div class="timerselect" style="border-bottom: 1px solid #ebebeb;padding: 5px 0;">
                <p><span>营业时间</span> <span @click="flage = true">{{am1}}</span> ~ <span @click="flage1 = true">{{pm1}}</span></p>

                <van-datetime-picker v-if="flage" type="time" :min-hour="minHour" :max-hour="maxHour" style="position: fixed;left: 0;bottom: 0;width: 100%;z-index: 9999;" @confirm="am"/>
                <van-datetime-picker v-if="flage1" type="time" :min-hour="minHour" :max-hour="maxHour" style="position: fixed;left: 0;bottom: 0;width: 100%;z-index: 9999;" @confirm="pm"/>
           </div>
        <!-- 营业时间  end -->



        <!-- 经营类别 -->
            <div class="businesstask" style="border-bottom: 1px solid #ebebeb;">
                <div style="display: flex;padding: 5px 0 5px 15px;color: #666;font-size: 15px;"><span style="color: #333;">经营类别</span><span @click="show1 = true" v-text="ipt2" style="display: inline-block;flex: 1;text-indent: 15px;"></span></div>
                <van-picker v-if="show1" class="positi" :columns="columns1" value-key="title" show-toolbar title="经营类别" @cancel="show1 = false" @confirm="onConfirm1"/>
            </div>
        <!-- 经营类别 -->

        <!-- 服务范围 -->
        <p class="bg">服务范围</p>
        <textarea name="" id="" cols="" rows="" style="width: 99%;height: 35px;border: 0;text-indent: 10px;" v-model="server1"></textarea>
        <!-- 服务范围 end --> 


    
        <div class="pic">
            <p>企业商户基本资料</p>
            <div class="photo">
                <div class="pic" v-if="imgUrl != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl = ''"/>
                    <img :src="imgUrl" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload" accept="image" name="img[]" @change="upload" style="display: none;">  
                    <label for="upload">+</label>
                    <p>上传营业执照</p>
                </div>
                
            </div>
            <!-- 营业执照 end -->

            <!-- 开户许可证 -->
            <div class="photo">
                <div class="pic" v-if="imgUrl1 != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl1 = ''"/>
                    <img :src="imgUrl1" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload1" accept="image" name="img[]" @change="upload1" style="display: none;">  
                    <label for="upload1">+</label>
                    <p>上传开户许可证</p>
                </div>
                
            </div>



            <!-- 法人身份证正面照 -->
            <div class="photo">
                <div class="pic" v-if="imgUrl2 != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl2 = ''"/>
                    <img :src="imgUrl2" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload2" accept="image" name="img[]" @change="upload2" style="display: none;">  
                    <label for="upload2">+</label>
                    <p>上传法人身份证正面照</p>
                </div>
                
            </div>

            <!-- 法人身份证反面照 -->
            <div class="photo">
                <div class="pic" v-if="imgUrl3 != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl3 = ''"/>
                    <img :src="imgUrl3" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload3" accept="image" name="img[]" @change="upload3" style="display: none;">  
                    <label for="upload3">+</label>
                    <p>上传法人身份证反面照</p>
                </div>
            </div>



            <van-radio-group v-model="settle" style="margin-top: 20px;" class="radio4">
                <van-radio name="1" @click="username1='',banktype='',account='',popupVisible1 = true">对公结算 <van-icon name="arrow" style="float: right;"/></van-radio>
                <van-radio name="2" @click="username1='',banktype='',account='',popupVisible2 = true">对私法人结算 <van-icon name="arrow" style="float: right;" /></van-radio>
                <van-radio name="3" @click="username1='',banktype='',account='',popupVisible3 = true">对私非法人结算 <van-icon name="arrow" style="float: right;" /></van-radio>
            </van-radio-group>
            


            <div class="xieyi">

                    <van-radio-group v-model="xieyi">
                        <van-radio name="1" style="font-size: 14px;padding: 10px 0 10px 12px;">我已阅读并同意<span style="color: #44d1c9;" @click="xieyi1"><<优慧宝商家入驻协议>></span></van-radio>
                    </van-radio-group>

                    <van-button type="primary" class="btn" style="margin-top: 15px;margin-bottom: 30px;" @click="submit()">确认</van-button>
            </div>
        </div>
</div>
        <!-- 行业分类 mt start-->
                <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="industry" style="top: 0;">
                        <ul class="list">
                            <li v-for="(item,index) in industryarr" @click="ipt(index)" :key="index">{{item.title}}</li>
                        </ul>
                </mt-popup>
        <!-- 行业分类  mt end-->


        <!-- 对公结算 -->
            <mt-popup v-model="popupVisible1" popup-transition="popup-fade" class="industry" style="top: 0;">
                <div class="header1" v-if="showtime"> 
                    <van-icon name="arrow-left" @click="back1()"/>
                    <span>对公结算</span>
                </div>
                     <van-cell-group>
                        <van-field v-model="username1" clearable label="法人" placeholder="请输入法人姓名" />
                        <van-field v-model="banktype" clearable label="开户银行" placeholder="请输入开户银行" />
                        <van-field v-model="account" clearable label="对公账号" placeholder="请输入对公账号" />
                        <van-button type="primary" class="btn" @click="tap()">确认</van-button>
                    </van-cell-group>    
            </mt-popup>
        <!-- 对私法人结算 -->
            <mt-popup v-model="popupVisible2" popup-transition="popup-fade" class="industry" style="top: 0;">
                <div class="header1" v-if="showtime"> 
                    <van-icon name="arrow-left" @click="back2()"/>
                    <span>对私法人结算</span>
                </div>
                     <van-cell-group>
                        <van-field v-model="username1" clearable label="姓名" placeholder="请输入法人收款姓名" />
                        <van-field v-model="banktype" clearable label="开户银行" placeholder="请输入开户银行" />
                        <van-field v-model="account" clearable label="银行账号" placeholder="请输入银行卡号" />
                        <van-button type="primary" class="btn" @click="tap1()">确认</van-button>
                    </van-cell-group>    
            </mt-popup>



        <!-- 对私非法人结算 -->
            <mt-popup v-model="popupVisible3" popup-transition="popup-fade" class="industry" style="top: 0;">
                <div class="header1" v-if="showtime"> 
                    <van-icon name="arrow-left" @click="back3()"/>
                    <span>对私非法人结算</span>
                </div>
                     <van-cell-group>
                        <van-field v-model="username1" clearable label="姓名" placeholder="请输入法人收款姓名" />
                        <van-field v-model="banktype" clearable label="开户银行" placeholder="请输入开户银行" />
                        <van-field v-model="account" clearable label="银行账号" placeholder="请输入银行卡号" />
                    </van-cell-group>   
                    <div class="pic">
            <p>补充材料</p>
            <div class="photo">
                <div class="pic" v-if="imgUrl4 != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl4 = ''"/>
                    <img :src="imgUrl4" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload4" accept="image" name="img[]" @change="upload4" style="display: none;">  
                    <label for="upload4">+</label>
                    <p>上传结算账号指定书照</p>
                </div>
                
            </div>
            <!-- 结算账号指定书照 end -->

            <!-- 结算银行卡照 -->
            <div class="photo">
                <div class="pic" v-if="imgUrl5 != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl5 = ''"/>
                    <img :src="imgUrl5" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload5" accept="image" name="img[]" @change="upload5" style="display: none;">  
                    <label for="upload5">+</label>
                    <p>上传结算银行卡照</p>
                </div>
            </div>

            <!-- 结算人身份证反面照 -->
            <div class="photo">
                <div class="pic" v-if="imgUrl6 != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl6 = ''"/>
                    <img :src="imgUrl6" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload6" accept="image" name="img[]" @change="upload6" style="display: none;">  
                    <label for="upload6">+</label>
                    <p>上传结算人身份证反面照</p>
                </div>
                
            </div>

            <!-- 结算人身份证正面照 -->
            <div class="photo">
                <div class="pic" v-if="imgUrl7 != ''">
                    <van-icon name="close" style="position: absolute;right: 0;top: 0;font-size: 20px; color: #666;" @click="imgUrl7 = ''"/>
                    <img :src="imgUrl7" style="width: 100%;height: 100%;">
                </div>
                <div v-else>
                    <input type="file" id="upload7" accept="image" name="img[]" @change="upload7" style="display: none;">  
                    <label for="upload7">+</label>
                    <p>上传结算人身份证正面面照</p>
                </div>
            </div>

            <van-button type="primary" class="btn" style="margin-top: 15px;margin-bottom: 50px;" @click="tap2()">确认</van-button>
        </div>
            </mt-popup>
    </div>
</template>

<script>
import axios from "axios"
import $ from "jquery"
import vueArea from 'vue-area'
export default {
    name : "Enterprise",
    components:{
        vueArea
    },
    data(){
        return{
            result:null,
            dianpu : "",                 //店铺名称
            phoneNumber : "",            //电话
            username : "",               //姓名
            cardid : "",                 //身份证号
            industry : "",               //行业分类
            industry1:"",                //行业分类传参
            point : "",                  //扣点
            postcode : "",               //邮政编码
            email : "",                  //邮箱
            bankNumber : "",             //结算卡联行号
            accounttype : "",            //结算类型
            accountremark : "",          //结算备注
            opennumber : "",             //营业执照号码
            radiotask:"1",               //任务店  非任务店
            childlist:"",                //子商户类型
            cardtask:"TOPUBLIC",        //结算卡类型
            ipt1:"",                     //行业类别
            iptNumber:"",                //行业类别传参
            show:false,                  //行业类别选择 显示 消失
            address:"",                  //请输入详细地址(省市区)
            address1:"",                 //详细地址
            cardtask1:"",                //结算方式                    TOPUBLIC  对公     TOPRIVATE 对私
            popupVisible:false,          //行业分类模态
            popupVisible1:false,         //对公结算
            popupVisible2:false,         //对私法人结算
            popupVisible3:false,         //对私非法人结算
            ipt2:"",                     //经营类别
            show1:false,                 //经营类别显示
            iptNumber1:"",                //行业类别传参
            flage: false,                //am
            flage1 : false,              //pm
            minHour:0,                   //最小时间
            maxHour:23,                  //最大时间
            currentDate:"",              //输入时间
            am1:"开始",                     //开始时间
            pm1:"结束",                      //结束时间
            industryarr:[{id:1,title:"酒店"},{id:2,title:"娱乐"},{id:3,title:"美食"},{id:4,title:"建材"},{id:5,title:"丽人"},{id:6,title:"同城派送"},{id:7,title:"休闲度假"},{id:8,title:"购物/商城"},{id:9,title:"居家生活"},{id:10,title:"生活服务"}],
            listarr:[{tit:"PERSON",name:"个人商户"},{tit:"INDIVIDUALBISS",name:"个体工商户"},{tit:"INSTITUTION",name:"事业单位商户"},{tit:"ENTERPRISE",name:"企业商户"}],
            columns:[],
            columns1:[{id:"OFFLINE_RETAIL",title:"线下零售"},{id:"FOOD_BEVERAGE",title:"餐饮/食品"},{id:"TICKETING_TRAVEL",title:"票务/旅游"},{id:"EDUCATION_TRAINING",title:"教育/培训"},{id:"LIFE_ADVISORY_SERVICE",title:"生活/咨询服务"},{id:"ENTERTAINMENT_FITNESS_SERVICES",title:"娱乐/健身服务"},{id:"MEDICAL_CARE",title:"医疗"},{id:"COLLECTION_AUCTION",title:"收藏/拍卖"},{id:"LOGISTICS_EXPRESS",title:"物流/快递"},{id:"PUBLIC_WELFARE",title:"公益"},{id:"COMMUNICATION",title:"通讯"},{id:"FINANCE_INSURANCE",title:"金融/保险"},{id:"NETWORK_VIRTUAL_SERVICE",title:"网络虚拟服务"},{id:"LIVING_PAYMENT",title:"生活缴费"},{id:"HOTEL",title:"酒店"},{id:"HOME_FURNISHING",title:"家居"},{id:"GROUP_PURCHASE",title:"电商团购"},{id:"LOTTERY",title:"彩票"},{id:"FASHION",title:"时尚"},{id:"UTILITIES_EXPENSE",title:"公共事业缴费"},{id:"REAL_ESTATE",title:"房地产"},{id:"TRANSPORTATION_SERVICE",title:"交通运输服务类"},{id:"MACHINE_ELECTRON",title:"机械/电子"},{id:"SOFTWARE",title:"软件"},{id:"DECORATION",title:"装饰"},{id:"GREEN_SEEDLING",title:"苗木/绿化"},{id:"MATERNAL_CHILD_PRODUCT",title:"母婴/玩具"},{id:"COLLECTION_PET",title:"收藏/宠物"},{id:"BOOK_STATIONERY_AUDIO_VIDEO",title:"书籍/音像/文具"},{id:"BUSINESS_PLATFORM",title:"平台商"},{id:"DIGITAL",title:"数码"},{id:"DIGITAL_ENTERTAINMENT",title:"数字娱乐"},{id:"ABROAD",title:"境外"},{id:"PREPAID_CARD",title:"预付卡"},{id:"DIRECT_SELLING",title:"直销"},{id:"CROWD_FUNDING",title:"众筹"},{id:"OTHER",title:"其他"}],
            imgUrl:"",                 //营业执照
            imgUrl1:"",                //开户许可证
            imgUrl2:"",                //身份证正面照
            imgUrl3:"",                  //身份证反面照
            imgUrl4:"",                 //指定书照
            imgUrl5:"",                //结算银行卡照
            imgUrl6:"",                 //结算人身份证反面照
            imgUrl7:"",                //结算人身份证正面照
            settle:"",                 //结算   对公   对私法人   对私非法人
            shenglist:false,                //省市区  控制显示隐藏
            province:"",                   //省
            city:"",                       //市
            town:"",                      //区
            username1:"",                //法人姓名
            banktype:"",                 //开户银行
            account:"",                   //对公账号
            xieyi:"1",
            server1:"",                  //服务范围
            random:"",                   //营业执照
            random1:"",                  //法人身份证反面照
            random2:"",                  //法人身份证正面照
            rendom3:"",
            rendom4:"",
            random5:"",
            suiji:null,
            test:null,
            test1:null,
            test2:null,
            test3:null,
            test4:null,
            test5:null,
            test6:null,
            test7:null,
            showtime:true,
            pay_way1:"",
            showtime1:false,
            showtime2:""

        }
    },
    methods:{
        back(){
            this.$router.push("/index")
        },
        back1(){
            if(this.username1 == '' && this.banktype == '' && this.account == ''){
                    this.settle = "0"
                }
            this.popupVisible1 = false
        },
        back2(){
            if(this.username1 == '' && this.banktype == '' && this.account == ''){
                    this.settle = "0"
                }
            this.popupVisible2 = false
        },
        back3(){
            if(this.username1 == '' && this.banktype == '' && this.account == '' && this.imgUrl4 == '' && this.imgUrl5 == '' && this.imgUrl6 == '' && this.imgUrl7 == ''){
                    alert("请完善信息")
                }else{
                    this.popupVisible3 = false
                }
        },
        ipt(index){    //行业分类
            this.industry = this.industryarr[index].title;
            this.industry1 = this.industryarr[index].id;
            this.popupVisible = false;
        },
        onConfirm(a,b){
             this.ipt1 = this.columns[b].industry_name;
             this.iptNumber = this.columns[b].industry_type;
             this.show = false;
        },
        onConfirm1(a,b){
            this.ipt2 = this.columns1[b].title;
             this.iptNumber1 = this.columns1[b].id;
             this.show1 = false;
            //  console.log(this.iptNumber1)
        },
        am(a){
            this.am1 = a;
            this.flage = false;
        },
        pm(a){
            this.pm1 = a;
            this.flage1 = false;
        },
        upload(e){                                                   //营业执照
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl = reader.result;
                    _this.random = _this.suiji();
                    }
                }
        },
        upload1(e){                   //开户许可证
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test1 = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl1 = reader.result
                    
                    }
                }
        },
        upload2(e){                   //法人身份证正面照
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test2 = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl2 = reader.result
                    _this.random2 = _this.suiji();
                    }
                }
        },
        upload3(e){                   //法人身份证反面照
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test3 = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl3 = reader.result
                    _this.random1 = _this.suiji();
                    }
                }
        },
        upload4(e){                   //指定书照
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test4 = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl4 = reader.result
                    }
                }
        },
        upload5(e){                   //银行卡照
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test5 = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl5 = reader.result
                    
                    }
                }
        },
        upload6(e){                   //结算人身份证反面照
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test6 = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl6 = reader.result
                    _this.random1 = _this.suiji();
                    }
                }
        },
        upload7(e){                   //结算人身份证正面照
            var _this = this;
            let reader = new FileReader();
            var AllowImgFileSize = 2100000; //上传图片最大值(单位字节)（ 2 M = 2097152 B ）超过2M上传失败
            var file = e.target.files[0];
            this.test6 = file;
            var imgUrlBase64;
            if (file) {
                //将文件以Data URL形式读入页面  
                imgUrlBase64 = reader.readAsDataURL(file);
                reader.onload = function (e) {
                    _this.imgUrl7 = reader.result
                    _this.random2 = _this.suiji();
                    }
                }
        },
        tap(){
            if(this.username1 == '' && this.banktype == '' && this.account == ''){
                    this.settle = "0"
                }
            this.popupVisible1 = false
        },
        tap1(){
            if(this.username1 == '' && this.banktype == '' && this.account == ''){
                    this.settle = "0"
                }
            this.popupVisible2 = false
        },
        tap2(){
            if(this.username1 == '' && this.banktype == '' && this.account == '' && this.imgUrl4 == '' && this.imgUrl5 == '' && this.imgUrl6 == '' && this.imgUrl7 == ''){
                    alert("请完善信息")
                }else{
                    this.popupVisible3 = false
                }
            
        },
        areaResult:function(shenglist,result){
            this.shenglist = shenglist;
            this.result = result;
            this.province = this.result.province.name;
            this.city = this.result.city.name;
            this.town = this.result.area.name;
            this.address = this.province + this.city + this.town;
        },
        changeCount(email){
            var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(!reg.test(email)){
                alert("请输入正确的邮箱")
                this.email = ''
            }
        },
        change1(point){
          var leg =  /^[0]\.[0-9]{2,4}$/
          if(!leg.test(point)){
              alert("输入错误请重新输入")
              this.point = ''
          }
        },
        xieyi1(){
            this.$router.push("/logo")
        },
        onselte(item){
            this.showtime2 = item.name
            this.childlist = item.tit
            this.showtime1 = false
        },
        submit(){
                if(this.dianpu == '' || this.phoneNumber == '' || this.username == '' || this.cardid == '' || this.industry1 == '' || this.point == '' || this.postcode == '' || this.email == '' || this.bankNumber == '' || this.opennumber == '' || this.radiotask == '' || this.childlist == '' || this.iptNumber == '' || this.address1 == '' || this.province == '' || this.city == '' || this.town == '' || this.imgUrl == '' || this.imgUrl1 == '' || this.imgUrl2 == '' || this.imgUrl3 == '' || this.username1 == '' || this.banktype == '' || this.account == '' || this.am1 == '' || this.pm1 == '' ||  this.ipt2 == '' || this.server1 == ''){
                    alert("请完善个人信息")
                    
                }else{

                var _this = this;
                var jingdu = "";
                var weidu = "";
               // console.log(this.address)
                axios({
                    method:"get",
                    url:"https://restapi.amap.com/v3/geocode/geo?address="+ this.address + this.address1  +"&key=f2a3bebf4831379bee347e6ea85d5e42"
                }).then(function(data){
                    let str = data.data.geocodes[0].location
                    let arr = str.split(",")
                    jingdu = arr[0];
                    weidu = arr[1] 
                   

                if(_this.settle == "1"){

                let form = new FormData();
                    form.append("img[0]",_this.test)
                    form.append("img[1]",_this.test1)
                    form.append("img[2]",_this.test2)
                    form.append("img[3]",_this.test3)
                    form.append("user_id",_this.$store.state.userid)
                    form.append("name",_this.dianpu)
                    form.append("law_name",_this.username)
                    form.append("cd_num",_this.cardid)
                    form.append("phone",_this.phoneNumber) 
                    form.append("type_id",_this.industry1)
                    form.append("sheng",_this.province)
                    form.append("shi",_this.city)
                    form.append("qu",_this.town)
                    form.append("camp_over",_this.point)  
                    form.append("open_tm",_this.am1 +"~"+ _this.pm1)
                    form.append("site",_this.address1)
                    form.append("is_task",_this.radiotask)
                    form.append("order_no",_this.suiji())
                    form.append("first_class_merchant_no","C1800332967")
                    form.append("web_site","http://www.023wx.cn")
                    form.append("merchant_type",_this.childlist)
                    form.append("region_code",_this.postcode)
                    form.append("email",_this.email)
                    form.append("bank_code",_this.bankNumber)
                    form.append("account_name",_this.username1)
                    form.append("account_no",_this.account)
                    form.append("settle_bank_type","TOPUBLIC")
                    form.append("settlement_period","D1")
                    form.append("settlement_mode","AUTO")
                    form.append("settlement_remark",_this.accountremark)
                    form.append("merchant_category",_this.iptNumber1)
                    form.append("industry_type_code",_this.iptNumber)
                    form.append("business_license",_this.opennumber)
                    form.append("aptitude_order_no1",_this.random)
                    form.append("aptitude_order_no2",_this.random2)
                    form.append("aptitude_order_no3",_this.random1)
                    form.append("app_order_no",_this.suiji())
                    form.append("tencent_order_no",_this.suiji())
                    form.append("shop_attr","3")
                    form.append("bank",_this.banktype)
                    form.append("serve",_this.server1)
                    form.append("lt_num",jingdu)
                    form.append("wt_num",weidu )
                    form.append("pay_way",_this.pay_way1)
                        $.ajax({
                                url:"http://ht.yhbapp.com/api/shop/setShopSettled",
                                type:"POST",
                                cache:false,
                                data:form,
                                processData:false,
                                contentType:false,
                                success:function(data){
                                    if(data.status.code == "200"){
                                        _this.$router.push("/logo1")
                                    }else{
                                        alert(data.status.message)
                                    }                  
                                }
                            })


                }else if(_this.settle == "2"){
                    let form = new FormData();
                    form.append("img[0]",_this.test)
                    form.append("img[1]",_this.test1)
                    form.append("img[2]",_this.test2)
                    form.append("img[3]",_this.test3)
                    form.append("user_id",_this.$store.state.userid)
                    form.append("name",_this.dianpu)
                    form.append("law_name",_this.username)
                    form.append("cd_num",_this.cardid)
                    form.append("phone",_this.phoneNumber)
                    form.append("type_id",_this.industry1)
                    form.append("sheng",_this.province)
                    form.append("shi",_this.city)
                    form.append("qu",_this.town)
                    form.append("camp_over",_this.point)
                    form.append("open_tm",_this.am1 +"~"+ _this.pm1)
                    form.append("site",_this.address1)
                    form.append("is_task",_this.radiotask)
                    form.append("order_no",_this.suiji())
                    form.append("first_class_merchant_no","C1800332967")
                    form.append("web_site","http://www.023wx.cn")
                    form.append("merchant_type",_this.childlist)
                    form.append("region_code",_this.postcode)
                    form.append("email",_this.email)
                    form.append("bank_code",_this.bankNumber)
                    form.append("account_name",_this.username1)
                    form.append("account_no",_this.account)
                    form.append("settle_bank_type","TOPRIVATE")
                    form.append("settlement_period","D1")
                    form.append("settlement_mode","AUTO")
                    form.append("settlement_remark",_this.accountremark)
                    form.append("merchant_category",_this.iptNumber1)
                    form.append("industry_type_code",_this.iptNumber)
                    form.append("business_license",_this.opennumber)
                    form.append("aptitude_order_no1",_this.random)
                    form.append("aptitude_order_no2",_this.random2)
                    form.append("aptitude_order_no3",_this.random1)
                    form.append("app_order_no",_this.suiji())
                    form.append("tencent_order_no",_this.suiji())
                    form.append("shop_attr","3")
                    form.append("bank",_this.banktype)
                    form.append("serve",_this.server1)
                    form.append("lt_num",jingdu)
                    form.append("wt_num",weidu )
                    form.append("pay_way",_this.pay_way1)
                    $.ajax({
                                url:"http://ht.yhbapp.com/api/shop/setShopSettled",
                                type:"POST",
                                cache:false,
                                data:form,
                                processData:false,
                                contentType:false,
                                success:function(data){
                                    if(data.status.code == "200"){
                                          _this.$router.push("/logo1") 
                                    }else{
                                        alert(data.status.message)
                                    }
                                                      
                                }
                            })

                }else if(_this.settle == "3"){
                    let form = new FormData();
                    form.append("img[0]",_this.test)
                    form.append("img[1]",_this.test1)
                    form.append("img[2]",_this.test2)
                    form.append("img[3]",_this.test3)
                    form.append("img[4]",_this.test4)
                    form.append("img[5]",_this.test5)
                    form.append("img[6]",_this.test6)
                    form.append("img[7]",_this.test7)
                    form.append("user_id",_this.$store.state.userid)
                    form.append("name",_this.dianpu)
                    form.append("law_name",_this.username)
                    form.append("cd_num",_this.cardid)
                    form.append("phone",_this.phoneNumber)
                    form.append("type_id",_this.industry1)
                    form.append("sheng",_this.province)
                    form.append("shi",_this.city)
                    form.append("qu",_this.town)
                    form.append("camp_over",_this.point)
                    form.append("open_tm",_this.am1 +"~"+ _this.pm1)
                    form.append("site",_this.address1)
                    form.append("is_task",_this.radiotask)
                    form.append("order_no",_this.suiji())
                    form.append("first_class_merchant_no","C1800332967")
                    form.append("web_site","http://www.023wx.cn")
                    form.append("merchant_type",_this.childlist)
                    form.append("region_code",_this.postcode)
                    form.append("email",_this.email)
                    form.append("bank_code",_this.bankNumber)
                    form.append("account_name",_this.username1)
                    form.append("account_no",_this.account)
                    form.append("settle_bank_type","TOPRIVATE")
                    form.append("settlement_period","D1")
                    form.append("settlement_mode","AUTO")
                    form.append("settlement_remark",_this.accountremark)
                    form.append("merchant_category",_this.iptNumber1)
                    form.append("industry_type_code",_this.iptNumber)
                    form.append("business_license",_this.opennumber)
                    form.append("aptitude_order_no1",_this.random)
                    form.append("aptitude_order_no2",_this.random2)
                    form.append("aptitude_order_no3",_this.random1)
                    form.append("app_order_no",_this.suiji())
                    form.append("tencent_order_no",_this.suiji())
                    form.append("shop_attr","3")
                    form.append("bank",_this.banktype)
                    form.append("serve",_this.server1)
                    form.append("lt_num",jingdu)
                    form.append("wt_num",weidu)
                    form.append("pay_way",_this.pay_way1)
                        $.ajax({
                            url:"http://ht.yhbapp.com/api/shop/setShopSettled",
                            type:"POST",
                            cache:false,
                            data:form,
                            processData:false,
                            contentType:false,
                            success:function(data){
                               if(data.status.code == "200"){
                                          _this.$router.push("/logo1")
                                    }else{
                                        alert(data.status.message)
                                    }                  
                            }
                        })                            
                        
                }else{
                    alert("请完善信息")
                }
                // console.log(data)
                
          })      

}
        }
    },
    mounted(){
        var _this = this;
            (function(){
                 axios.get("http://ht.yhbapp.com/api.php/Shop/get_industry_type").then(function(data){                //行业分类
                //  console.log(data.data)
                     _this.columns = data.data;
                })
               
            })();
        (function(){
            _this.suiji = function(){
                let data = new Date();
                let year = data.getFullYear();
                let month = data.getMonth()+1;
                let day = data.getDate();
                let hour = data.getHours();
                let minute = data.getMinutes();
                let second = data.getSeconds();
                let Minit = data.getMilliseconds();
                let str = year +""+ month + day + hour + minute + second +  Minit;
                for(var i = 0; i < parseInt(Math.random()*30) ; i ++){
                   str += parseInt(Math.random()*10)
                }
                return str;
            }
        })()
        ;(function(){
            var u = navigator.userAgent;
                if (u.indexOf('iPhone') > -1) {//苹果手机
                    _this.showtime = false
                }else{
                    _this.showtime = true
                }
        })()
    },
    watch:{
        address:function(a){
            if(a != ''){
                $(".tit").css("visibility","visible")
            } 
        },
        phoneNumber:function(a){
            let leg = /\D/g;
            if(leg.test(a)){
                this.phoneNumber = ""   
            }

        },
        postcode(a){
           let leg = /\D/g;
            if(leg.test(a)){
                this.postcode = ""   
            } 
        },
        bankNumber:function(a){
            let leg = /\D/g;
            if(leg.test(a)){
                this.bankNumber = ""   
            }
        },
        radiotask:function(a){
            if(a == "1"){
                this.pay_way1 = 2
            }
        }
    }
}
</script>
<style>
.enterprise .tit>div:nth-child(1){
    display: none;
}
.enterprise .radio4>div{
    display: flex;
}
.enterprise .radio4>div>span:nth-of-type(2){
    flex: 1;
    padding-right: 20px;

}
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
.enterprise{
    height: 100%;
    overflow-y: auto;
}
.header{
    background: #f5f5f5;
    padding-left: 12px;
    overflow-y: auto;
}
.header>span{
    display: inline-block;
    margin-top: 15px;
    padding-bottom: 5px;
    font-size: 12px;
    color: #333;
}
.radiotask{
    width: 100%;
    height: 24px;
}
.radiotask>span{
    position: relative;
    top: -4px;
}
.radiotask>div{
    display: inline-block;
}
.radiotask>div>div{
    display: inline-block;
    height: 25px;
}
.radiotask>div>div:nth-child(1){
    margin-left: 10px;
}
.industry{
    width: 100%;
    height: 100%;
    background: #ffffff;
}
.list>li{
    line-height: 35px;
    border-bottom: 1px solid #ebebee;
    text-indent: 10px;
    color: #333;
}
.businesstyp>span{
    color: #666;
}
.businesstype>select{
    width: 170px;
    margin-left: 35px;
    height: 26px;
    appearance:none;
    border: 0;
    appearance:none;
    background: #fff;
}
.span{
    font-size: 14px;
    color: #333;
}
.positi{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 99999999;
}
.timerselect>p{
    padding: 5px 0;
    font-size: 16px;
}
.timerselect>p>span:nth-child(1){
    display: inline-block;
    margin-left: 10px;
}
.timerselect>p>span:nth-child(2){
    display: inline-block;
    margin-left: 10px;
}
.bg{
    background: #f5f5f5;
    padding: 10px 0 5px 15px;
}
.pic{
    background: #f5f5f5;
    overflow: hidden;
    position: relative;
}
.pic>p{
    padding-top: 20px;
    text-align: center;
    padding-bottom: 5px;
}
.photo{
    width: 94%;
    height: 180px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    background: #fff;
    margin: 10px auto 0;
}
.photo>div{
    width: 100%;
    height: 100%;
    text-align: center;
    color: #ebebeb;
}
.photo>div label{
    display: inline-block;
    margin-top: 40px;
    font-size: 40px;
}
.radio4>div{
    height: 25px;
    background: #fefafb;
    border-bottom: 1px solid #ebebeb; 
    padding-left: 15px;
    padding-top: 5px;
}
.tit{
    visibility: hidden;
}
.btn{
    display: block;
    margin: auto;
    margin-top: 120px;
    width: 96%;
   background: #47d2c8;
   border: 1px solid #47d2c8;
   font-size: 18px;
}

</style>
