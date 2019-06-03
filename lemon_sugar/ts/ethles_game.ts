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
import { ITimeEvent } from "./ethles_event";

enum ActionOnTriggered {
  CALL_COMMON_EVENT,
  MOD_BOOL_VAR,
  MOD_INT_VAR,
}

interface IEventAction {
  call(callee: any): void;
  getTargetName(): string;
}

class EventAction implements IEventAction {
  private name!: string;
  private action!: ActionOnTriggered;
  private targetID!: number;

  constructor(name: string, action: ActionOnTriggered, targetID: number) {
    this.name = name;
    this.action = action;
    this.targetID = targetID;
  }

  call(callee: any): void {
    //TODO
  }

  getTargetName(): string {
    return this.name;
  }
}

class RMSubscriber implements ISubscriber {
  private interestList!: IEventAction[];
  private happedQueue!: string[];

  constructor() {
    this.interestList = [];
    this.happedQueue = [];
  }

  addInterests(newInterest: IEventAction, ...otherNewInterests: IEventAction[]): void {
    this.interestList.push(newInterest)
    this.interestList.push(...otherNewInterests)
  }

  collect(doneList: string[]): void {
    this.happedQueue.push(...doneList);
    //TODO
  }

  getInterest(): string[] {
    let res = Array(this.interestList.length);
    for (let i of this.interestList) {
      res.push(i.getTargetName)
    }
    return res;
  }

}

class Game {
  private gameTime: SimpleTime;
  private events: ITimeEvent[];
  private subscribers: ISubscriber[];

  constructor() {
    this.gameTime = new SimpleTime(0, 0, 0, 0);
    this.events = [];
    this.subscribers = [];
  }

  addEvent(newEvent: ITimeEvent): void {
    if (!this.events.some(
      (event) => { return event.getID() == newEvent.getID() }
    )) {
      this.events.push(newEvent);
    }
  }

  removeEvent(targetID: string): void {
    this.events = this.events.filter(
      (event) => {
        event.getID() != targetID
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