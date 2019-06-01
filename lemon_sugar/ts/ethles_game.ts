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

interface ISubscriber {
  send(doneList: string[]): void;
}

class Game {
  gameTime: SimpleTime;
  events: ITimeEvent[];
  subscribers: ISubscriber[];

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
        s.send(doneList)
      })
    }
  }


}

