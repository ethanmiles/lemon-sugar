/*:
 * @plugindesc Game event support.
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

import { ITime, SimpleTime } from "./ethles_time";

enum EventStatus {
  Pending,
  Started,
  Done,
  Stop,
  Error,
}


export interface IEvent {
  getID(): string; //getID 应该返回 一个 东西, 代表这个 event 实际是什么类型。要么用 string 要么用 enum。但是 Game 不应该认识 event 的实际类型，应该是subscriber来判断。所以如果Game能通过getID返回值了解实际类型，是封装泄漏。
  isFinish(): boolean;
  stop(): void;
}

export interface ITimeEvent extends IEvent {
  fetchResult(): boolean;
  getStatus(): EventStatus;
  update(currentTime: ITime): void;
}

export class SimpleTimeEvent implements ITimeEvent {
  private activeTime!: SimpleTime;
  private status!: EventStatus;
  private id!: string;
  private result!: boolean

  constructor(id: string, activeTime: ITime) {
    this.id = id;
    this.activeTime = new SimpleTime(0, 0, 0, activeTime.getSeconds())
    this.status = EventStatus.Started
    this.result = false;
  }

  getID(): string {
    return this.id;
  }

  getStatus(): EventStatus {
    return this.status;
  }

  stop(): void {
    this.status = EventStatus.Stop;
  }

  isFinish(): boolean {
    if (this.status === EventStatus.Done || this.status === EventStatus.Error || this.status === EventStatus.Stop) {
      return true;
    } else {
      return false;
    }
  }

  fetchResult(): boolean {
    return this.result;
  }

  update(currentTime: ITime): void {
    if (currentTime.getValue() >= this.activeTime.getValue()) {
      this.status = EventStatus.Done
    }
  }
}

export class LoopTimeEvent implements ITimeEvent {
  private activeTime!: SimpleTime;
  private status!: EventStatus;
  private loopInterval!: SimpleTime;
  private id!: string;
  private resultQueue!: boolean[];

  constructor(id: string, activeTime: ITime, loopInterval: ITime) {
    this.id = id;
    this.activeTime = new SimpleTime(0, 0, 0, activeTime.getSeconds())
    this.status = EventStatus.Started
    this.resultQueue = []
    this.loopInterval = new SimpleTime(0, 0, 0, loopInterval.getSeconds())
  }

  getID(): string {
    return this.id
  }

  getStatus(): EventStatus {
    return this.status
  }

  isFinish(): boolean {
    if (this.status === EventStatus.Error || this.status === EventStatus.Stop) {
      return true;
    } else {
      return false;
    }
  }

  stop(): void {
    this.status = EventStatus.Stop
  }

  fetchResult(): boolean {
    if (this.resultQueue.length > 0) {
      this.resultQueue = []
      return true;
    } else {
      return false;
    }
  }

  update(currentTime: ITime): void {
    while (currentTime.getValue() > this.activeTime.getValue()) {
      this.resultQueue.push(true);
      this.activeTime.setNextSeconds(this.loopInterval.getSeconds())
    }
  }

}

export const kill = (timeEvent: ITimeEvent, ...restTimeEvent: ITimeEvent[]): void => {
  timeEvent.stop();
  restTimeEvent.forEach((timeEvent) => timeEvent.stop())
}

export const notice = (timeEventList: ITimeEvent[], currentTime: ITime): void => {
  timeEventList.forEach(timeEvent => {
    timeEvent.update(currentTime)
  });
}