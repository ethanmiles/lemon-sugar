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
  PENDING,
  STARTED,
  DONE,
  STOP,
  ERROR,
}


export interface IEvent {
  getID(): EVENT_ID;
  isFinish(): boolean;
  stop(): void;
}

export interface ITimeEvent extends IEvent {
  fetchResult(): boolean;
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
    this.setStatus(EVENT_STATUS.STARTED);
    this.result = false;
  }

  private getStatus(): EVENT_STATUS {
    return this.status;
  }

  private setStatus(stat: EVENT_STATUS): void {
    this.status = stat;
  }

  getID(): EVENT_ID {
    return this.id;
  }

  isFinish(): boolean {
    const stat = this.getStatus();
    if (stat === EVENT_STATUS.DONE || stat === EVENT_STATUS.ERROR || stat === EVENT_STATUS.STOP) {
      return true;
    } else {
      return false;
    }
  }

  stop(): void {
    this.setStatus(EVENT_STATUS.STOP);
  }


  fetchResult(): boolean {
    return this.result;
  }

  update(currentTime: ITime): void {
    if (currentTime.getValue() >= this.activeTime.getValue()) {
      this.status = EVENT_STATUS.DONE
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
    this.setStatus(EVENT_STATUS.STARTED);
    this.resultQueue = []
    this.loopInterval = new SimpleTime(0, 0, 0, loopInterval.getSeconds())
  }



  private getStatus(): EVENT_STATUS {
    return this.status
  }

  private setStatus(stat: EVENT_STATUS): void {
    this.status = stat;
  }

  getID(): EVENT_ID {
    return this.id
  }

  isFinish(): boolean {
    const stat = this.getStatus()
    if (stat === EVENT_STATUS.ERROR || stat === EVENT_STATUS.STOP) {
      return true;
    } else {
      return false;
    }
  }

  stop(): void {
    this.setStatus(EVENT_STATUS.STOP)
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