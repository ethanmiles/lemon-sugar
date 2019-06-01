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


interface IEvent {
  getID(): string;
  isFinish(): boolean;
  stop(): void;
}

export interface ITimeEvent extends IEvent {
  fetchResult(): boolean;
  getStatus(): EventStatus;
  update(currentTime: ITime): void;
}

export class SimpleTimeEvent implements ITimeEvent {
  activeTime: SimpleTime;
  status: EventStatus;
  id: string;
  result: boolean

  constructor(id: string, activeTime: ITime) {
    this.id = id;
    this.activeTime = new SimpleTime(0, 0, 0, activeTime.getSeconds())
    this.status = EventStatus.Started
    this.result = false;
  }

  getID(): string {
    return this.id
  }

  getStatus(): EventStatus {
    return this.status
  }

  stop(): void {
    this.status = EventStatus.Stop
  }

  isFinish(): boolean {
    if (this.status === EventStatus.Done || this.status === EventStatus.Error || this.status === EventStatus.Stop) {
      return true;
    } else {
      return false;
    }
  }

  fetchResult(): boolean {
    return this.result
  }

  update(currentTime: ITime): void {
    if (currentTime.getValue() >= this.activeTime.getValue()) {
      this.status = EventStatus.Done
    }
  }
}

export class LoopTimeEvent implements ITimeEvent {
  activeTime: SimpleTime;
  status: EventStatus;
  loopInterval: SimpleTime;
  id: string;
  resultQueue: boolean[];

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