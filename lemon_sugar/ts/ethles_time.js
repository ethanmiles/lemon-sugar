'use strict';
exports.__esModule = true;
var SimpleTime = /** @class */ (function () {
    function SimpleTime(day, hour, minute, second) {
        if (day === void 0) { day = 0; }
        if (hour === void 0) { hour = 0; }
        if (minute === void 0) { minute = 0; }
        if (second === void 0) { second = 0; }
        this.seconds = second + 60 * minute + 60 * 60 * hour + 24 * 60 * 60 * day;
    }
    SimpleTime.prototype.getValue = function () {
        return this.seconds;
    };
    SimpleTime.prototype.getSeconds = function () {
        return this.seconds % 60;
    };
    SimpleTime.prototype.getMinutes = function () {
        return Math.floor((this.seconds / 60) % 60);
    };
    SimpleTime.prototype.getHours = function () {
        return Math.floor((this.seconds / (60 * 60)) % 24);
    };
    SimpleTime.prototype.getDays = function () {
        return Math.floor(this.seconds / (24 * 60 * 60));
    };
    SimpleTime.prototype.getNextSeconds = function (sec) {
        return new SimpleTime(0, 0, 0, this.seconds + sec);
    };
    SimpleTime.prototype.getNextMinutes = function (sec) {
        return new SimpleTime(0, 0, sec, this.seconds);
    };
    SimpleTime.prototype.getNextHours = function (hour) {
        return new SimpleTime(0, hour, 0, this.seconds);
    };
    SimpleTime.prototype.getNextDays = function (day) {
        return new SimpleTime(day, 0, 0, this.seconds);
    };
    SimpleTime.prototype.setNextSeconds = function (sec) {
        this.seconds = sec;
    };
    SimpleTime.prototype.setNextMinutes = function (min) {
        this.seconds = this.seconds + 60 * min;
    };
    SimpleTime.prototype.setNextHours = function (hour) {
        this.seconds = this.seconds + 60 * 60 * hour;
    };
    SimpleTime.prototype.setNextDays = function (day) {
        this.seconds = this.seconds + 60 * 60 * 24 * day;
    };
    SimpleTime.prototype.setSeconds = function (sec) {
        this.seconds = sec;
    };
    SimpleTime.prototype.setMinutes = function (min) {
        this.seconds = 60 * min;
    };
    SimpleTime.prototype.setHours = function (hour) {
        this.seconds = 60 * 60 * hour;
    };
    SimpleTime.prototype.setDays = function (day) {
        this.seconds = 60 * 60 * 24 * day;
    };
    return SimpleTime;
}());
exports.SimpleTime = SimpleTime;
function TestSimpleTime() {
    var t = new SimpleTime(11, 11, 11, 11);
    try {
    }
    catch (error) {
        throw "failure";
    }
}
