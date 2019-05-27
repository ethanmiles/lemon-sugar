'use strict'
import { ITime, SimpleTime } from "./ethles_time";

enum EventStatus {
  Pending,
  Started,
  Done,
  Error,
}

interface IEvent {
  getID(): string
  getStatus(): EventStatus;
}

export interface ITimeEvent extends IEvent {
}

export class SimpleTimeEvent implements ITimeEvent {
  activeTime: SimpleTime;
  status: EventStatus;
  constructor(parameters) { }
}

export class LoopTimeEvent implements ITimeEvent {
  activeTime: SimpleTime;
  status: EventStatus;
  loopDuration: SimpleTime;
  constructor(parameters) { }
}
