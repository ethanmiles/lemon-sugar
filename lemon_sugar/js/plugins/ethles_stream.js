
/*
 * @Description: In User Settings Edit
 * @Author: st21a1
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-11 00:19:02
 * @LastEditTime: 2019-05-21 02:00:48
 */

 /**
 * @description: 
 * @param {type} 
 * @return: 
 */
class Vtuber {
    constructor(money) {
        this.stream = ys;
        this.health = 100;
        this.money = money || 0;
    }
}
/**
 * @description: 
 * @param {boolean} sc_status 是否开启sc
 * @param {LS_Time} stream_time 配信时长
 * @param {LS_Time} total_stream_time 总配信时长
 * @param {number} subscribe_num 订阅数
 * @return: 
 */
class Youtube_Stream {
    constructor() {
        this.sc_status = false;
        this.stream_time = 0;
        this.total_stream_time = 0;
        this.subscribe_num = 0;
    }

}

var takatsuki = new Vtuber();

class Stream_Time {
    constructor(){
        this.start_time=0;
        this.end_time=0;
        this.isLive = false
    }
    getStream_Time(){
        return this.end_time-this.start_time
    }

}

var ys=new Youtube_Stream()
// 每天可以在自宅电脑处进行直播
// 通过游戏行动获得更多直播选项
// 直播收益为
// /sc=固定收益+人气值*直播技能参数（X-Y之间浮动）
// 收获人气=直播技能参数（X-Y之间浮动）
// 扣除（直播技能参数）健康值
// 经过（固定值）时间
// 直播实例
// 在道具店购买《DMC》后 直播槻泣，获得2000（固定）+2000（人气值）（2.0-4.0）=6000-10000不等的sc和500-750不等的人气值。

// 健康值
// 健康值总量为100
// 健康值和时间将作为限制玩家行动的规则
// 健康值归零时，时间强制调整至次日12：00，强制传送到【医院】，扣除（固定金额）金钱，回复50健康值。
// 健康值可以使用金币在【医院】处恢复（该项是否消耗时间视剧本丰富程度决定）
/**
 * @description: 
 * @param sc_money 本次配信sc收入
 * @param stream_time 配信时长
 * @param stable_income 配信基础收入
 * @param broadcast_tatus 直播状态
 * @return: 
 */

class Live_income{
    constructor() {
        this.sc_money = new income();
        this.stream_time = 0;
        this.stable_income = 500;
        this.broadcast_status = getbroadcast_status(0,1);
    }
}
/**
 * @description: 获取本次直播收入
 * @param {number} stable_income 固定收益
 * @param {number} subscribe_num 人气值(订阅数)
 * @param {type} broadcast_status 直播状态
 * @return: 
 */
function getsc(stable_income,broadcast_status){
    var income =stable_income+subscribe_num*broadcast_status
    return income

}
/**
 * @description: 获取直播技能参数（直播状态）
 * @param {number} minNum 技能参数最小值
 * @param {number} maxNum 技能参数最大值
 * @return:  num 目标随机值
 */
function getbroadcast_status(minNum,maxNum){
    var Range = maxNum - minNum;
    var Rand = Math.random();
    var num = minNum + Math.round(Rand * Range); //四舍五入
    return num;
}


/**
 * ==================================
 * --------------API-----------------
 * ==================================
 */

function 开始配信(){
    Stream_Time.start_time=游戏时间()
    Stream_Time.isLive=true

}

function 结束配信(){
    Stream_Time.end_time=游戏时间()
    Stream_Time.isLive=false
    update_Live();
}

function update_Live(){
    ys.stream_time=Stream_Time.getStream_Time()
    ys.total_stream_time=ys.total_stream_time+ys.stream_time
    ys.subscribe_num=ys.subscribe_num+1000*(getbroadcast_status(0,1))
    update_Vtuber()
}

function update_Vtuber(){
    Vtuber.health=100*(1-getbroadcast_status(0,1))
    if(ys.sc_status){
        Vtuber.money=Vtuber.money+getsc(500,ys.subscribe_num)
    }
}

