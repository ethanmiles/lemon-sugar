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
  getSeconds(): number;
  getMinutes(): number;
  getHours(): number;
  getDays(): number;
  getNextSeconds(sec: number): ITime;
  getNextMinutes(min: number): ITime;
  getNextHours(hour: number): ITime;
  getNextDays(day: number): ITime;
  setSeconds(sec: number): void;
  setMinutes(min: number): void;
  setHours(hour: number): void;
  setDays(day: number): void;
  setNextSeconds(sec: number): void;
  setNextMinutes(min: number): void;
  setNextHours(hour: number): void;
  setNextDays(day: number): void;
  getValue(): number;
}
export class SimpleTime implements ITime {
  seconds: number;
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

function TestSimpleTime(): void {
  let t = new SimpleTime(11, 11, 11, 11);
  try {

  } catch (error) {
    throw "failure";
  }
}
