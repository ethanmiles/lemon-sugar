/*:
 * @plugindesc Game support.
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
import { SimpleTime } from "./ethles_time";
import { ITimeEvent, IEvent, EVENT_ID } from "./ethles_event";
import { ISubscriber } from './ethles_subscribe'

enum ACT_TRIGGERED {
  CALL_COMMON_EVENT,
  MOD_BOOL_VAR,
  MOD_INT_VAR,
}

interface IEventAction {
  call(): void;
  getEventID(): EVENT_ID;
  getTargetID(): number; // must be integer
}

class EventAction implements IEventAction {
  static gameEngine = {}

  private eventID!: EVENT_ID;
  private targetID!: number;

  constructor(eventName: EVENT_ID, targetID: number) {
    this.eventID = name;
    this.targetID = targetID;
  }

  static injectEngine(gameEngine: any) {
    this.gameEngine = gameEngine;
  }

  call(): void {
    switch (this.eventID) {
      case 0:
        //TODO
        break;

      default:
        break;
    }
  }

  getEventID(): EVENT_ID {
    return this.eventID;
  }

  getTargetID(): number {
    return this.targetID;
  }

}

class RMSubscriber implements ISubscriber {
  private interestList!: IEventAction[];
  private happedQueue!: IEvent[];

  constructor() {
    this.interestList = [];
    this.happedQueue = [];
  }

  addInterests(newInterest: IEventAction, ...otherNewInterests: IEventAction[]): void {
    this.interestList.push(newInterest)
    this.interestList.push(...otherNewInterests)
  }

  collect(triggereds: IEvent[]): void {
    this.happedQueue.push(...triggereds);
    //TODO
  }

  getInterest(): EVENT_ID[] {
    let res = Array(this.interestList.length);
    for (let i of this.interestList) {
      res.push(i.getEventID)
    }
    return res;
  }

}

class Game {
  private gameTime: SimpleTime;
  private bizEvents: IEvent[];  // 这里要不要将 时间事件和其他事件分为两类？
  private timeEvents: ITimeEvent[];
  private subscribers: ISubscriber[];

  constructor() {
    this.gameTime = new SimpleTime(0, 0, 0, 0);
    this.bizEvents = [];
    this.timeEvents = [];
    this.subscribers = [];
  }

  addEvent(newEvent: ITimeEvent): void {
    //TODO switch event id 
    if (!this.timeEvents.some(
      (event) => { return event.getID() == newEvent.getID() }
    )) {
      this.timeEvents.push(newEvent);
    }
  }

  removeEvent(evnetID: EVENT_ID): void {
    //TODO adapt for IEvent
    this.timeEvents = this.timeEvents.filter(
      (event) => {
        event.getID() != evnetID
      })
  }

  addSubscriber(s: ISubscriber): void {
    this.subscribers.push(s);
  }

  // TODO: removeSubscriber()

  tiktok(sec: number): void {
    this.gameTime.setNextSeconds(sec);
    let doneList = [];



    if (doneList.length > 0) {
      this.subscribers.forEach((s) => {
        s.collect(doneList)
      })
    }
  }


}

export default Game;