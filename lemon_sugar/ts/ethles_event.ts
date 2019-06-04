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

/**
 * EVENT_ID 具体事件类别
 * Game 通过 EVENT_ID 管理 Subscriber 的订阅。
 */
export enum EVENT_ID {
  TIME_ONCE_MOD_INT = 100,
  TIME_ONCE_MOD_BOOL = 101,
  TIME_ONCE_CALL_COMMON = 102,
  TIME_LOOP_MOD_INT = 110,
  TIME_LOOP_MOD_BOOL = 111,
  TIME_LOOP_CALL_COMMON = 112,
}

/**
 * EVENT_STATUS 事件状态
 * ITimeEvent 通过 EVENT_STATUS 进行状态转换。
 */
enum EVENT_STATUS {
  Pending,
  Started,
  Done,
  Stop,
  Error,
}


export interface IEvent {
  getID(): EVENT_ID;
  isFinish(): boolean;
  stop(): void;
}

export interface ITimeEvent extends IEvent {
  fetchResult(): boolean;
  getStatus(): EVENT_STATUS;
  update(currentTime: ITime): void;
}

export class SimpleTimeEvent implements ITimeEvent {
  private activeTime!: SimpleTime;
  private status!: EVENT_STATUS;
  private id!: EVENT_ID;
  private result!: boolean

  constructor(id: EVENT_ID, activeTime: ITime) {
    this.id = id;
    this.activeTime = new SimpleTime(0, 0, 0, activeTime.getSeconds())
    this.status = EVENT_STATUS.Started
    this.result = false;
  }

  getID(): EVENT_ID {
    return this.id;
  }

  getStatus(): EVENT_STATUS {
    return this.status;
  }

  stop(): void {
    this.status = EVENT_STATUS.Stop;
  }

  isFinish(): boolean {
    if (this.status === EVENT_STATUS.Done || this.status === EVENT_STATUS.Error || this.status === EVENT_STATUS.Stop) {
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
      this.status = EVENT_STATUS.Done
    }
  }
}

export class LoopTimeEvent implements ITimeEvent {
  private activeTime!: SimpleTime;
  private status!: EVENT_STATUS;
  private loopInterval!: SimpleTime;
  private id!: EVENT_ID;
  private resultQueue!: boolean[];

  constructor(id: EVENT_ID, activeTime: ITime, loopInterval: ITime) {
    this.id = id;
    this.activeTime = new SimpleTime(0, 0, 0, activeTime.getSeconds())
    this.status = EVENT_STATUS.Started
    this.resultQueue = []
    this.loopInterval = new SimpleTime(0, 0, 0, loopInterval.getSeconds())
  }

  getID(): EVENT_ID {
    return this.id
  }

  getStatus(): EVENT_STATUS {
    return this.status
  }

  isFinish(): boolean {
    if (this.status === EVENT_STATUS.Error || this.status === EVENT_STATUS.Stop) {
      return true;
    } else {
      return false;
    }
  }

  stop(): void {
    this.status = EVENT_STATUS.Stop
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