var jp = jp || {};

$(document).ready(function () {
    var _private = {
        // Euclidean distance, C = current, T = target
        distanceE: function (xC, yC, xT, yT) {
            var dx = xT - xC, dy = yT - yC;
            return Math.sqrt((dx * dx) + (dy * dy));
        },

        // Manhattan distance (use this one)
        distanceM: function (xC, yC, xT, yT) {
            var dx = Math.abs(xT - xC), dy = Math.abs(yT - yC);
            return dx + dy;
        }
    };

    jp.Step = function(xC, yC, xT, yT, moveCosts, parentStep) {


        // var num = 1.414;
        // 1.4 (rounds down)
        // var truncated = Math.floor(num * 10) / 10;
        // 1.5 (rounds up)
        // var roundedUp = Math.ceil(num * 10) / 10;

        // Math.round(num * 10) / 10;


        // herustic
        var hCalc = _private.distanceE(xC, yC, xT, yT);
        var h =  Math.floor(hCalc * 10) // / 10
        // var h =  Math.ceil(hCalc * 10) // / 10

        var g = moveCosts;

        this.x = xC;
        this.y = yC;
        this.g = g;
        this.h = h;

        // Template F cost to User
        
        // Only G Cost
        // Basically Djikstra (mirip poll!!!)
        // this.f = g

        // Minecraft A* Formula
        // this.f = g + 1.5 * h;

        // Rumus A* biasa
        this.f = g + h;


        this.parent = parentStep;
    };


});