"use strict";
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
exports.__esModule = true;
var ethles_time_1 = require("./ethles_time");
var EventStatus;
(function (EventStatus) {
    EventStatus[EventStatus["Pending"] = 0] = "Pending";
    EventStatus[EventStatus["Started"] = 1] = "Started";
    EventStatus[EventStatus["Done"] = 2] = "Done";
    EventStatus[EventStatus["Stop"] = 3] = "Stop";
    EventStatus[EventStatus["Error"] = 4] = "Error";
})(EventStatus || (EventStatus = {}));
var SimpleTimeEvent = /** @class */ (function () {
    function SimpleTimeEvent(id, activeTime) {
        this.id = id;
        this.activeTime = new ethles_time_1.SimpleTime(0, 0, 0, activeTime.getSeconds());
        this.status = EventStatus.Started;
        this.result = false;
    }
    SimpleTimeEvent.prototype.getID = function () {
        return this.id;
    };
    SimpleTimeEvent.prototype.getStatus = function () {
        return this.status;
    };
    SimpleTimeEvent.prototype.stop = function () {
        this.status = EventStatus.Stop;
    };
    SimpleTimeEvent.prototype.isFinish = function () {
        if (this.status === EventStatus.Done || this.status === EventStatus.Error || this.status === EventStatus.Stop) {
            return true;
        }
        else {
            return false;
        }
    };
    SimpleTimeEvent.prototype.fetchResult = function () {
        return this.result;
    };
    SimpleTimeEvent.prototype.update = function (currentTime) {
        if (currentTime.getValue() >= this.activeTime.getValue()) {
            this.status = EventStatus.Done;
        }
    };
    return SimpleTimeEvent;
}());
exports.SimpleTimeEvent = SimpleTimeEvent;
var LoopTimeEvent = /** @class */ (function () {
    function LoopTimeEvent(id, activeTime, loopInterval) {
        this.id = id;
        this.activeTime = new ethles_time_1.SimpleTime(0, 0, 0, activeTime.getSeconds());
        this.status = EventStatus.Started;
        this.resultQueue = [];
        this.loopInterval = new ethles_time_1.SimpleTime(0, 0, 0, loopInterval.getSeconds());
    }
    LoopTimeEvent.prototype.getID = function () {
        return this.id;
    };
    LoopTimeEvent.prototype.getStatus = function () {
        return this.status;
    };
    LoopTimeEvent.prototype.isFinish = function () {
        if (this.status === EventStatus.Error || this.status === EventStatus.Stop) {
            return true;
        }
        else {
            return false;
        }
    };
    LoopTimeEvent.prototype.stop = function () {
        this.status = EventStatus.Stop;
    };
    LoopTimeEvent.prototype.fetchResult = function () {
        if (this.resultQueue.length > 0) {
            this.resultQueue = [];
            return true;
        }
        else {
            return false;
        }
    };
    LoopTimeEvent.prototype.update = function (currentTime) {
        while (currentTime.getValue() > this.activeTime.getValue()) {
            this.resultQueue.push(true);
            this.activeTime.setNextSeconds(this.loopInterval.getSeconds());
        }
    };
    return LoopTimeEvent;
}());
exports.LoopTimeEvent = LoopTimeEvent;
exports.kill = function (timeEvent) {
    var restTimeEvent = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restTimeEvent[_i - 1] = arguments[_i];
    }
    timeEvent.stop();
    restTimeEvent.forEach(function (timeEvent) { return timeEvent.stop(); });
};
exports.notice = function (timeEventList, currentTime) {
    timeEventList.forEach(function (timeEvent) {
        timeEvent.update(currentTime);
    });
};
