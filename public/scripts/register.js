"use strict";
var NewElement = (function () {
    function NewElement(message) {
        this.greeting = message;
    }
    NewElement.prototype.greet = function () {
        return "Hello " + this.greeting;
    };
    return NewElement;
}());
exports.NewElement = NewElement;
