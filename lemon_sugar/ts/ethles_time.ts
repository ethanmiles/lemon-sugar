'use strict'
/*:
 * @plugindesc Game time event mode support.
 * @author ethan miles
 *
 * @param
 * @desc placehoder
 * @default ??????
 *
 *
 * @help
 * Plugin Command:
 * nil
 *
 *
 */



export interface ITime {
  getSeconds(): number; //获取 秒（整数）
  getMinutes(): number; //获取 分钟（整数）
  getHours(): number; //获取 小时（整数）
  getDays(): number; //获取 天数（整数）
  getNextSeconds(sec: number): ITime; //生成一个 sec 秒后的 ITime
  getNextMinutes(min: number): ITime; //生成一个 min 分钟后的 ITime
  getNextHours(hour: number): ITime; //生成一个 hour 小时后的 ITime
  getNextDays(day: number): ITime; //生成一个 day 天后的 ITime
  setSeconds(sec: number): void; //设定为 0 天 0 时 0 分 sec 秒
  setMinutes(min: number): void; //设定为 0 天 0 时 min 分 0 秒
  setHours(hour: number): void; //设定为 0 天 hour 时 0 分 0 秒
  setDays(day: number): void; //设定为 day 天 0 时 0 分 0 秒
  setNextSeconds(sec: number): void; //跳到 sec 秒之后
  setNextMinutes(min: number): void; //跳到 min 分钟之后
  setNextHours(hour: number): void; //跳到 hour 小时之后
  setNextDays(day: number): void; //跳到 day 天之后
  getValue(): number; //获取 ITime 的量，比较大小时使用
}
export class SimpleTime implements ITime {

  private seconds!: number;

  constructor(
    day: number = 0,
    hour: number = 0,
    minute: number = 0,
    second: number = 0
  ) {
    this.seconds = second + 60 * minute + 60 * 60 * hour + 24 * 60 * 60 * day;
  }
  getValue(): number {
    return this.seconds;
  }
  getSeconds(): number {
    return this.seconds % 60;
  }
  getMinutes(): number {
    return Math.floor((this.seconds / 60) % 60);
  }

  getHours(): number {
    return Math.floor((this.seconds / (60 * 60)) % 24);
  }
  getDays(): number {
    return Math.floor(this.seconds / (24 * 60 * 60));
  }
  getNextSeconds(sec: number) {
    return new SimpleTime(0, 0, 0, this.seconds + sec);
  }
  getNextMinutes(sec: number) {
    return new SimpleTime(0, 0, sec, this.seconds);
  }
  getNextHours(hour: number) {
    return new SimpleTime(0, hour, 0, this.seconds);
  }
  getNextDays(day: number) {
    return new SimpleTime(day, 0, 0, this.seconds);
  }
  setNextSeconds(sec: number) {
    this.seconds = sec;
  }

  setNextMinutes(min: number) {
    this.seconds = this.seconds + 60 * min;
  }
  setNextHours(hour: number) {
    this.seconds = this.seconds + 60 * 60 * hour;
  }
  setNextDays(day: number) {
    this.seconds = this.seconds + 60 * 60 * 24 * day;
  }

  setSeconds(sec: number) {
    this.seconds = sec;
  }
  setMinutes(min: number) {
    this.seconds = 60 * min;
  }
  setHours(hour: number) {
    this.seconds = 60 * 60 * hour;
  }
  setDays(day: number) {
    this.seconds = 60 * 60 * 24 * day;
  }
}

/**
 * UNIT TEST
 * 
 */
function TestSimpleTime(): void {
  let t = new SimpleTime(11, 11, 11, 11);
  try {
    //TODO
  } catch (error) {
    throw "failure";
  }
}
